(function () {
  var worker, url = 'https://www.example.com/'
  if (document.getElementById('url')) url = document.getElementById('url').value

  if (typeof url !== 'undefined') {
    worker = new Worker("../../public/workers/getResource.js")
    worker.onmessage = workerDone
    worker.postMessage({ path: '/proxyServer', data: url })
  }
  function workerDone(e) {
    document.getElementById('txthtml').textContent = e.data.response
    document.getElementById('copyBtn').disabled = false
    document.getElementById('downloadBtn').disabled = false
    document.getElementById('viewBtn').disabled = false

    document.dispatchEvent(new Event('newrepWorkerHandlerDone'))
  }
})();