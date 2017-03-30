'use strict'

var messaging = {}

function define(module) {
  module.communicateWithEventPage = function(message) {
    return new Promise((resolve, reject) => 
      chrome.runtime.sendMessage(message, resolve)
    ).then(result => {
      let err = chrome.runtime.lastError
      if (isUndefined(err)) {
        return result
      }
      throw new Error(err)
    })
  }
}

define(messaging)
