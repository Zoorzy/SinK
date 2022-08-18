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
    var newprogress = "20"

    // Scan Code Button
    var scanBtn = document.getElementsByClassName('scanBtn')[e.data.id]
    scanBtn.disabled = false
    scanBtn.textContent = "Scan"

    // View Code Button
    var viewBtn = document.getElementsByClassName('viewBtn')[e.data.id]
    viewBtn.disabled = false

    // Download Code Button 
    var downloadBtn = document.getElementsByClassName('downloadBtn')[e.data.id]
    downloadBtn.disabled = false

    // Progress Bar
    var progressBar = document.getElementsByClassName('scanProgressBar')[e.data.id]
    progressBar.ariaValueNow = newprogress
    progressBar.style.width = newprogress + "%"
  }
})();