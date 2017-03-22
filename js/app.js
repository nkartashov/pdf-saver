'use strict';

app = {}

function define(module) {
  app.addDocumentFromArxivPdfUrl = function(url) {
    dataRetrieval.getDocumentInfo(url).then(pocketApi.addDocument)
  }
};

define(app)
