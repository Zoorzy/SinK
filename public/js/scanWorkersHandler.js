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
    var newprogress
    if (e.data.status == 200) {
      newprogress = "100"
      // Scan Code Button
      var scanBtn = document.getElementsByClassName('scanBtn')[e.data.id]
      scanBtn.disabled = false
      scanBtn.textContent = "Scan"
      // Progress Bar
      setProgressBar(e.data.id, newprogress)
    }
    else if (e.data.status == 404) {
      newprogress = "0"
      // Scan Code Button
      var scanBtn = document.getElementsByClassName('scanBtn')[e.data.id]
      scanBtn.textContent = "404 Not Found"
      // Progress Bar
      setProgressBar(e.data.id, newprogress)
    }
  }
  function setProgressBar(id, newprogress) {
    var progressBar = document.getElementsByClassName('scanProgressBar')[id]
    progressBar.ariaValueNow = newprogress
    progressBar.style.width = newprogress + "%"
  }
})();