(function () {
  var worker,
    running = 0,
    sinks = [
      'x.write',
      'x.writeln',
      'x.insertAdjacentHTML(...)',
      'x.innerHTML'
    ];

  document.getElementById('txthtml').addEventListener('JSexploded', (e) => {
    var patternSinks = document.getElementById('pattern-sinks');
    for (var i = 0; i < sinks.length; i++) {
      var dd = document.createElement('dd');
      dd.textContent = sinks[i];
      patternSinks.appendChild(dd);
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
      worker.onmessage = displayResults;
      worker.postMessage({
        path: '/api/ASTScanner',
        data: window.encodeURIComponent(elem),
        id: i
      });
      ++running;
    }
  });

  function displayResults(e) {
    --running;
    if (e.data.status !== 200) return;

    var obj = JSON.parse(e.data.response);
    var str = JSON.stringify(obj, undefined, 4);

    if (str == '[]') return;

    document.getElementById('accordionFlushExample').innerHTML += '<h2>Script File n.' + (e.data.id + 1) + '</h2>';
    output(syntaxHighlight(str));
    if (running == 0) setProgressBar(0, 100);
  }

  function output(inp) {
    document.getElementById('accordionFlushExample').appendChild(document.createElement('pre')).innerHTML = inp;
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