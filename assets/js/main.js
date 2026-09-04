(function () {
  'use strict';

  // Workbench clock
  function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var el = document.getElementById('wb-clock');
    if (el) el.textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Contact requestor
  function showContact() {
    var modal = document.getElementById('contact');
    var overlay = document.getElementById('modal-overlay');
    if (modal) modal.style.display = '';
    if (overlay) overlay.style.display = '';
  }

  function hideContact() {
    var modal = document.getElementById('contact');
    var overlay = document.getElementById('modal-overlay');
    if (modal) modal.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
  }

  var overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.addEventListener('click', hideContact);

  var closeBtn = document.getElementById('contact-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', hideContact);

  // Shell bar buttons
  var btnHome = document.getElementById('wb-btn-home');
  if (btnHome) {
    btnHome.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var btnMenu = document.getElementById('wb-btn-menu');
  if (btnMenu) {
    btnMenu.addEventListener('click', showContact);
  }

  // Screen bar jump-to
  var wbJump = document.getElementById('wb-jump');
  if (wbJump) {
    wbJump.addEventListener('change', function () {
      var id = this.value;
      if (id) {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.selectedIndex = 0;
    });
  }

  // Technology checkbox filters
  document.querySelectorAll('input[name="tech-filter"]').forEach(function (chk) {
    chk.addEventListener('change', function () {
      var category = this.dataset.category;
      var checked = this.checked;
      document.querySelectorAll('.tech-category[data-category="' + category + '"]').forEach(function (s) {
        s.classList.toggle('hidden-category', !checked);
      });
    });
  });

  // Experience select filter
  var expFilter = document.getElementById('exp-filter');
  if (expFilter) {
    expFilter.addEventListener('change', function () {
      var val = this.value;
      document.querySelectorAll('.exp-phase').forEach(function (phase) {
        phase.classList.toggle('hidden-phase', val !== 'all' && phase.dataset.phase !== val);
      });
    });
  }

  // Shell search
  var searchInput = document.getElementById('wb-search');
  var searchClear = document.getElementById('wb-search-clear');
  var searchTimer = null;

  function clearHighlights() {
    document.querySelectorAll('mark.wb-highlight').forEach(function (m) {
      var parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  function highlightText(root, term) {
    if (!term) return 0;
    var count = 0;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var lower = term.toLowerCase();
    nodes.forEach(function (node) {
      var parent = node.parentNode;
      if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' ||
          parent.tagName === 'INPUT' || parent.tagName === 'SELECT' ||
          parent.classList.contains('wb-shell-field')) return;
      var text = node.textContent;
      var idx = text.toLowerCase().indexOf(lower);
      if (idx === -1) return;
      var frag = document.createDocumentFragment();
      var lastIdx = 0;
      while (idx !== -1) {
        frag.appendChild(document.createTextNode(text.substring(lastIdx, idx)));
        var mark = document.createElement('mark');
        mark.className = 'wb-highlight';
        mark.textContent = text.substring(idx, idx + term.length);
        frag.appendChild(mark);
        count++;
        lastIdx = idx + term.length;
        idx = text.toLowerCase().indexOf(lower, lastIdx);
      }
      frag.appendChild(document.createTextNode(text.substring(lastIdx)));
      parent.replaceChild(frag, node);
    });
    return count;
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      var val = this.value.trim();
      searchClear.classList.toggle('visible', val.length > 0);
      searchTimer = setTimeout(function () {
        clearHighlights();
        if (val.length >= 2) {
          var count = highlightText(document.querySelector('.wb-desktop'), val);
          if (count > 0) {
            var first = document.querySelector('mark.wb-highlight');
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 250);
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', function () {
      searchInput.value = '';
      searchClear.classList.remove('visible');
      clearHighlights();
      searchInput.focus();
    });
  }

})();
