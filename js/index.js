'use strict';
alert('test')
dataRetrieval.getCurrentTabUrl().then(function(url) {
  if (dataRetrieval.isArxivPdfUrl(url)) {
    console.log('Got Arxiv PDF');
    return dataRetrieval.getPdfMetadata(url).then(function(metadata) {
      alert(metadata.info.Author)
      console.log(metadata.info.Title)
      console.log(metadata.info.Keywords)
    })
  }
});
