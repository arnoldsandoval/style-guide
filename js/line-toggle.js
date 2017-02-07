(function () {
  'use strict';

  var toggle = document.querySelector('.js-line-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      Array.prototype.slice.call(
        document.querySelectorAll('.docs-true-text-margins-demo--red-line')
      ).forEach(function (line) {
        line.classList.toggle('is-visible');
      });
    });
  }
})();
