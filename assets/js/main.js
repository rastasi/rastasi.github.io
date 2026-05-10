(function () {
  'use strict';

  // Smooth scroll for nav anchor links
  document.querySelectorAll('#main-nav a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#contact') {
        e.preventDefault();
        showContact();
        return;
      }
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Welcome continue button
  var continueBtn = document.getElementById('welcome-continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', function () {
      var about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Contact modal
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

})();
