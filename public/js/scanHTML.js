(function () {
  var sources, sinks, worker

  document.addEventListener('explodeJSDone', (e) => {
    console.log(e.detail)
    //sources defined
    sources = ['document.location.href',
      'document.location',
      'window.location.href',
      'window.location']
    //sinks defined
    sinks = ['$X.insertAdjacentHTML(...)',
      '$X.innerHTML(...)',
      '$X.innerHTML = ...']
    //display sources and sinks
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

    //revocer Abstract Sintax Tree .....
    worker = new Worker("../../public/workers/getResource.js")
    worker.onmessage = workerDone
    worker.postMessage({ path:'/api/ASTParser', data:'var i = 0; i++; console.log(i);' })

    //find sources and sinks ..... todo !


    setProgressBar(0, 35)
  })

  function setProgressBar(id, newprogress) {
    var progressBar = document.getElementsByClassName('scanProgressBar')[id]
    progressBar.ariaValueNow = newprogress
    progressBar.style.width = newprogress + "%"
  }

  function workerDone(e){
    console.log(e.data.response)
  }
})();