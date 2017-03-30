'use strict'

console.log('Popup start')

function popupUpdater(message) {
  console.log('Received message: ' + JSON.stringify(message))
  let statusText = message.statusText
  let isLoading  = message.isLoading
  $('#status-text').text(statusText)
  let loadingVisibility = isLoading
                            ? 'visible'
                            : 'hidden'
  $('#loading-pic').css('visibility', loadingVisibility)
}

$(document).ready(function() {
  dataRetrieval.getCurrentTabUrl().then(url => {
    console.log('Sending message with url: ' + url)
    return messaging.communicateWithEventPage({
      url: url
    })
  }).then(popupUpdater)
})
