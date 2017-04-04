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

  module.getPdfMetadata = function(url) {
    assert(urls.isPdfUrl(url), 'Url ' + url + ' is not an PDF url')
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

  function leftBiasedMerge(left, right) {
    for (var property in right) {
      if (right.hasOwnProperty(property) && !left.hasOwnProperty(property)) {
        left[property] = right[property]
      }
    }
    return left
  }

  const ARXIV_TITLE_CLASS_SELECTOR = '.title'
  const ARXIV_AUTHOR_CLASS_SELECTOR = '.authors > a'

  function getTitleFromArxivHtml(html) {
    return $(html).find(ARXIV_TITLE_CLASS_SELECTOR)[0]
      // First element is <span>
      .childNodes[1].textContent
      // First symbol is \n
      .substr(1)
  }

  function getAuthorFromArxivHtml(html) {
    return $(html).find(ARXIV_AUTHOR_CLASS_SELECTOR)
      // Get text from author hyperlinks
      .map((index, element) => $(element).text()).get()
      // Join all authors into one string
      .join(', ')
  }

  module.getDocumentInfoFromArxivAbstractPage = function(abstractUrl) {
    assert(urls.isArxivAbstractUrl(abstractUrl), 'Url ' + abstractUrl + ' is not an arXiv abstract url')
    return fetch(abstractUrl).then(response => response.text()).then(htmlText => {
      let html = $.parseHTML(htmlText)
      return {
        url: urls.makeArxivPdfUrlFromAbstract(abstractUrl),
        author: getAuthorFromArxivHtml(html),
        title: getTitleFromArxivHtml(html)
        // No tags, sadly
      }
    })
  }
}

define(dataRetrieval)
