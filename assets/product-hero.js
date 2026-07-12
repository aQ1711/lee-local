/**
 * Product Hero — "scroll to discover" cue.
 *
 * Purely a convenience: clicking it scrolls one viewport height down,
 * past the hero, to wherever the real product info (variant picker,
 * add to cart) begins. No section-to-section coupling needed since
 * the hero is always exactly one viewport tall.
 */
(function () {
  'use strict';

  document.querySelectorAll('[data-product-hero-scroll-cue]').forEach(function (button) {
    button.addEventListener('click', function () {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    });
  });
})();
