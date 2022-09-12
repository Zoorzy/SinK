(function () {
  var worker = new Worker("../../public/workers/getResource.js");
  worker.onmessage = displayResults;
  worker.postMessage({
    path: '/api/vulns',
    method: 'GET'
  });

  const resultsContainer = document.getElementById('resultsContainer');

  function displayResults(e) {
    var obj = JSON.parse(e.data.response);

    for (let i = 0; i < obj.length; i++) {
      var str = JSON.stringify(obj[i], undefined, 4);
      output(syntaxHighlight(str));
    }
  }

  function output(str) {
    var divSec = document.createElement('div');
    divSec.classList.add('bg-secondary', 'rounded', 'h-100', 'p-4');
    divSec.appendChild(document.createElement('pre')).innerHTML = str;

    var root = document.createElement('div');
    root.classList.add('col-sm-12', 'col-xl-6');
    root.appendChild(divSec);

    resultsContainer.appendChild(root);
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
})();