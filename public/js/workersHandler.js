(function () {
  var n, worker, running;

  if (typeof urls !== 'undefined') {
    running = 0;
    for (n = 0; n < urls.length; ++n) {
      worker = new Worker("../../public/workers/getHTML.js");
      worker.onmessage = workerDone;
      worker.postMessage({ id: n, url: urls[n] });
      ++running;
    }
  }
  function workerDone(e) {
    --running;
    var btn = document.getElementsByClassName('scanBtn')[e.data.id]
    btn.disabled = false
    btn.textContent = "Scan"
  }
})();