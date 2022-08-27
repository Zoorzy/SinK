(function () {
  var scriptArray,
    srcUrl,
    worker,
    base,
    running,
    htmlObject,
    textarea,
    code,
    newrepBtn

  document.addEventListener('newrepWorkerHandlerDone', () => {
    newrepBtn = document.getElementById('newrepBtn')
    newrepBtn.textContent = 'Exploding JS'
    newrepBtn.disabled = 'disabled'
    textarea = document.getElementById('txthtml')
    getExternalJs(textarea.value)
  })

  function getExternalJs(txthtml) {
    //parse string to html
    htmlObject = new DOMParser().parseFromString(txthtml, "text/html")
    //get <script src="">
    scriptArray = htmlObject.documentElement.getElementsByTagName('script')
    //console.log(scriptArray)
    base = document.getElementById('url').value
    running = 0

    if (scriptArray.length) {
      for (let i = 0; i < scriptArray.length; i++) {
        if (scriptArray[i].hasAttribute('src')) {
          //stucture a correct url
          srcUrl = new URL(scriptArray[i].getAttribute('src'), base)
          //download from url
          worker = new Worker("../../public/workers/getResource.js")
          worker.onmessage = workerDone
          worker.postMessage({ path:'/proxyServer', data: String(srcUrl), id: i })
          ++running;
        }
      }
    } else {
      newrepBtn.textContent = "Generate Report"
      newrepBtn.disabled = false
      setProgressBar(0, 20)
      document.dispatchEvent(new CustomEvent('explodeJSDone', { detail: htmlObject.documentElement }))
    }
  }

  function workerDone(e) {
    --running;
    //concat with original html
    code = document.createElement('script')
    code.append(e.data.response)
    htmlObject.documentElement.getElementsByTagName('script')[e.data.id].after(code)
    htmlObject.documentElement.getElementsByTagName('script')[e.data.id].remove()
    //change the original html with the exploded one
    if (running === 0) {
      textarea.value = new XMLSerializer().serializeToString(htmlObject.documentElement)
      newrepBtn.textContent = "Generate Report"
      newrepBtn.disabled = false
      setProgressBar(0, 20)
      document.dispatchEvent(new CustomEvent('explodeJSDone', { detail: htmlObject.documentElement }))
    }
  }

  function setProgressBar(id, newprogress) {
    var progressBar = document.getElementsByClassName('scanProgressBar')[id]
    progressBar.ariaValueNow = newprogress
    progressBar.style.width = newprogress + "%"
  }
})();