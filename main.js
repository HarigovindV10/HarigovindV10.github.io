/* Harigovind Valsakumar — portfolio behaviour.
   Nav, scroll-spy, section reveals, project filtering, and the contact form
   (POST /api/contact -> Cloudflare Pages Function -> Resend). */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav ─────────────────────────────────────────────────── */
  function nav() {
    var btn = document.querySelector('[data-nav-toggle]');
    var links = document.querySelector('[data-nav-links]');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      links.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  /* ── Scroll-spy ─────────────────────────────────────────────────── */
  function spy() {
    var links = document.querySelectorAll('[data-nav]');
    if (!links.length) return;
    var ids = Array.prototype.map.call(links, function (a) { return a.getAttribute('data-nav'); });
    var ticking = false;

    function update() {
      ticking = false;
      var current = null;
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      });
      Array.prototype.forEach.call(links, function (a) {
        a.classList.toggle('is-active', a.getAttribute('data-nav') === current);
      });
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* ── Section reveals ────────────────────────────────────────────── */
  function reveals() {
    var els = document.querySelectorAll('.will-rise');
    if (!els.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(els, function (el) { el.style.opacity = '1'; });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });

    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* ── Project filtering ──────────────────────────────────────────── */
  function filters() {
    var btns = document.querySelectorAll('[data-filter]');
    var list = document.querySelector('[data-repos]');
    if (!btns.length || !list) return;

    var rows = list.querySelectorAll('[data-cat]');

    Array.prototype.forEach.call(btns, function (btn) {
      btn.addEventListener('click', function () {
        var want = btn.getAttribute('data-filter');

        Array.prototype.forEach.call(btns, function (b) {
          var on = b === btn;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });

        Array.prototype.forEach.call(rows, function (row) {
          row.hidden = want !== 'all' && row.getAttribute('data-cat') !== want;
        });
      });
    });
  }

  /* ── Contact form ───────────────────────────────────────────────── */
  /* Posts JSON to the Pages Function at /api/contact, which validates again
     server-side and sends through Resend. `subject` and the `company`
     honeypot are both required by that endpoint — do not drop them. */
  function contact() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var fields = ['name', 'email', 'subject', 'message'];
    var status = document.getElementById('formStatus');
    var sent = document.getElementById('formSent');

    function setError(id, msg) {
      var el = document.getElementById(id);
      if (!el) return;
      var group = el.closest('.field');
      var err = document.getElementById(id + 'Error');
      if (msg) {
        if (err) err.textContent = msg;
        group.classList.add('invalid');
      } else {
        group.classList.remove('invalid');
      }
    }

    function validateField(id) {
      var value = document.getElementById(id).value.trim();
      if (!value) { setError(id, 'This field is required.'); return false; }
      if (id === 'email' && !EMAIL_RE.test(value)) {
        setError(id, 'Please enter a valid email address.');
        return false;
      }
      setError(id, null);
      return true;
    }

    // Live feedback as the visitor leaves or corrects a field.
    fields.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('blur', function () { validateField(id); });
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('invalid')) validateField(id);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      var valid = fields.map(validateField).every(Boolean);
      if (!valid) {
        var firstInvalid = form.querySelector('.field.invalid input, .field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var label = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('name').value.trim(),
          email: document.getElementById('email').value.trim(),
          subject: document.getElementById('subject').value.trim(),
          message: document.getElementById('message').value.trim(),
          company: document.getElementById('company').value // honeypot
        })
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          form.style.display = 'none';
          if (sent) sent.style.display = 'flex';
          return;
        }
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (data.errors) {
            Object.keys(data.errors).forEach(function (id) { setError(id, data.errors[id]); });
          }
          status.textContent = data.error ||
            'Sorry, something went wrong. Please try again or email contact@harigovindvalsakumar.com.';
        });
      }).catch(function () {
        status.textContent =
          'Network error. Please try again or email contact@harigovindvalsakumar.com.';
      }).then(function () {
        btn.textContent = label;
        btn.disabled = false;
      });
    });
  }

  /* ── Copyright year ─────────────────────────────────────────────── */
  function year() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function init() { nav(); spy(); reveals(); filters(); contact(); year(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
