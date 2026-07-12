(function () {
  'use strict';

  var videos = document.querySelectorAll('.atelier-portal__video');
  if (!videos.length) {
    return;
  }

  // Respect prefers-reduced-motion: pause the looping background video
  // entirely (not just hide it via CSS) rather than let it autoplay for
  // users who've asked for reduced motion.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyMotionPreference(video) {
    if (reduceMotion.matches) {
      video.pause();
      video.removeAttribute('autoplay');
    } else if (video.paused) {
      video.play().catch(function () {
        // Autoplay blocked by the browser; the poster frame stays visible.
      });
    }
  }

  videos.forEach(applyMotionPreference);

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', function () {
      videos.forEach(applyMotionPreference);
    });
  }
})();
