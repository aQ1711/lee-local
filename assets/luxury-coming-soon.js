/**
 * Luxury Coming Soon — entry-zone interaction.
 *
 * Handles only the client-side reveal: Request Entry button -> email
 * input (state 1 -> 2). That is the full extent of this script's job.
 * There's no decorative blinking cursor to manage — the browser's own
 * text caret (styled gold via caret-color in the CSS) is the only
 * cursor shown, which keeps the field simple and avoids two cursors
 * ever competing for the same spot.
 *
 * The input -> success transition (state 2 -> 3) is NOT done here.
 * The form below is a real Shopify `{% form 'customer' %}` tag: on
 * submit the browser does a normal full-page post, Shopify creates
 * the customer record (tagged "pre-launch"), and the page reloads
 * with `form.posted_successfully?` true. The section's Liquid then
 * renders the success state directly on that reload
 * (`data-initial-state="success"`) — no fetch, no fake timeout.
 */
(function () {
  'use strict';

  document.querySelectorAll('[data-entry-zone]').forEach(function (zone) {
    var trigger = zone.querySelector('[data-entry-trigger]');
    var form = zone.querySelector('form');
    var input = zone.querySelector('[data-entry-input]');

    if (!trigger || !form || !input) return;

    /* Step 1 -> 2: button fades out, input fades in. Only relevant
       when the page loaded in the default "trigger" state — if it
       reloaded in the "form" state (failed submission) or "success"
       state, the Liquid template already applied the right classes
       and this listener simply never fires. */
    trigger.addEventListener('click', function () {
      trigger.classList.add('is-hidden');

      // Slight stagger so the button has visibly left before the
      // input's own fade-in starts — reads as one smooth handoff
      // rather than a cross-fade collision.
      window.setTimeout(function () {
        form.classList.add('is-active');
        input.focus({ preventScroll: true });
      }, 220);
    });

    /* Deliberately no submit handler here: this is a real
       `{% form 'customer' %}` and we want the browser's normal,
       native submit (full-page POST) to happen — never call
       preventDefault() on it. Disabling the input on submit was
       considered (to block double-submits) and rejected: a disabled
       field's value is excluded from the POST body, which would
       silently drop the email. */
  });
})();
