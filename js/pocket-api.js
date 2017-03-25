'use strict'

var pocketApi = {}

function define(module) {
  const POCKET_ADD_URL = 'https://getpocket.com/v3/add'

  module.addDocument = function(documentData) {
    return pocketAuth.runAuthAction().then(authCtx => {
      console.log('Adding document with data: ' + JSON.stringify(documentData))
      const addUrlData = {
        url: documentData.url,
        title: documentData.title,
        tags: documentData.tags,
        access_token: authCtx.accessToken,
        consumer_key: authCtx.consumerKey
      }
      return postJsonPromise(
        POCKET_ADD_URL,
        addUrlData
      )
    })
  }
}
define(pocketApi)
