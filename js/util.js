const postJson = function(url, data, success, error=function(){}) {
  $.ajax({
    url: url,
    type: 'post',
    data: data,
    headers: {
      'X-Accept': 'application/json'
    },
    dataType: 'json',
    success: success,
    error: error
  })
};

const postJsonPromise = function(url, data) {
  return new Promise((resolve, reject) => {
    postJson(url, data, resolve, reject)
  })
};
