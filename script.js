'use strict';
const preview = document.querySelector('#preview');
const previewForm = document.querySelector("#previewForm");


previewForm.addEventListener('focusin', (e) => {
  if(!e.target.dataset.border) return;

  let borderElement = e.target;
  let borderContainer = borderElement.closest('[data-border-container]');
  if(!borderContainer) return;

  borderElement.addEventListener('input', (e) => {
    let val = +e.target.value;
    if(!/\d+/.test(val)) return;

    let borderRadius = { left: 0, right: 0 };

    let childrenInputs = borderContainer.querySelectorAll('[data-border]');
    for(let child of childrenInputs) {
      switch(child.dataset.border) {
        case "horizontal":
          borderRadius.horizontal = +child.value;
          break;
        case "vertical":
          borderRadius.vertical= +child.value;
          break;
      }
    }

    preview.style['border'+borderContainer.dataset.borderContainer+'Radius'] = `${borderRadius.horizontal}px ${borderRadius.vertical}px`;
  });
});