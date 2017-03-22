'use strict';

var app = {};

function define(module) {
  module.addDocumentFromArxivPdfUrl = function(url) {
    return dataRetrieval.getDocumentInfo(url).then(pocketApi.addDocument)
  }
};

define(app);
