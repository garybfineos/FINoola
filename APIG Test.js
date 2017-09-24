var apigClientFactory= require('aws-api-gateway-client').default;
var config = {invokeUrl:'https://1jbny7qo14.execute-api.eu-west-1.amazonaws.com/Beta'};
var apigClient = apigClientFactory.newClient(config);


var params = {
    //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
    userId: '1234',
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

apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
    .then(function(result){
        console.log(result);
        //This is where you would put a success callback
    }).catch( function(result){
        console.log(result);
        //This is where you would put an error callback
    });


