'use strict';

var app = {};

function define(module) {
  module.addDocumentFromArxiv = function(url) {
    if (dataRetrieval.isArxivPdfUrl(url)) {
      console.log('Url ' + url + ' is an arXiv pdf url');
    } else if (dataRetrieval.isArxivAbstractUrl(url)) {
      console.log('Url ' + url + ' is an arXiv abstract url');
      url = dataRetrieval.makeArxivPdfUrlFromAbstract(url)
    } else {
      return Promise.resolve({added: false});
    }
    return dataRetrieval.getDocumentInfo(url).then(pocketApi.addDocument).then(
      () => ({added: true})
    )
  }
};

define(app);
