'use strict';

// pocketApi.test()
dataRetrieval.getCurrentTabUrl(function(url) {
  console.log(url);
  if (dataRetrieval.isArxivPdfUrl(url)) {
    dataRetrieval.getPdfMetadata(url, function(metadata) {
      console.log(metadata.info.Author)
      console.log(metadata.info.Title)
      console.log(metadata.info.Keywords)
    })
  }
});
