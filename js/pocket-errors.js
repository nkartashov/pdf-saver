'use strict'

var pocketErrors = {}

function define(module) {
  module.Errors = {
    INVALID_COSUMER_KEY: "Consumer key is invalid (notify developer)",
    POCKET_SERVER_ISSUE: "Pocket server issue",
    USER_REJECTED_CODE: "User rejected code",
    CODE_ALREADY_USED: "Code has been used already"
  }

  module.explain = function(errorCode, errorHeader) {
    if (errorCode >= 500) {
      return module.Errors.POCKET_SERVER_ISSUE
    }
    if (errorCode === 403) {
      switch (errorHeader) {
        case 152:
          return module.Errors.INVALID_COSUMER_KEY
        case 158:
          return module.Errors.USER_REJECTED_CODE
        case 159:
          return module.Errors.CODE_ALREADY_USED
      }
    }
    return 'Unknown error, return code: ' + String(errorCode) + ', X-Error-Code: ' + String(errorHeader)
  }
}

define(pocketErrors)

