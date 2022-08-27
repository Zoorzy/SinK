(function () {
  var worker,
    url = 'https://www.example.com/',
    running = 0,
    htmlObject,
    newrepBtn

  if (document.getElementById('url')) url = document.getElementById('url').value

  if (typeof url !== 'undefined') {
    // Se è definito l'url del report allora crea il webworker
    worker = new Worker("../../public/workers/getResource.js")
    worker.onmessage = workerDone
    worker.postMessage({ path: '/proxyServer', data: url })
  }

  function workerDone(e) {
    // Ho appena ricevuto da getResource.js il DOM ORIGINALE dal server web ospitante la pagina html

    newrepBtn = document.getElementById('newrepBtn')
    newrepBtn.textContent = 'Exploding JS'
    newrepBtn.disabled = 'disabled'

    // Download and Concat external js scripts
    getExternalJs(e.data.response)

    // Interaction buttons are now available
    document.getElementById('copyBtn').disabled = false
    document.getElementById('downloadBtn').disabled = false
    document.getElementById('viewBtn').disabled = false
  }

  function getExternalJs(txthtml) {
    //parse string to html
    htmlObject = new DOMParser().parseFromString(txthtml, "text/html")

    //get <script src=""> Nodes
    let srcUrl, scriptArray = htmlObject.documentElement.getElementsByTagName('script')

    for (let i = 0; i < scriptArray.length; i++) {
      if (scriptArray[i].hasAttribute('src')) {
        // stucture a correct url
        if (!(srcUrl = new URL(scriptArray[i].getAttribute('src'), url))) break

        // spawn worker to download the external JS
        worker = new Worker("../../public/workers/getResource.js")
        worker.onmessage = appendJS
        worker.postMessage({ path: '/proxyServer', data: String(srcUrl), id: i })

        ++running;
      }
    }

    // change the original html with the exploded one
    document.getElementById('txthtml').value = new XMLSerializer().serializeToString(htmlObject.documentElement)

    // update GUI status
    setProgressBar(0, 20)
    newrepBtn.textContent = "Generate Report"
    newrepBtn.disabled = false
  }

  function appendJS(e) {
    --running;
    //concat with original html
    let code = document.createElement('script')
    code.append(e.data.response)
    htmlObject.documentElement.getElementsByTagName('script')[e.data.id].after(code)
    htmlObject.documentElement.getElementsByTagName('script')[e.data.id].remove()
  }

  function setProgressBar(id, newprogress) {
    var progressBar = document.getElementsByClassName('scanProgressBar')[id]
    progressBar.ariaValueNow = newprogress
    progressBar.style.width = newprogress + "%"
  }
})();