this.onmessage = e => {
  var xhttp = new XMLHttpRequest()
  var url = 'http://localhost:80/proxyServer'
  var params = 'url=' + e.data.url
  xhttp.open('POST', url, true)

  //Send the proper header information along with the request
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

  xhttp.onreadystatechange = function () {//Call a function when the state changes.
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      self.postMessage({id: e.data.id, html: xhttp.responseText})
    }
  }
  xhttp.send(params)
}