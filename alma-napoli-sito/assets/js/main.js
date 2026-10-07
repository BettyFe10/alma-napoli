(function () {
  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Date minime nei campi check-in / check-out
  function iso(d) { return d.toISOString().slice(0, 10); }
  var today = new Date();
  var tomorrow = new Date(today.getTime() + 86400000);
  document.querySelectorAll('input[type="date"][data-min="today"]').forEach(function (el) { el.min = iso(today); });
  document.querySelectorAll('input[type="date"][data-min="tomorrow"]').forEach(function (el) { el.min = iso(tomorrow); });

  // Ricerca rapida: passa date e ospiti alla pagina di prenotazione.
  // Quando sarà disponibile il booking engine, adattare i nomi dei parametri.
  document.querySelectorAll('form[data-quick-book]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var params = new URLSearchParams(new FormData(form));
      window.location.href = 'prenota.html?' + params.toString();
    });
  });

  // Precompila i campi nella pagina di prenotazione
  var qs = new URLSearchParams(window.location.search);
  ['checkin', 'checkout', 'ospiti'].forEach(function (k) {
    var el = document.querySelector('[data-prefill="' + k + '"]');
    if (el && qs.get(k)) { el.textContent = qs.get(k); }
  });

  // Modulo contatti
  var contact = document.querySelector('form[data-contact]');
  if (contact) {
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = contact.querySelector('.form-msg');
      if (msg) { msg.hidden = false; }
      contact.reset();
    });
  }

  // Anno nel footer
  var y = document.querySelector('[data-year]');
  if (y) { y.textContent = new Date().getFullYear(); }
})();
