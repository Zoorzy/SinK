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
    getReadyToScan()
  }
  function getReadyToScan() {
    sources = ['document.location.href',
      'document.location',
      'window.location.href',
      'window.location']
    sinks = ['$X.insertAdjacentHTML(...)',
      '$X.innerHTML(...)',
      '$X.innerHTML = ...']
    var patternSources = document.getElementById('pattern-sources')
    for (var i = 0; i < sources.length; i++) {
      var dd = document.createElement('dd')
      dd.textContent = sources[i]
      patternSources.appendChild(dd)
    }
    var patternSinks = document.getElementById('pattern-sinks')
    for (var i = 0; i < sinks.length; i++) {
      var dd = document.createElement('dd')
      dd.textContent = sinks[i]
      patternSinks.appendChild(dd)
    }
    scanHTML(sources, sinks)
  }
})();