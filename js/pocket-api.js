'use strict';

var pocketApi = {}

function define(module) {
  const POCKET_ADD_URL = 'https://getpocket.com/v3/add'

  pocketApi.test = function() {
    const query = {
      active: true,
      currentWindow: true
    }
    chrome.tabs.query(query, function(tabs) {
      const tab = tabs[0]
      pocketAuth.runAuthAction(function (authCtx) {
        const addUrlData = {
          url: tab.url,
          access_token: authCtx.accessToken,
          consumer_key: authCtx.consumerKey
        }
        alert(tab.url + authCtx.accessToken)
        // postJson(
        //   POCKET_ADD_URL,
        //   addUrlData,
        //   function(r) {
        //   }
        // )
      })
    })
  }

  pocketApi.addDocument = function (documentData, success, addFailure, authFailure) {
      pocketAuth.runAuthAction(function (authCtx) {
        console.log('Adding document with data: ' + JSON.stringify(documentData))
        const addUrlData = {
          url: documentData.url,
          title: documentData.title,
          tags: documentData.tags,
          access_token: authCtx.accessToken,
          consumer_key: authCtx.consumerKey
        }
        postJson(
          POCKET_ADD_URL,
          addUrlData,
          success,
          addFailure
        )
      },
        authFailure
      )
  }
}
define(pocketApi)
