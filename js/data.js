'use strict'

var dataRetrieval = {}

PDFJS.workerSrc = 'js/libs/pdfjs/build/pdf.worker.js'

function define(module) {
  module.getCurrentTabUrl = function() {
    const query = {
      active: true,
      currentWindow: true
    }
    return new Promise((resolve, reject) => {
      chrome.tabs.query(query, tabs => {
        resolve(tabs[0].url)
      })
    })
  }

  const ARXIV_ABSTRACT_REGEX = new RegExp('^(https|http):\/\/arxiv\.org\/abs\/\\d+.*')
  const ARXIV_PDF_REGEX = new RegExp('^(https|http):\/\/arxiv\.org\/pdf\/\\d+.*\.pdf$')
  const PDF_REGEX = new RegExp('^(https|http):\/\/.*\.pdf$')

  module.isArxivAbstractUrl = function(url) {
    return ARXIV_ABSTRACT_REGEX.test(url)
  }

  module.isArxivPdfUrl = function(url) {
    return ARXIV_PDF_REGEX.test(url)
  }

  module.isPdfUrl = function(url) {
    return PDF_REGEX.test(url)
  }

  module.makeArxivPdfUrlFromAbstract = function(abstractUrl) {
    console.assert(module.isArxivAbstractUrl(abstractUrl), {
      message: 'Url ' + abstractUrl + ' is not an arXiv abstract url'
    })
    let pathParts = abstractUrl.split('/abs/')
    return pathParts[0] + '/pdf/' + pathParts[1] + '.pdf'
  }

  module.getPdfMetadata = function(url) {
    return PDFJS.getDocument(url).then(doc => doc.getMetadata())
  }

  module.getDocumentInfo = function(url) {
    return module.getPdfMetadata(url).then(metadata => ({
      url: url,
      author: metadata.info.Author,
      title: metadata.info.Title,
      tags: metadata.info.Keywords.split(', ').join(',')
    }))
  }
}

define(dataRetrieval)
