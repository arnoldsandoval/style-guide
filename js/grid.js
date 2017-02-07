var buttons = document.querySelectorAll('.show');

var handleClick = function (evt) {
  var button = evt.target;
  var data = button.dataset;
  var targetEl = document.querySelector(data.target);

  var display;
  var buttonText;
  if (data.isOpen === 'true') {
    display = 'none';
    if (data.target === '#no-ratios') {
      buttonText = 'Show Markup';
    } else {
      buttonText = 'Show';
    }

    button.dataset.isOpen = false;
  } else {
    display = 'block';
    if (data.target === '#no-ratios') {
      buttonText = 'Hide Markup';
    } else {
      buttonText = 'Hide';
    }

    button.dataset.isOpen = true;
  }

  button.textContent = buttonText;
  targetEl.style.display = display;
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleClick);
}
