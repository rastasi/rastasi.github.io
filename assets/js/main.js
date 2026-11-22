(function () {
  'use strict';

  var PALETTE = [
    [0x00, 0x00, 0x00], [0xFF, 0xFF, 0xFF], [0x68, 0x37, 0x2B], [0x70, 0xA4, 0xB2],
    [0x6F, 0x3D, 0x86], [0x58, 0x8D, 0x43], [0x35, 0x28, 0x79], [0xB8, 0xC7, 0x6F],
    [0x6F, 0x4F, 0x25], [0x43, 0x39, 0x00], [0x9A, 0x67, 0x59], [0x44, 0x44, 0x44],
    [0x6C, 0x6C, 0x6C], [0x9A, 0xD2, 0x84], [0x6C, 0x5E, 0xB5], [0x95, 0x95, 0x95]
  ];
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  var MULTICOLOR_WIDTH = 64;

  function updateClock() {
    var el = document.getElementById('clock');
    if (!el) return;
    var now = new Date();
    el.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }

  function nearestColor(r, g, b) {
    var best = 0;
    var bestDist = Infinity;
    for (var i = 0; i < PALETTE.length; i++) {
      var dr = r - PALETTE[i][0];
      var dg = g - PALETTE[i][1];
      var db = b - PALETTE[i][2];
      var dist = dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11;
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return PALETTE[best];
  }

  function toC64(img) {
    if (img.dataset.c64) return;
    var w = MULTICOLOR_WIDTH;
    var h = Math.round((w * 2 * img.naturalHeight) / img.naturalWidth);
    var src = document.createElement('canvas');
    src.width = w;
    src.height = h;
    var ctx = src.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    var data = ctx.getImageData(0, 0, w, h);
    var px = data.data;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var i = (y * w + x) * 4;
        var bias = (BAYER[(y % 4) * 4 + (x % 4)] / 16 - 0.5) * 48;
        var c = nearestColor(px[i] + bias, px[i + 1] + bias, px[i + 2] + bias);
        px[i] = c[0];
        px[i + 1] = c[1];
        px[i + 2] = c[2];
      }
    }
    ctx.putImageData(data, 0, 0);
    var out = document.createElement('canvas');
    out.width = w * 2;
    out.height = h;
    var outCtx = out.getContext('2d');
    outCtx.imageSmoothingEnabled = false;
    outCtx.drawImage(src, 0, 0, w * 2, h);
    img.dataset.c64 = '1';
    img.src = out.toDataURL('image/png');
  }

  function convertWhenLoaded(img) {
    var run = function () {
      try {
        toC64(img);
      } catch (e) {
        img.dataset.c64 = 'skipped';
      }
    };
    if (img.complete && img.naturalWidth) run();
    else img.addEventListener('load', run, { once: true });
  }

  function bindHotkeys() {
    var links = {};
    document.querySelectorAll('.menu a[data-key]').forEach(function (a) {
      links[a.dataset.key] = a;
    });
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      var link = links[e.key.toLowerCase()];
      if (!link) return;
      e.preventDefault();
      document.querySelectorAll('.menu a.is-active').forEach(function (a) {
        a.classList.remove('is-active');
      });
      link.classList.add('is-active');
      var target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ block: 'start' });
    });
  }

  updateClock();
  setInterval(updateClock, 30000);
  bindHotkeys();
  document.querySelectorAll('img.c64-pic').forEach(convertWhenLoaded);
})();
