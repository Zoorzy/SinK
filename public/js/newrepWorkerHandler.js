(function () {
  var worker, url = 'https://www.example.com/'
  if (document.getElementById('url')) url = document.getElementById('url').value

  if (typeof url !== 'undefined') {
    worker = new Worker("../../public/workers/getHTML.js")
    worker.onmessage = workerDone
    worker.postMessage({ url: url })
  }
  function workerDone(e) {
    document.getElementById('txthtml').textContent = e.data.html
    document.getElementById('copyBtn').disabled = false
    document.getElementById('downloadBtn').disabled = false
    document.getElementById('viewBtn').disabled = false

    document.dispatchEvent(new Event('newrepWorkerHandlerDone'))
  }
})();