'use strict'

var app = {}

function define(module) {
  module.addPdfDocument = function(url) {
    if (dataRetrieval.isArxivAbstractUrl(url)) {
      console.log('Url ' + url + ' is an arXiv abstract url')
      url = dataRetrieval.makeArxivPdfUrlFromAbstract(url)
    } else if (dataRetrieval.isPdfUrl(url)) {
      console.log('Url ' + url + ' is a pdf url')
    } else {
      return Promise.resolve({
        added: false,
        reason: 'Url ' + url + ' is not a PDF url'
      })
    }
    return dataRetrieval.getDocumentInfo(url).then(pocketApi.addDocument).then(
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
