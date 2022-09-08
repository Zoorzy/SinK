(function () {
  var worker,
    url = 'https://www.example.com/',
    running = 0,
    htmlObject,
    newrepBtn,
    js = [],
    explodedAtLeastOne = false

  if (document.getElementById('url')) url = document.getElementById('url').value
  if (typeof url !== 'undefined') {
    // Se è definito l'url del report allora crea il webworker
    worker = new Worker("../../public/workers/getResource.js")
    worker.onmessage = workerDone
    worker.postMessage({
      path: '/proxyServer',
      data: url
    })
  }

  function workerDone(e) {
    // Ho appena ricevuto da getResource.js il DOM ORIGINALE dal server web ospitante la pagina html
    newrepBtn = document.getElementById('newrepBtn')
    newrepBtn.textContent = 'Exploding JS'
    // Download and Concat external js scripts linked inside the original html
    getExternalJs(e.data.response)
    // Interaction buttons are now available
    document.getElementById('copyBtn').disabled = false
    //document.getElementById('downloadBtn').disabled = false
    //document.getElementById('viewBtn').disabled = false
  }

  function getExternalJs(txthtml) {
    // parse string to html
    htmlObject = new DOMParser().parseFromString(txthtml, "text/html")
    // get <script> Nodes
    let scriptArray = htmlObject.documentElement.getElementsByTagName('script')
    // iterate throught the <sctipt> nodes array
    for (let i = 0; i < scriptArray.length; i++) {
      // get script tags with src attr
      if (!(scriptArray[i].hasAttribute('src'))) {
        js.push(scriptArray[i].textContent)
        continue
      }
      let path = scriptArray[i].getAttribute('src')
      // stucture a correct url
      if (!(srcUrl = new URL(path, url))) continue
      // spawn a worker to download the external JS
      worker = new Worker("../../public/workers/getResource.js")
      worker.onmessage = appendJS
      worker.postMessage({
        path: '/proxyServer',
        data: String(srcUrl),
        id: i
      })
      explodedAtLeastOne = true
      ++running;
    }
    // Se per qualsiasi motivo (nessuno script da scaricare, solo script interni ecc) allora procedi direttamente a fare explode()
    if (!explodedAtLeastOne) explode()
  }

  function appendJS(e) {
    --running;
    // Avoid appending too large scripts
    if ((new TextEncoder().encode(e.data.response)).length <= 10000) {
      //push into js array to analyze later
      js.push(e.data.response)
      //concat with original html
      let code = document.createElement('script')
      code.append(e.data.response)
      htmlObject.documentElement.getElementsByTagName('script')[e.data.id].after(code)
      htmlObject.documentElement.getElementsByTagName('script')[e.data.id].remove()
    }
    // when the last worker ends its work
    if (running == 0) explode()
  }

  function explode() {
    // change the original html with the exploded one, parsed to string element
    txthtml = new XMLSerializer().serializeToString(htmlObject.documentElement)
    let textarea = document.getElementById('txthtml')
    textarea.value = txthtml
    // update GUI status
    setProgressBar(0, 20)
    newrepBtn.textContent = "See reports"
    newrepBtn.disabled = false;
    const JSexploded = new CustomEvent('JSexploded', {
      detail: {
        data: js,
        targetUrl: url
      }
    })
    textarea.dispatchEvent(JSexploded)
  }

  function setProgressBar(id, newprogress) {
    var progressBar = document.getElementsByClassName('scanProgressBar')[id]
    progressBar.ariaValueNow = newprogress
    progressBar.style.width = newprogress + "%"
  }

  //copy button
  document.getElementById("copyBtn").addEventListener('click', () => {
    document.getElementById("txthtml").select()
    document.execCommand('copy')
  })
})();