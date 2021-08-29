'use strict';
const preview = document.querySelector('#preview');
const previewForm = document.querySelector("#previewForm");
const copy = document.querySelector(".copy__text");
const copyButton = document.querySelector("#copy");

previewForm.addEventListener('focusin', (e) => {
  if(!e.target.dataset.border) return;

  let borderElement = e.target;
  let borderContainer = borderElement.closest('[data-border-container]');
  if(!borderContainer) return;

  borderElement.addEventListener('input', (e) => {
    let val = e.target.value;
    if (!/\d+(px|em|rem|%){1}/g.test(val) && val) {
      e.target.classList.add('error');
      return;
    }
    e.target.classList.remove('error');
    let borderRadius = { horizontal: 0, vertical: 0 };

    let childrenInputs = borderContainer.querySelectorAll('[data-border]');
    for(let child of childrenInputs) {
      switch(child.dataset.border) {
        case "horizontal":
          borderRadius.horizontal = (child.value) ? child.value : 0;
          break;
        case "vertical":
          borderRadius.vertical = (child.value) ? child.value : 0;
          break;
      }
    }

    preview.style['border'+borderContainer.dataset.borderContainer+'Radius'] = `${borderRadius.horizontal} ${borderRadius.vertical}`;
    
    copy.querySelector('#' + borderContainer.dataset.borderContainer + '-horizontal').textContent = borderRadius.horizontal;
    copy.querySelector('#' + borderContainer.dataset.borderContainer + '-vertical').textContent = borderRadius.vertical;
  });
});

copyButton.addEventListener('click', (e) => {
  let r = document.createRange();
  r.selectNode(copy);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  let newElem = document.createElement('div');
  newElem.style.position = "absolute";
  newElem.innerText = "Copied to clipboard!";
  newElem.style.whiteSpace = "nowrap";
  newElem.style.color = "#fff";
  newElem.style.opacity = 1;
  newElem.style.transition = "1s opacity";
  copy.append(newElem);

  let copyRect = document.querySelector(".copy").getBoundingClientRect();
  newElem.style.top = copyRect.height + (newElem.clientHeight/2) + "px";
  newElem.style.left = (copyRect.width / 2) - (newElem.clientWidth / 2) + "px";

  setTimeout(() => { newElem.style.opacity = 0; setTimeout(() => { newElem.remove(); }, 1000); }, 1500);

  e.preventDefault();
});