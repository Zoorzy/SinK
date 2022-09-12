(function () {
  var worker,
    running = 0,
    sinks = [
      'x.write',
      'x.writeln',
      'x.insertAdjacentHTML(...)',
      'x.innerHTML'
    ],
    displayedAtLeastOne = false;
  const results = document.getElementById('resultsContainer'),
    patternSinks = document.getElementById('pattern-sinks');

  document.getElementById('txthtml').addEventListener('JSexploded', (e) => {
    for (var i = 0; i < sinks.length; i++) {
      var dd = document.createElement('dd');
      dd.textContent = sinks[i];
      patternSinks.appendChild(dd);
    }

    // no js to analyze
    if (!e.detail.data.length) {
      setProgressBar(0, 100);
      results.innerHTML += '<p class="text-center">No script sources to analyze were found</p>';
      return;
    }

    // iterate throught every JSexploded string
    for (let i = 0; i < e.detail.data.length; i++) {
      var elem = e.detail.data[i]
      // Remove comments
      elem = elem.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '');
      // Remove new lines
      elem = elem.replace(/(\r\n|\n|\r)/gm, '');
      // Remove repetitive spaces
      elem = elem.replace(/\s\s+/g, ' ');

      // Recover Abstract Sintax Tree .....
      worker = new Worker("../../public/workers/getResource.js");
      worker.onmessage = (e) => {
        displayResults(e);
        saveLocalStorage(e);
      };
      worker.postMessage({
        path: '/api/ASTScanner',
        data: window.encodeURIComponent(elem),
        id: i,
        targetUrl: e.detail.targetUrl
      });
      ++running;
    }

  });

  function saveLocalStorage(e) {
    parsedResponse = JSON.parse(e.data.response);
    for (var i = 0; i < parsedResponse.length; i++) {
      if ((typeof parsedResponse[i] == 'undefined') || parsedResponse[i] == '') { return; }
      // se è tornata almeno una vulnerabilità tra quelle analizzate

      if (!window.localStorage.getItem('SinKScan')) window.localStorage.setItem('SinKScan', '[]');
      var items = JSON.parse(window.localStorage.getItem('SinKScan'));
      var item = { 'url': parsedResponse[i].url };

      if (!(items.length < 3)) { items.shift(); }

      items.push(item);

      localStorage.setItem('SinKScan', JSON.stringify(items));
      return;
    }
  }

  function displayResults(e) {
    --running;
    if (running == 0) {
      setProgressBar(0, 100);
      if (!displayedAtLeastOne) {
        results.innerHTML += '<p class="text-center">No vulnerabilities found</p>';
        return;
      }
      results.innerHTML += '<p class="text-center">No more results</p>';
      return;
    }
    //if (e.data.status !== 200) return;

    if (typeof e.data.response == 'undefined' || e.data.response == '[]') return;

    var obj = JSON.parse(e.data.response);
    var str = JSON.stringify(obj, undefined, 4);

    results.innerHTML += '<h2>Script File n.' + (e.data.id + 1) + ' returned a ' + e.data.status + ' status</h2>';
    output(syntaxHighlight(str));
    displayedAtLeastOne = true;
  }

  function output(inp) {
    results.appendChild(document.createElement('pre')).innerHTML = inp;
  }

  function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  function setProgressBar(id, newprogress) {
    var progressBar = document.getElementsByClassName('scanProgressBar')[id];
    progressBar.ariaValueNow = newprogress;
    progressBar.style.width = newprogress + "%";
  }
})();