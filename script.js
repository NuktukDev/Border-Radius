const preview = document.querySelector('#preview');

preview.addEventListener('click', (e) => {
  if(!e.target.dataset.border) return;

  let borderElement = e.target;
  let borderType = borderElement.dataset.border;
  borderElement.addEventListener('input', (e) => {
    let val = +e.target.value;
    if(!/\d+/.test(val)) return;
    preview.style['border'+borderType+'Radius'] = val + 'px';
  });
});