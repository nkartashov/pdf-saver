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

  function getRequestToken() {
    console.log('Request for a request token to ' + REQUEST_TOKEN_URL)
    return postJsonPromise(
      REQUEST_TOKEN_URL,
      REQUEST_TOKEN_REQUEST_DATA
    ).then(response =>
      response.code
    )
  }

  const AUTH_REQUEST_URL = 'https://getpocket.com/auth/authorize?'

  function finishAuth(requestToken) {
    const authRequestParams = {
      request_token: requestToken,
      redirect_uri: REDIRECT_URI
    };
    console.log('Got a request token, run redirect')
    return new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow({
          url: AUTH_REQUEST_URL + $.param(authRequestParams),
          interactive: true
        },
        resolve
      )
    }).then(() => 
      getAccessToken(requestToken)
    )
  }

  const ACCESS_TOKEN_URL = 'https://getpocket.com/v3/oauth/authorize'

  function getAccessToken(code) {
    const accessTokenRequestData = {
      consumer_key: CONSUMER_KEY,
      code: code
    }
    console.log('Returned from redirect, getting access token from OAuth')
    return postJsonPromise(
      ACCESS_TOKEN_URL,
      accessTokenRequestData
    ).then(response => {
        console.log('Successfully got access_token');
        return response.access_token
    })
  }

  function isUndefined(value) {
    return typeof(value) === 'undefined';
  }

  function runFullAuth() {
      return getRequestToken().then(finishAuth)
  }

  module.runAuthAction = function() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('authCtx', authCtx => {
        if (isUndefined(authCtx) || $.isEmptyObject(authCtx)) {
          console.log('No authCtx found')
          return runFullAuth().then(accessToken => {
            authCtx = {
              accessToken: accessToken,
              consumerKey: CONSUMER_KEY
            }
            console.log('Created authCtx, saving to local storage')
            chrome.storage.local.set({authCtx: authCtx})
            resolve(authCtx)
          })
        } else {
          console.log('Run action using old authCtx');
          resolve(authCtx);
        }
      })
    })
  }
};
define(pocketAuth);
