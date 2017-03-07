var CONSUMER_KEY = '64417-529b8bfd3b7dcb6541356bb3'
var REQUEST_TOKEN_URL = 'https://getpocket.com/v3/oauth/request'
var REDIRECT_URI = chrome.identity.getRedirectURL()
var REQUEST_TOKEN_REQUEST_DATA = {
  consumer_key: CONSUMER_KEY,
  redirect_uri: REDIRECT_URI 
};

function post(url, data, handler) {
  $.ajax({
    url: url,
    type: 'post',
    data: data,
    headers: {
      'X-Accept': 'application/json'
    },
    dataType: 'json',
    success: handler
  })
}

function getRequestToken(handler) {
  post(
    REQUEST_TOKEN_URL,
    REQUEST_TOKEN_REQUEST_DATA,
    handler
  )
}

var AUTH_REQUEST_URL = 'https://getpocket.com/auth/authorize?'

function redirectUserForAuth(requestToken, handler) {
  var authRequestParams = {
    request_token: requestToken,
    redirect_uri: REDIRECT_URI
  };
  chrome.identity.launchWebAuthFlow({
      url: AUTH_REQUEST_URL + $.param(authRequestParams),
      interactive: true
    },
    function() {
      getAccessToken(requestToken, handler)
    } 
  )
}

var ACCESS_TOKEN_URL = 'https://getpocket.com/v3/oauth/authorize'

function getAccessToken(code, handler) {
  var accessTokenRequestData = {
    consumer_key: CONSUMER_KEY,
    code: code
  }
  post(
    ACCESS_TOKEN_URL,
    accessTokenRequestData,
    function(response) {
      handler(response.access_token)
    }
  )
}

var POCKET_ADD_URL = 'https://getpocket.com/v3/add'

function addDocument(accessToken) {
  var query = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(query, function(tabs) {
    var tab = tabs[0]
    var addUrlData = {
      url: tab.url,
      access_token: accessToken,
      consumer_key: CONSUMER_KEY
    }
    post(
      POCKET_ADD_URL,
      addUrlData,
      function(r) {
      }
    )
  })
}

function runApp() {
  function handleResponseCode(response) {
    redirectUserForAuth(response.code, addDocument)
  }
  getRequestToken(handleResponseCode)
}

runApp()
