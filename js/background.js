'use strict'

chrome.runtime.onMessage.addListener((message, sender, sendResult) => {
  console.log('Background received message: ' + JSON.stringify(message))
  let url = message.url
  app.addPdfDocument(url).then(result => {
    let resultStatusMessage = result.added
                                ? 'Added current doc!'
                                : 'Cannot add doc: ' + result.reason
    console.log('Result status: ' + resultStatusMessage)
    return {
      statusText: resultStatusMessage,
      isLoading: false
    }
  }).then(sendResult)
  return true
})
