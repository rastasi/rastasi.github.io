(function () {
  'use strict';

  // S60 clock
  function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var el = document.getElementById('s60-clock');
    if (el) el.textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 30000);

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
        // Update active tab
        document.querySelectorAll('#main-nav .nav-links a').forEach(function (a) {
          a.classList.remove('s60-active');
        });
        this.classList.add('s60-active');
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

  // Softkey bar
  var softkeyOptions = document.getElementById('softkey-options');
  if (softkeyOptions) {
    softkeyOptions.addEventListener('click', showContact);
  }

  var softkeyBack = document.getElementById('softkey-back');
  if (softkeyBack) {
    softkeyBack.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Update active nav on scroll
  var sections = ['about', 'studies', 'technologies', 'experiences', 'hobbies'];
  var navLinks = document.querySelectorAll('#main-nav .nav-links a[href^="#"]');

  function onScroll() {
    var scrollY = window.scrollY + 80;
    var current = '';
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        current = id;
      }
    });
    navLinks.forEach(function (a) {
      if (a.getAttribute('href') === '#contact') return;
      a.classList.toggle('s60-active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

})();
