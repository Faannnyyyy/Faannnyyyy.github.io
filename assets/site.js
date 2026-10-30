(function () {
  var doc = document;

  // Navigation
  var nav = doc.querySelector('.nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Apparition au défilement et lien actif
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (r) { io.observe(r); });

    var links = doc.querySelectorAll('.nav nav a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    doc.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });
  } else {
    reveals.forEach(function (r) { r.classList.add('in'); });
  }

  // Filtres des réalisations
  var buttons = doc.querySelectorAll('.filters button');
  var cards = doc.querySelectorAll('.gallery .card');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.filter;
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      cards.forEach(function (c) {
        c.hidden = f !== 'tous' && c.dataset.cat.split(' ').indexOf(f) < 0;
        c.classList.add('in');
      });
    });
  });

  // Agrandissement des images
  var lb = doc.getElementById('lb');
  var big = lb.querySelector('img');
  doc.querySelectorAll('.zoom').forEach(function (z) {
    z.addEventListener('click', function () {
      var i = z.querySelector('img');
      big.src = i.src;
      big.alt = i.alt;
      lb.showModal();
    });
  });
  lb.querySelector('button').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  // Carte du parcours (sans la carte, la liste reste lisible)
  var el = doc.getElementById('map');
  var stops = doc.querySelectorAll('.stop');
  if (!window.L) { el.style.display = 'none'; return; }
  var map = L.map(el, { scrollWheelZoom: false, attributionControl: true });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">contributeurs OpenStreetMap</a>'
  }).addTo(map);

  var markers = [];
  var pts = [];
  function select(i, fly) {
    stops.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    markers.forEach(function (m, k) {
      var n = m.getElement();
      if (n) n.firstChild.classList.toggle('on', k === i);
    });
    if (fly) map.flyTo(pts[i], 10, { duration: 0.9 });
    markers[i].openPopup();
  }
  stops.forEach(function (s, i) {
    var p = [parseFloat(s.dataset.lat), parseFloat(s.dataset.lon)];
    pts.push(p);
    var m = L.marker(p, {
      icon: L.divIcon({ className: '', html: '<div class="pinmap"></div>', iconSize: [30, 30], iconAnchor: [15, 34], popupAnchor: [0, -32] }),
      title: s.dataset.place, alt: s.dataset.place
    }).addTo(map).bindPopup('<b>' + s.dataset.place + '</b><br>' + s.querySelector('h3').textContent);
    m.on('click', function () { select(i, false); });
    markers.push(m);
    s.addEventListener('click', function () { select(i, true); });
    s.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i, true); }
    });
  });
  map.fitBounds(L.latLngBounds(pts), { padding: [46, 46] });
  stops[0].classList.add('on');
  markers[0].getElement().firstChild.classList.add('on');
})();
