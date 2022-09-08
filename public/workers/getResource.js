this.onmessage = e => {
  var xhttp = new XMLHttpRequest()
  var url = 'http://localhost:80' + e.data.path
  var params = 'data=' + e.data.data
  params += (typeof e.data.targetUrl !== 'undefined') ? '&targetUrl=' + e.data.targetUrl : '';
  xhttp.open('POST', url, true)

  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status) {
      self.postMessage({
        id: e.data.id,
        status: xhttp.status,
        response: xhttp.responseText
      })
    }
  }
  xhttp.send(params)
}