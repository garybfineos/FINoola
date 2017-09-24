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

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = 'Hi, welcome to Gen Risk';
        const reprompt = 'How can I help you today?';
        this.emit(':ask', speechOutput, reprompt);
    },
    'CallBack' : function() {
        //get User First
        var apigClientFactory = require('aws-api-gateway-client').default;
        var config = { invokeUrl: 'https://1jbny7qo14.execute-api.eu-west-1.amazonaws.com/Beta' };
        var apigClient = apigClientFactory.newClient(config);
        var params = {
            //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
            userId: this.event.session.user.userId,
        };
        // Template syntax follows url-template https://www.npmjs.com/package/url-template
        var pathTemplate = '/portaluser/{userId}'
        var method = 'GET';
        var additionalParams = {
            //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
            headers: {

            },
            queryParams: {

            }
        };
        var body = {
            //This is where you define the body of the request
        };
        var that = this;
        apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then((result) => {
                console.log(result);
                if (result.data.PortalUserId == ''){
                    this.emit(':tell', 'I cannot find your FINOOLA portal account, please ensure you have registered your Alexa account with FINoola');
                } else {
                    this.emit(':tell', 'got your user details from the portal');
                }
            }, (error) => {
                console.log(result);
                this.emit(':tell', 'I cannot find your FINOOLA portal account, please ensure you have registered your Alexa account with FINoola');
            });
    },

    'RegisterPortalUser': function () {

        if (this.event.request.dialogState === 'COMPLETED') {
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
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};


