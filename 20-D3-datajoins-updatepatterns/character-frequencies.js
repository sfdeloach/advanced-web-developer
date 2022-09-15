document.querySelector('form').onsubmit = event => {
  event.preventDefault();
  const letters = document.querySelector('#letters');
  document.querySelector('.graph > h2 > span').innerHTML = letters.value;
  document.querySelector('.graph').classList.remove('hide');
  letters.value = '';
};
