(function () {
  var worker,
    running = 0,
    /*sources = [
      'document.location.href',
      'document.location',
      'document.cookie',
      'window.location.href',
      'window.location'
    ],*/
    sinks = [
      'x.write',
      //'x.writeln',
      //'x.insertAdjacentHTML(...)',
      //'x.innerHTML'
    ];

  document.getElementById('txthtml').addEventListener('JSexploded', (e) => {
    // display sources and sinks
    /*
    var patternSources = document.getElementById('pattern-sources');
    for (var i = 0; i < sources.length; i++) {
      var dd = document.createElement('dd');
      dd.textContent = sources[i];
      patternSources.appendChild(dd);
    }
    */
    var patternSinks = document.getElementById('pattern-sinks');
    for (var i = 0; i < sinks.length; i++) {
      var dd = document.createElement('dd');
      dd.textContent = sinks[i];
      patternSinks.appendChild(dd);
    }

    // if no JSexploded string is provided, then there is nothing to analyze
    /*if (!e.detail.data.length) {
      end({ id: 0, status: 0, response: 'There are no scripts to analize' })
    }*/

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
      worker.onmessage = scan;
      worker.postMessage({
        path: '/api/ASTScanner',
        data: window.encodeURIComponent(elem),
        id: i
      });
      ++running;
    }
  });

  async function scan(e) {
    --running;
    if (e.data.status !== 200) return;
    const AST = JSON.parse(e.data.response);
    //console.log(AST)
  }

  function end(data) {
    var parent = document.getElementById('accordionFlushExample');
    const ordinal = inWords(data.id + 1);
    const Ordinal = ordinal.charAt(0).toUpperCase().concat(ordinal.slice(1));

    let block = document.createElement('div');
    block.classList.add('accordion-item');
    block.classList.add('bg-transparent');

    let heading = document.createElement('h2');
    heading.classList.add('accordion-header');
    heading.id = 'flush-heading'.concat(Ordinal);

    let button = document.createElement('button');
    button.classList.add('accordion-button');
    button.classList.add('collapsed');
    button.type = 'button';
    button.dataset.bsToggle = 'collapse';
    button.dataset.bsTarget = '#flush-collapse'.concat(Ordinal);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'flush-collapse'.concat(Ordinal));
    button.textContent += 'Script file ' + Ordinal + ' - Status code: ' + data.status;

    let collapsed = document.createElement('div');
    collapsed.id = 'flush-collapse'.concat(Ordinal);
    collapsed.classList.add('accordion-collapse');
    collapsed.classList.add('collapse');
    //collapsed.classList.add('show');
    collapsed.setAttribute('aria-labelledby', 'flush-heading'.concat(Ordinal));
    collapsed.dataset.bsParent = '#accordionFlushExample';

    let collapsedBody = document.createElement('div');
    collapsedBody.classList.add('accordion-body');
    collapsedBody.textContent = data.response;

    heading.appendChild(button);
    block.appendChild(heading);
    collapsed.appendChild(collapsedBody);
    block.appendChild(collapsed);
    parent.appendChild(block);

    setProgressBar(0, 100);
  }

  /**
   * https://stackoverflow.com/questions/14766951/transform-numbers-to-words-in-lakh-crore-system
   */
  var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + '' + a[n[1][1]]) + 'crore' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + '' + a[n[2][1]]) + 'lakh' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + '' + a[n[3][1]]) + 'thousand' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + '' + a[n[4][1]]) + 'hundred' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and' : '') + (a[Number(n[5])] || b[n[5][0]] + '' + a[n[5][1]]) : '';
    return str;
  }

  function setProgressBar(id, newprogress) {
    var progressBar = document.getElementsByClassName('scanProgressBar')[id];
    progressBar.ariaValueNow = newprogress;
    progressBar.style.width = newprogress + "%";
  }
})();