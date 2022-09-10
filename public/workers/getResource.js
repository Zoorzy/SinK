this.onmessage = e => {
  var xhttp = new XMLHttpRequest();
  var url = 'http://localhost:80' + e.data.path;
  var params = 'data=' + e.data.data;
  params += (typeof e.data.targetUrl !== 'undefined') ? '&targetUrl=' + e.data.targetUrl : '';
  if (typeof e.data.method == 'undefined' | e.data.method == 'POST') {
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(params);
  } else if (e.data.method == 'GET'){
    xhttp.open('GET', url, true);
    xhttp.send();
  }
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status) {
      self.postMessage({
        id: e.data.id,
        status: xhttp.status,
        response: xhttp.responseText
      });
    }
  }
}