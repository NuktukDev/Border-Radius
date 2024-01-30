'use strict';
const preview = document.querySelector('#preview');
const previewForm = document.querySelector("#previewForm");
const copy = document.querySelector(".copy__text");
const copyButton = document.querySelector("#copy");

previewForm.addEventListener('focusin', ({ target }) => {
  if(!target.dataset.border) return;

  const borderContainer = target.closest('[data-border-container]');
  if(!borderContainer) return;

  target.addEventListener('input', ({ target }) => {
    if (!/\d+(px|em|rem|%){1}/g.test(target.value) && target.value) {
      target.classList.add('error');
      return;
    }
    target.classList.remove('error');
    const borderRadius = { horizontal: 0, vertical: 0 };

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
    const radiusLocation = borderContainer.dataset.borderContainer; // TopLeft, TopRight, BottomLeft, or BottomRight
    preview.style[`border${radiusLocation}Radius`] = `${borderRadius.horizontal} ${borderRadius.vertical}`;
    
    copy.querySelector(`#${radiusLocation}-horizontal`).textContent = borderRadius.horizontal;
    copy.querySelector(`#${radiusLocation}-vertical`).textContent = borderRadius.vertical;
  });
});

copyButton.addEventListener('click', (e) => {
  const r = document.createRange();
  r.selectNode(copy);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  const newElem = document.createElement('div');
  newElem.style.position = "absolute";
  newElem.innerText = "Copied to clipboard!";
  newElem.style.whiteSpace = "nowrap";
  newElem.style.color = "#fff";
  newElem.style.opacity = 1;
  newElem.style.transition = "1s opacity";
  copy.append(newElem);

  const copyRect = document.querySelector(".copy").getBoundingClientRect();
  newElem.style.top = copyRect.height + (newElem.clientHeight/2) + "px";
  newElem.style.left = (copyRect.width / 2) - (newElem.clientWidth / 2) + "px";

  setTimeout(() => { newElem.style.opacity = 0; setTimeout(() => { newElem.remove(); }, 1000); }, 1500);

  e.preventDefault();
});
