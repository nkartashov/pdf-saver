'use strict';

var pocketAuth = {}

function define(module) {
  const CONSUMER_KEY = '64417-529b8bfd3b7dcb6541356bb3'
  const REQUEST_TOKEN_URL = 'https://getpocket.com/v3/oauth/request'
  const REDIRECT_URI = chrome.identity.getRedirectURL()
  const REQUEST_TOKEN_REQUEST_DATA = {
    consumer_key: CONSUMER_KEY,
    redirect_uri: REDIRECT_URI 
  };

  function getRequestToken(handler) {
    console.log('Request for a request token to ' + REQUEST_TOKEN_URL)
    postJson(
      REQUEST_TOKEN_URL,
      REQUEST_TOKEN_REQUEST_DATA,
      handler
    )
  }

  const AUTH_REQUEST_URL = 'https://getpocket.com/auth/authorize?'

  function finishAuth(requestToken, success, failure) {
    const authRequestParams = {
      request_token: requestToken,
      redirect_uri: REDIRECT_URI
    };
    console.log('Got a request token, run redirect')
    chrome.identity.launchWebAuthFlow({
        url: AUTH_REQUEST_URL + $.param(authRequestParams),
        interactive: true
      },
      function() {
        getAccessToken(requestToken, success, failure)
      } 
    )
  }

  const ACCESS_TOKEN_URL = 'https://getpocket.com/v3/oauth/authorize'

  function getAccessToken(code, success, failure) {
    const accessTokenRequestData = {
      consumer_key: CONSUMER_KEY,
      code: code
    }
    console.log('Returned from redirect, getting access token from OAuth')
    postJson(
      ACCESS_TOKEN_URL,
      accessTokenRequestData,
      function(response) {
        console.log('Successfully got access_token')
        success(response.access_token)
      },
      failure
    )
  }

  function isUndefined(value) {
    return typeof(value) === 'undefined';
  }

  function runFullAuth(success, failure) {
      getRequestToken(function(response) {
        finishAuth(response.code, success, failure)
      })
  }

  module.runAuthAction = function(success, failure = function(){}) {
    chrome.storage.local.get('authCtx', function(authCtx) {
      if (isUndefined(authCtx)) {
        console.log('No authCtx found')
        runFullAuth(
          function(accessToken) {
            authCtx = {
              accessToken: accessToken,
              consumerKey: CONSUMER_KEY
            }
            console.log('Created authCtx, saving to local storage')
            chrome.storage.local.set({authCtx: authCtx})
            success(authCtx)
          },
          failure
        )
      } else {
        console.log('Run action using old authCtx')
        success(authCtx)
      }
    })
  }
};
define(pocketAuth);
