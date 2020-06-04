const keyButton = document.querySelectorAll(`.button`);
const middlePanel = document.querySelector(`.box-2`);
const bottomLeft = document.querySelector(`.box-3`);
const bottomPanel = document.querySelector(`.box-4`);

function sendToScreen(data, location) {
  const addToScreen = document.createTextNode(data);
  location.appendChild(addToScreen);
}

function clearScreen() {
  bottomPanel.innerText = ``;
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
  const firstPartOfCalculation = bottomPanel.innerText;
  clearScreen();
  sendToScreen(firstPartOfCalculation, middlePanel);
}

function returnResult(firstPart, operator, secondPart) {
  clearAllScreens();
  sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
  if (operator === `+`) {
    return parseInt(firstPart) + parseInt(secondPart);
  }
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
    case `➗`:
      break;
    case `✖️`:
      break;
    case `➖`:
      break;
    case `➕`:
      firstCalculation();
      sendToScreen(`+`, bottomLeft);
      break;
    case `=`:
      sendToScreen(
        returnResult(
          middlePanel.innerText,
          bottomLeft.innerText,
          bottomPanel.innerText
        ),
        bottomPanel
      );
      break;
    default:
      sendToScreen(btnPrsd, bottomPanel);
  }
}

keyButton.forEach(element => {
  element.addEventListener('click', event => {
    buttonAction(event.srcElement.innerText);
  });
});

document.addEventListener('keypress', keyPressed => {
  // Get the charcode for the keypressed
  const kp = keyPressed.charCode;
  // Get only the numbers pressed
  if (kp >= 48 && kp <= 57) {
    sendToScreen(String.fromCharCode(kp), bottomPanel);
  }
});
