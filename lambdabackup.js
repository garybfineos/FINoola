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
     'LaunchRequest' : function(){
        const speechOutput = 'Hi, welcome to Gen Risk';
        const reprompt = 'How can I help you today?' ;
        this.emit(':ask', speechOutput, reprompt);
    },
    'CallBack': function () {
        
       this.emit(':tell', 'An agent will call you back as soon as possible');    
    },
    'RegisterPortalUser': function () {

     if (this.event.request.dialogState !== 'COMPLETED') {
             this.emit(':delegate');
        } else {
            // All the slots are filled (And confirmed if you choose to confirm slot/intent)
             this.emit(':tell', 'Thanks, you are now registered'); 
        }
    },
    'NextPayment' : function(){
        this.emit(':tell', 'Soon, relax bra you will get yours'); 
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
