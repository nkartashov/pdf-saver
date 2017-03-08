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
}
