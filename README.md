## Angular api login 

This webapp allows the user to create an account on AWS Cognito, and use those credentials to get authorize LDC api calls that may require authorization. 

Flow:
- create account and authenticate
- once authenticated, the user should be able to see python example code to pull data from the api
- - the call will use the credentials to get an id token from aws using an already configured lambda function

## for dev:  `ng serve`