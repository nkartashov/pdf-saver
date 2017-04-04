'use strict'

var app = {}

function define(module) {
  module.addPdfDocument = function(url) {
    if (urls.isArxivAbstractUrl(url)) {
      console.log('Url ' + url + ' is an arXiv abstract url')
      url = urls.makeArxivPdfUrlFromAbstract(url)
    } else if (urls.isPdfUrl(url)) {
      console.log('Url ' + url + ' is a pdf url')
    } else {
      return Promise.resolve({
        added: false,
        reason: 'Url ' + url + ' is not a PDF or arXiv url'
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
