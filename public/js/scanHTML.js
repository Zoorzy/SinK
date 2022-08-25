(function () {
  var sources, sinks

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

    //create the code flow structure ..... todo!


    //analyze sources and sinks ..... todo !


  })
})();