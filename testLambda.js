var index = require('./FINOOLA.js');

var event = {
  "session": {
    "new": true,
    "sessionId": "SessionId.3c1bfc4e-f8c4-495d-b438-810ecc102396",
    "application": {
      "applicationId": "amzn1.ask.skill.eeb587c6-c2c7-46c1-8805-06f8705232f9"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AHNEOZYNTD7V7NGWS76LMON6FOCH4UW6WONPAK5WU2VY7SQMOXNDJKM43WUSWXMFVXCHIMBOMLPVT2WJFAUPEAKRDJ2MW7ZQOAPI4BWE3V7H74SIEESD6YVNSSYZTDXWBP2DTZMOBGLZIFMAUG7PPPC5JHNIRUUCE2U3WZ4NR6NIPHJRGDC47NQJ5VZFQDVJ2AWDRMZ6UB462MA"
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.920b27cc-805e-48b4-abaf-ca6009aafbfb",
    "intent": {
      "name": "CallBack",
      "slots": {}
    },
    "locale": "en-US",
    "timestamp": "2017-09-20T18:31:59Z"
  },
  "context": {
    "AudioPlayer": {
      "playerActivity": "IDLE"
    },
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.eeb587c6-c2c7-46c1-8805-06f8705232f9"
      },
      "user": {
        "userId": "amzn1.ask.account.AHNEOZYNTD7V7NGWS76LMON6FOCH4UW6WONPAK5WU2VY7SQMOXNDJKM43WUSWXMFVXCHIMBOMLPVT2WJFAUPEAKRDJ2MW7ZQOAPI4BWE3V7H74SIEESD6YVNSSYZTDXWBP2DTZMOBGLZIFMAUG7PPPC5JHNIRUUCE2U3WZ4NR6NIPHJRGDC47NQJ5VZFQDVJ2AWDRMZ6UB462MA"
      },
      "device": {
        "supportedInterfaces": {}
      }
    }
  },
  "version": "1.0"
}
index.handler(event);
