const keyButton = document.querySelectorAll(`.button`);
const middlePanel = document.querySelector(`.box-2`);
const bottomLeft = document.querySelector(`.box-3`);
const bottomPanel = document.querySelector(`.box-4`);

function sendToScreen(data, location) {
  if (bottomPanel.innerText.length < 10) {
    const addToScreen = document.createTextNode(data);
    location.appendChild(addToScreen);
  }
}

function clearScreen() {
  bottomPanel.innerText = ``;
  if (bottomLeft.innner === `=`) {
    bottomLeft.innerText = ``;
  }
}

function clearAllScreens() {
  middlePanel.innerText = ``;
  bottomLeft.innerText = ``;
  clearScreen();
}

function backspaceButton() {
  const tempValue = bottomPanel.innerText;
  clearScreen();
  sendToScreen(tempValue.slice(0, -1), bottomPanel);
}

function firstCalculation() {
  bottomLeft.innerText = ``;
  const firstPartOfCalculation = bottomPanel.innerText;
  clearScreen();
  sendToScreen(firstPartOfCalculation, middlePanel);
}

function returnResult(firstPart, operator, secondPart) {
  clearAllScreens();
  if (bottomLeft.innerText.length < 1) {
    switch (operator) {
      case `+`:
        return parseInt(firstPart) + parseInt(secondPart);
      case `-`:
        return parseInt(firstPart) - parseInt(secondPart);
      case `*`:
        return parseInt(firstPart) * parseInt(secondPart);
      case `/`:
        return parseInt(firstPart) / parseInt(secondPart);
      case `%`:
        return (parseInt(firstPart) / 100) * parseInt(secondPart);
      case `=`:
        break;
      default:
        break;
    }
  }
  sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
}

function buttonAction(btnPrsd) {
  switch (btnPrsd) {
    case `AC`:
      clearAllScreens();
      break;
    case `C`:
      clearScreen();
      break;
    case `⌫`:
      backspaceButton();
      break;
    case `÷`:
      firstCalculation();
      sendToScreen(`/`, bottomLeft);
      break;
    case `x`:
      firstCalculation();
      sendToScreen(`*`, bottomLeft);
      break;
    case `-`:
      firstCalculation();
      sendToScreen(`-`, bottomLeft);
      break;
    case `+`:
      firstCalculation();
      sendToScreen(`+`, bottomLeft);
      break;
    case `%`:
      firstCalculation();
      sendToScreen(`%`, bottomLeft);
      break;
    case `=`:
      if (middlePanel.innerText !== `` && bottomPanel.innerText !== ``) {
        sendToScreen(returnResult(middlePanel.innerText, bottomLeft.innerText, bottomPanel.innerText), bottomPanel);
        bottomLeft.innerHTML = `=`;
      }
      break;
    default:
      sendToScreen(btnPrsd, bottomPanel);
  }
}

function keyButtonsPress(kp, kpword) {
  // Get the charcode for the keypressed
  // Get only the numbers pressed
  if (kp >= 48 && kp <= 57) {
    sendToScreen(String.fromCharCode(kp), bottomPanel);
  }

  switch (kpword) {
    case `+`:
      buttonAction(`+`);
      break;
    case `-`:
      buttonAction(`-`);
      break;
    case `/`:
      buttonAction(`÷`);
      break;
    case `*`:
      buttonAction(`x`);
      break;
    case `Enter`:
      buttonAction(`=`);
      break;
    case `%`:
      buttonAction(`%`);
      break;
    case `Backspace`:
      buttonAction(`⌫`);
      break;
    default:
      break;
  }
}

keyButton.forEach(element => {
  element.addEventListener('click', event => {
    buttonAction(event.srcElement.innerText);
  });
});

document.addEventListener('keypress', keyPressed => {
  const kp = keyPressed.charCode;
  const kpword = keyPressed.key;
  keyButtonsPress(kp, kpword);
});
