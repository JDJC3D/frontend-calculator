const userWindowHeight = window.innerHeight;
document.querySelector('body').style.minHeight = `${userWindowHeight}px`;
document.querySelector('html').style.minHeight = `${userWindowHeight}px`;
document.querySelector('.wrapper').style.minHeight = `${userWindowHeight}px`;

const keyButton = document.querySelectorAll(`.button`);
const middlePanel = document.querySelector(`.box-2`);
const bottomLeft = document.querySelector(`.box-3`);
const bottomPanel = document.querySelector(`.box-4`);

function sendToScreen(data, location) {
  if (bottomLeft.innerHTML === `=` && bottomPanel.innerHTML !== ``) {
    clearAllScreens();
  }
  if (bottomPanel.innerText.length < 9) {
    const addToScreen = document.createTextNode(data);
    location.appendChild(addToScreen);
  }
}

function clearScreen() {
  bottomPanel.innerText = ``;
  if (bottomLeft.inner === `=`) {
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
  middlePanel.innerText = ``;

  const firstPartOfCalculation = bottomPanel.innerText;

  if (firstPartOfCalculation[0] !== `0`) {
    clearScreen();
    sendToScreen(firstPartOfCalculation, middlePanel);
  } else {
    const firstPartOfCalculation2 = firstPartOfCalculation.substr(1);
    clearScreen();
    sendToScreen(firstPartOfCalculation2, middlePanel);
  }
}

function returnResult(firstPart, operator, secondPart) {
  clearAllScreens();
  if (bottomLeft.innerText.length < 1) {
    let total;
    switch (operator) {
      case `+`:
        total = parseFloat(firstPart) + parseFloat(secondPart);
        if (total.toString().length > 9) {
          sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
          return parseFloat(total).toExponential(5);
        }
        sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
        return parseFloat(total);
      case `-`:
        total = parseFloat(firstPart) - parseFloat(secondPart);
        if (total.toString().length > 9) {
          sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
          return parseFloat(total).toExponential(5);
        }
        sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
        return parseFloat(total);
      case `*`:
        total = parseFloat(firstPart) * parseFloat(secondPart);
        if (total.toString().length > 9) {
          sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
          return parseFloat(total).toExponential(5);
        }
        sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
        return parseFloat(total);
      case `/`:
        total = parseFloat(firstPart) / parseFloat(secondPart);
        if (total.toString().length > 9) {
          sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
          return parseFloat(total).toExponential(5);
        }
        sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
        return parseFloat(total);
      case `%`:
        total = (parseFloat(firstPart) / 100) * parseFloat(secondPart);
        if (total.toString().length > 9) {
          sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
          return parseFloat(total).toExponential(5);
        }
        sendToScreen(`${firstPart} ${operator} ${secondPart}`, middlePanel);
        return parseFloat(total);
      case `=`:
        break;
      default:
        break;
    }
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
      if (middlePanel.innerText !== `` && bottomPanel.innerText !== `` && bottomLeft.innerText !== `=`) {
        sendToScreen(returnResult(middlePanel.innerText, bottomLeft.innerText, bottomPanel.innerText), bottomPanel);
        bottomLeft.innerHTML = `=`;
      }
      break;
    case `.`:
      if (!bottomPanel.innerText.includes(`.`)) {
        sendToScreen(btnPrsd, bottomPanel);
      }
      break;
    case `0`:
      if (bottomPanel.innerText[0] !== `0` || bottomPanel.innerText.length > 1) {
        sendToScreen(btnPrsd, bottomPanel); // btnPrsd
      }
      break;
    default:
      sendToScreen(btnPrsd, bottomPanel);
  }
}

function keyButtonsPress(kp, kpword) {
  // Get the charcode for the keypressed
  // Get only the numbers pressed
  if (kp >= 49 && kp <= 57) {
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
    case `.`:
      if (!bottomPanel.innerText.includes(`.`)) {
        sendToScreen(String.fromCharCode(kp), bottomPanel);
      }
      break;
    case `0`:
      if (bottomPanel.innerText[0] !== `0` || bottomPanel.innerText.length > 1) {
        sendToScreen(String.fromCharCode(kp), bottomPanel);
      }
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
