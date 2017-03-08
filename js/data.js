'use strict';

var dataRetrieval = {}

PDFJS.workerSrc = 'libs/pdf.worker.js'

function define(module) {
  module.getCurrentTabUrl = function(success) {
    const query = {
      active: true,
      currentWindow: true
    }
    chrome.tabs.query(query, function(tabs) {
      success(tabs[0].url)
    })
  }

  const ARXIV_ABSTRACT_REGEX = new RegExp('^(https|http):\/\/arxiv\.org\/abs\/\\d+.*');
  const ARXIV_PDF_REGEX = new RegExp('^(https|http):\/\/arxiv\.org\/pdf\/\\d+.*\.pdf$')

  module.isArxivAbstractUrl = function(url) {
    return ARXIV_ABSTRACT_REGEX.test(url);
  }

  module.isArxivPdfUrl = function(url) {
    return ARXIV_PDF_REGEX.test(url);
  }

  module.getPdfMetadata = function(url, handler) {
    PDFJS.getDocument(url).then(function(doc) {
      console.log(doc)
      doc.getMetadata().then(handler)
    });
  }
}

define(dataRetrieval)
