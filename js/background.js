'use strict';

chrome.browserAction.onClicked.addListener(tab => {
  let url = tab.url;
  if (dataRetrieval.isArxivPdfUrl(url)) {
    console.log('Url ' + url + ' is an arXiv pdf url');
    app.addDocumentFromArxivPdfUrl(url)
  }
})
