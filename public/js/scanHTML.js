(function () {
  var sources, sinks, worker, running = 0

  document.getElementById('txthtml').addEventListener('JSexploded', (e) => {
    // sources defined
    sources = [
      'document.location.href',
      'document.location',
      'document.cookie',
      'window.location.href',
      'window.location'
    ]
    // sinks defined
    sinks = [
      'insertAdjacentHTML(...)',
      'innerHTML',
      'document.write',
      'document.writeln'
    ]
    // display sources and sinks
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

    //console.log(e.detail.data)
    for (let i = 0; i < e.detail.data.length; i++) {
      //recover Abstract Sintax Tree .....
      worker = new Worker("../../public/workers/getResource.js")
      worker.onmessage = analyze
      worker.postMessage({
        path: '/api/ASTParser',
        data: e.detail.data[i],
        id: i
      })
      ++running
    }
  })

  function analyze(e) {
    --running
    //find sources and sinks ..... todo !
    console.log(e.data.id + ': ' + e.data.response)
    if (!running) {
      setProgressBar(0, 35)
    }
  }

  function setProgressBar(id, newprogress) {
    var progressBar = document.getElementsByClassName('scanProgressBar')[id]
    progressBar.ariaValueNow = newprogress
    progressBar.style.width = newprogress + "%"
  }
})();