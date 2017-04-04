'use strict'

var app = {}

function define(module) {
  module.addPdfDocument = function(url) {
    let metadataPromise = undefined
    if (urls.isArxivActionableUrl(url)) {
      console.log('Url ' + url + ' is an arXiv url')
      metadataPromise = dataRetrieval.getArxivPdfMetadata(url)
    } else if (urls.isPdfUrl(url)) {
      console.log('Url ' + url + ' is a pdf url')
      metadataPromise = dataRetrieval.getDocumentInfo(url)
    } else {
      return Promise.resolve({
        added: false,
        reason: 'Url ' + url + ' is not a PDF or arXiv url'
      })
    }
    return metadataPromise.then(pocketApi.addDocument).then(
      () => ({added: true})
    ).catch(error => {
      return {
        added: false,
        reason: pocketErrors.explain(
          error.status,
          parseInt(error.getResponseHeader('X-Error-Code'))
        )
      }
    })
  }
}

define(app)
