/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
var https = require('https');
var aws4 = require('aws4');
const APP_ID = 'amzn1.ask.skill.eeb587c6-c2c7-46c1-8805-06f8705232f9';

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = 'Hi, welcome to Gen Risk.  How can I help you today?';
        const reprompt = 'I am here to help you for example say read messages to read your unread messages';
        this.emit(':ask', speechOutput, reprompt);
    },
    'CallBack': function () {
        var that = this;
        getUser(that, createCallBack);
    },
    'ReadMessages': function () {
        console.log(this.event.request.intent);
        if (this.event.request.intent.slots.messages_read.value != 'yes') {
            var that = this;
            getUser(that, getMessages);
        } else {
            if ((!this.event.request.intent.slots.mark_as_read.value) || (((this.event.request.intent.slots.mark_as_read.value != 'yes') && (this.event.request.intent.slots.mark_as_read.value != 'no')))) {
                const speechOutput = 'Sorry I did not understand your response.  would you like me to mark your messages as red.  Say yes or no.'
                const slotToElicit = 'mark_as_read';
                const updatedIntent = this.event.request.intent;
                updatedIntent.slots.messages_read.value = 'yes';
                const reprompt = 'Say yes to mark your messages as red and no to leave them marked as unread';
                this.emit(':elicitSlot', slotToElicit, speechOutput, reprompt, updatedIntent);
            } else {
                if (this.event.request.intent.slots.mark_as_read.value == 'yes') {
                    this.emit(':tell', 'Your messages have been marked as red.  Thank you.');
                } else {
                    this.emit(':tell', 'Your messages will remain marked as unread.  Thank you.');
                }
            }
        }
    },
    'RegisterPortalUser': function () {
        if (this.event.request.dialogState != 'COMPLETED') {
            this.emit(':delegate');
        } else {
            // All the slots are filled (And confirmed if you choose to confirm slot/intent)
            this.emit(':tell', 'Thanks, you are now registered');
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        const speechOutput = ("I'm sorry I didnt understand your request, please try again");
        const reprompt = speechOutput;
        this.emit(':ask', speechOutput, reprompt);
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};


var userError = function (that) {
    that.emit(':tell', 'I could not log into the portal on your behalf.');
}

var apiError = function (that, text) {
    that.emit(':tell', 'Oops, something went wrong.  I could not process your ' + text);
}

var getUser = function (that, _callBack) {
    var domain = '1jbny7qo14.execute-api.eu-west-1.amazonaws.com';
    var urlPath = '/Beta/portaluser/' + that.event.session.user.userId;
    var body;
    const options = {
        hostname: domain,
        path: urlPath,
        port: 443,
        method: 'GET'
    }
    var response = '';
    var req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        res.on('data', (d) => {
            response += d;
        });
        res.on('end', () => {
            console.log('got it all', response);
            var resJSON = JSON.parse(response);
            if (resJSON.PortalUserId == "") {
                userError(that);
            } else {
                _callBack(that, response);
            }
        });
    }).on('error', (e) => {
        console.error(e);
        userError(that);
    });
    req.end();
}

var createCallBack = function (that, response) {
    var accessKey = 'AKIAJI2CWBTPH7PP4JJQ'
    var secretKey = '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'
    var domain = '1jbny7qo14.execute-api.eu-west-1.amazonaws.com';
    var urlPath = '/Beta/callback';
    var bodyMock = {};
    const options = {
        host: domain,
        path: urlPath,
        url: 'https://' + domain + urlPath,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    var signer = new aws4.RequestSigner(options, { accessKeyId: accessKey, secretAccessKey: secretKey });
    signer.sign();
    options.body = bodyMock;
    var response = '';
    var req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        res.on('data', (d) => {
            response += d;
        });
        res.on('end', () => {
            if ((res.statusCode).toString().substring(0, 1) != "2") {
                apiError(that, 'call back request');
            } else {
                that.emit(':tell', 'Your request for a call back has been processed.');
            }
        });
    }).on('error', (e) => {
        console.error(e);
        userError(that);
    });
    req.end();
}


var getMessages = function (that, response) {
    var accessKey = 'AKIAJI2CWBTPH7PP4JJQ'
    var secretKey = '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'
    var domain = '1jbny7qo14.execute-api.eu-west-1.amazonaws.com';
    var urlPath = '/Beta/callback';
    var bodyMock = {};
    const options = {
        host: domain,
        path: urlPath,
        url: 'https://' + domain + urlPath,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    var signer = new aws4.RequestSigner(options, { accessKeyId: accessKey, secretAccessKey: secretKey });
    signer.sign();
    options.body = bodyMock;
    var response = '';
    var req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        res.on('data', (d) => {
            response += d;
        });
        res.on('end', () => {
            if ((res.statusCode).toString().substring(0, 1) != "2") {
                apiError(that, 'read messages request');
            } else {
                const speechOutput = 'message 1, this is the first message.  message 2, this is the second message. <break time="1.5s"/> Would you like me to mark your messages as red'
                const slotToElicit = 'mark_as_read';
                const updatedIntent = that.event.request.intent;
                updatedIntent.slots.messages_read.value = 'yes';
                const reprompt = 'Would you like to mark your messages as red?';
                that.emit(':elicitSlot', slotToElicit, speechOutput, reprompt, updatedIntent);
            }
        });
    }).on('error', (e) => {
        console.error(e);
        userError(that);
    });
    req.end();
}