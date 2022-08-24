function scanHTML(sources, sinks) {
  var textarea = document.getElementById('txthtml').value
  getExternalJs(textarea)
}
function getExternalJs(txtString) {
  //parse string to html
  var html = new DOMParser().parseFromString(txtString, "text/xml");
  //look for <script src="">
  var scripts = html.getElementsByTagName('script'), srcUrl, worker, base = document.getElementById('url').value
  console.log('base: ' + base)
  Array.prototype.slice.call(scripts).forEach(element => {
    if (element.hasAttribute('src')) {
      //stucture a correct url
      srcUrl = new URL(element.getAttribute('src'), base)
      //download from url
      worker = new Worker("../../public/workers/getHTML.js")
      worker.onmessage = workerDone
      worker.postMessage({ url: String(srcUrl) })
    }
  })
  function workerDone(e) {
    console.log(e.data.html)
    //concat with original html
    
  }
}