var buttons = document.querySelectorAll('.js-section-toggle');

var handleClick = function (evt) {
  var button = evt.target;
  var targetEl = document.querySelector(button.dataset.target);

  if (targetEl.hasAttribute('hidden')) {
    targetEl.removeAttribute('hidden');
    button.textContent = 'Hide';
  } else {
    targetEl.setAttribute('hidden', '');
    button.textContent = 'Show';
  }
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleClick);
}
