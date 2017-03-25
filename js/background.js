'use strict';

chrome.browserAction.onClicked.addListener(tab => {
  let url = tab.url;
  app.addPdfDocument(url).then(result => {
    if (result.added) {
      alert('Added current doc!')
    } else {
      alert('Cannot add doc: ' + result.reason)
    }
  })
})
