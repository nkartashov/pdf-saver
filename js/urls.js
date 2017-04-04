'use strict'

var urls = {}

function define(module) {
  const ARXIV_ABSTRACT_REGEX = new RegExp('^(https|http):\/\/arxiv\.org\/abs\/\\d+.*')
  const ARXIV_PDF_REGEX = new RegExp('^(https|http):\/\/arxiv\.org\/pdf\/\\d+.*\.pdf$')
  const PDF_REGEX = new RegExp('^(https|http):\/\/.*\.pdf$')

  module.isArxivAbstractUrl = function(url) {
    return ARXIV_ABSTRACT_REGEX.test(url)
  }

  module.isArxivPdfUrl = function(url) {
    return ARXIV_PDF_REGEX.test(url)
  }

  module.isArxivActionableUrl = function(url) {
    return module.isArxivAbstractUrl(url)
        || module.isArxivPdfUrl(url)
  }

  module.isPdfUrl = function(url) {
    return PDF_REGEX.test(url)
  }

  const PDF_EXTENSION = '.pdf'

  module.makeArxivPdfUrlFromAbstract = function(abstractUrl) {
    assert(module.isArxivAbstractUrl(abstractUrl), 'Url ' + abstractUrl + ' is not an arXiv abstract url')
    let pathParts = abstractUrl.split('/abs/')
    return pathParts[0] + '/pdf/' + pathParts[1] + PDF_EXTENSION
  }

  module.makeArxivAbstractUrlFromPdf = function(pdfUrl) {
    assert(module.isArxivPdfUrl(pdfUrl), 'Url ' + pdfUrl + ' is not an arXiv PDF url')
    let pathParts = abstractUrl.split('/pdf/')
    return pathParts[0] + '/abs/'
      + pathParts[1].substring(0, pathParts[1].length - PDF_EXTENSION.length)
  }
}

define(urls)
