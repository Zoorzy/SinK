(function () {
  var n, worker, running;
  var urls = []
  for (const element of document.getElementsByName('hiddenUrls')) urls.push(element.value)

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
    var newprogress = "15"

    var scanBtn = document.getElementsByClassName('scanBtn')[e.data.id]
    scanBtn.disabled = false
    scanBtn.textContent = "Scan"

    var viewBtn = document.getElementsByClassName('viewBtn')[e.data.id]
    viewBtn.disabled = false

    var downloadBtn = document.getElementsByClassName('downloadBtn')[e.data.id]
    downloadBtn.disabled = false

    var progressBar = document.getElementsByClassName('scanProgressBar')[e.data.id]
    progressBar.ariaValueNow = newprogress
    progressBar.style.width = newprogress + "%"
    //$(progressBar).attr('aria-valuenow', newprogress).css('width', newprogress+"%");
  }
})();