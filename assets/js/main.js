(function () {
  'use strict';

  // === Smooth scroll for menu anchor links ===
  document.querySelectorAll('ul[role="menu"] a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');

      // Contact modal
      if (targetId === '#contact') {
        e.preventDefault();
        showContact();
        return;
      }

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        // Make sure the target is visible
        if (target.style.display === 'none') {
          target.style.display = '';
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Select All (Easter egg in Edit menu) ===
  var selectAllBtn = document.getElementById('select-all-btn');
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.getSelection().selectAllChildren(document.body);
    });
  }

  // === Welcome Continue button ===
  var continueBtn = document.getElementById('welcome-continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', function () {
      var about = document.getElementById('about');
      if (about) {
        about.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // === Contact modal show/hide ===
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
  if (overlay) {
    overlay.addEventListener('click', hideContact);
  }

  var closeBtn = document.getElementById('contact-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideContact);
  }

  // === Technology checkbox filters ===
  document.querySelectorAll('input[name="tech-filter"]').forEach(function (chk) {
    chk.addEventListener('change', function () {
      var category = this.dataset.category;
      var sections = document.querySelectorAll('.tech-category[data-category="' + category + '"]');
      var checked = this.checked;
      sections.forEach(function (s) {
        if (checked) {
          s.classList.remove('hidden-category');
        } else {
          s.classList.add('hidden-category');
        }
      });
    });
  });

  // === Experience select filter ===
  var expFilter = document.getElementById('exp-filter');
  if (expFilter) {
    expFilter.addEventListener('change', function () {
      var val = this.value;
      document.querySelectorAll('.exp-phase').forEach(function (phase) {
        if (val === 'all') {
          phase.classList.remove('hidden-phase');
        } else {
          if (phase.dataset.phase === val) {
            phase.classList.remove('hidden-phase');
          } else {
            phase.classList.add('hidden-phase');
          }
        }
      });
    });
  }

  // === Update checkmark state for a section ===
  function updateCheck(sectionId) {
    var section = document.getElementById(sectionId);
    var link = document.querySelector('[data-toggle-section="' + sectionId + '"]');
    if (!link) return;
    var check = link.querySelector('.menu-check');
    if (!check) return;
    var isVisible = section && section.style.display !== 'none';
    if (isVisible) {
      check.classList.remove('hidden-check');
    } else {
      check.classList.add('hidden-check');
    }
  }

  // === View menu: toggle window visibility ===
  document.querySelectorAll('[data-toggle-section]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var sectionId = this.dataset.toggleSection;
      var section = document.getElementById(sectionId);
      if (section) {
        section.style.display = section.style.display === 'none' ? '' : 'none';
        updateCheck(sectionId);
      }
    });
  });

  // === Close buttons hide the parent window ===
  document.querySelectorAll('.window .close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var win = this.closest('.window');
      if (win && win.id) {
        win.style.display = 'none';
        updateCheck(win.id);
      }
    });
  });

})();
