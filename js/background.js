'use strict';

chrome.browserAction.onClicked.addListener(tab => {
  let url = tab.url;
  app.addDocumentFromArxiv(url).then(result => {
    if (result.added) {
      alert('Added current doc!')
    } else {
      alert('This is not an arXiv doc!')
    }
  })
})
