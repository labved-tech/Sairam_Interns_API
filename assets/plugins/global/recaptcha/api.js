/* PLEASE DO NOT COPY AND PASTE THIS CODE. */ (function () {
  const w = window;
  const C = '___grecaptcha_cfg';
  const cfg = (w[C] = w[C] || {});
  const N = 'grecaptcha';
  const gr = (w[N] = w[N] || {});
  gr.ready =
    gr.ready ||
    function (f) {
      (cfg.fns = cfg.fns || []).push(f);
    };
  w.__recaptcha_api = 'https://www.google.com/recaptcha/api2/';
  (cfg.render = cfg.render || []).push('onload');
  w.__google_recaptcha_client = true;
  const d = document;
  const po = d.createElement('script');
  po.type = 'text/javascript';
  po.async = true;
  po.src =
    'https://www.gstatic.com/recaptcha/releases/rCr6uVkhcBxHr-Uhry4bcSYc/recaptcha__en.js';
  po.crossOrigin = 'anonymous';
  po.integrity =
    'sha384-XtymsJC8H3wYh57vnHxIWSTq9LJf2d3w3WVjR2gR+rDtBuWO8zdvO/s6O6Cli/Oe';
  const e = d.querySelector('script[nonce]');
  const n = e && (e.nonce || e.getAttribute('nonce'));
  if (n) {
    po.setAttribute('nonce', n);
  }
  const s = d.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(po, s);
})();
