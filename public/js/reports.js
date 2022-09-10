(function () {
  var worker = new Worker("../../public/workers/getResource.js");
  worker.onmessage = displayResults;
  worker.postMessage({
    path: '/api/vulns',
    method: 'GET'
  });

  function displayResults(e) {
    var obj = JSON.parse(e.data.response);
    for (let i = 0; i < obj.length; i++) {
      output(obj[i]);
    }
  }

  function output(obj) {
    // _id
    var _id = document.createElement('dt');
    _id.classList.add('col-sm-4');
    _id.textContent = '_id';
    var _idValue = document.createElement('dd');
    _idValue.classList.add('col-sm-8');
    _idValue.textContent = obj._id;

    // url
    var url = document.createElement('dt');
    url.classList.add('col-sm-4');
    url.textContent = 'url';
    var urlValue = document.createElement('dd');
    urlValue.classList.add('col-sm-8');
    urlValue.textContent = obj.url;

    // date
    var date = document.createElement('dt');
    date.classList.add('col-sm-4');
    date.textContent = 'date';
    var dateValue = document.createElement('dd');
    dateValue.classList.add('col-sm-8');
    dateValue.textContent = obj.date;

    // type
    var type = document.createElement('dt');
    type.classList.add('col-sm-4');
    type.textContent = 'type';
    // type content
    var typeValue = document.createElement('dd');
    typeValue.classList.add('col-sm-8');
    typeValue.textContent = obj.Node.type;

    // start
    var start = document.createElement('dt');
    start.classList.add('col-sm-4');
    start.textContent = 'start';
    // start Value
    var startValue = document.createElement('dd');
    startValue.classList.add('col-sm-8');
    startValue.innerHTML = 'line: ' + obj.Node.loc.start.line + '<br>';
    startValue.innerHTML += 'column: ' + obj.Node.loc.start.column + '<br>';
    startValue.innerHTML += 'index: ' + obj.Node.loc.start.index + '<br>';

    // end
    var end = document.createElement('dt');
    end.classList.add('col-sm-4');
    end.textContent = 'end';
    // end Value
    var endValue = document.createElement('dd');
    endValue.classList.add('col-sm-8');
    endValue.innerHTML = 'line: ' + obj.Node.loc.end.line + '<br>';
    endValue.innerHTML += 'column: ' + obj.Node.loc.end.column + '<br>';
    endValue.innerHTML += 'index: ' + obj.Node.loc.end.index + '<br>';

    // loc
    var loc = document.createElement('dt');
    loc.classList.add('col-sm-4');
    loc.textContent = 'loc';
    // loc Value
    var locValue = document.createElement('dd');
    locValue.classList.add('col-sm-8');
    // loc List
    var locList = document.createElement('dl');
    locList.classList.add('row');
    locList.appendChild(start);
    locList.appendChild(startValue);
    locList.appendChild(end);
    locList.appendChild(endValue);
    locValue.appendChild(locList);

    // name
    var name = document.createElement('dt');
    name.classList.add('col-sm-4');
    name.textContent = 'name';
    // name content
    var nameValue = document.createElement('dd');
    nameValue.classList.add('col-sm-8');
    nameValue.textContent = obj.Node.name;

    // Node
    var Node = document.createElement('dt');
    Node.classList.add('col-sm-4');
    Node.textContent = 'Node';
    // Node Value
    var NodeValue = document.createElement('dd');
    NodeValue.classList.add('col-sm-8');
    // Node List
    var NodeList = document.createElement('dl');
    NodeList.classList.add('row');
    NodeList.appendChild(type);
    NodeList.appendChild(typeValue);
    NodeList.appendChild(loc);
    NodeList.appendChild(locValue);
    NodeList.appendChild(name);
    NodeList.appendChild(nameValue);
    NodeValue.appendChild(NodeList);


    var dl = document.createElement('dl');
    dl.classList.add('row', 'mb-0');
    dl.appendChild(_id);
    dl.appendChild(_idValue);
    dl.appendChild(url);
    dl.appendChild(urlValue);
    dl.appendChild(date);
    dl.appendChild(dateValue);
    dl.appendChild(Node);
    dl.appendChild(NodeValue);

    var divSec = document.createElement('div');
    divSec.classList.add('bg-secondary', 'rounded', 'h-100', 'p-4');
    divSec.appendChild(dl);

    var root = document.createElement('div');
    root.classList.add('col-sm-12', 'col-xl-6');
    root.appendChild(divSec);

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.appendChild(root);
  }
})();