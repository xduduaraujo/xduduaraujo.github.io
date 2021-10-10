document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const startButton = document.getElementById('1');
  const images = document.querySelectorAll('img');
  const wrongLetter = document.getElementById('wrongLetter');
  const rightLetter = document.getElementById('rightLetter');
  const input = document.querySelector('#letter')

  let word;
  let objectIndex = 0;
  let wrongCount = 0;
  let wrongLetters = [];
  let rightLetters = [];
  let wordLength;
  let tip;

  eventsOnLoad();

  async function startGame() {
    const result = await getData();
    loadGame(result);
  }

  async function getData() {
    const response = await fetch(
      'https://hangman-game-6910b-default-rtdb.firebaseio.com/hangman-game.json'
    );
    const data = await response.json();
    const dataLength = data.palavras.length;
    randomNumber(dataLength);

    return data.palavras;
  }

  function loadGame(data) {
    const wordTip = document.querySelector('.wordTip');
    const wordSpace = document.querySelector('.wordSpace');
    const object = data[objectIndex];
    word = object.palavra;
    wordLength = word.length;
    tip = object.categoria;

    startButton.removeEventListener('click', startGame);
    startButton.textContent = 'RESTART';
    startButton.addEventListener('click', resetAndStartGame);

    for (i = 0; i < wordLength; i++) {
      if (hasWhiteSpace(word[i])) {
        const marginSpan = createSpan(i, 'marginSpan', null);
        wordSpace.appendChild(marginSpan);
      } else {
        const wordSpan = createSpan(i, 'letterField', null);
        wordSpace.appendChild(wordSpan);
      }
    }

    const tipTitle = createSpan('tipTitle', null, 'Dica da palavra:');
    const tipCreate = createSpan(null, 'tip', tip);

    wordTip.appendChild(tipTitle);
    wordTip.appendChild(tipCreate);
  }

  function eventsOnLoad() {
    startButton.addEventListener('click', startGame);
    form.addEventListener('submit', onSubmit);
  }

  function onSubmit(event) {
    event.preventDefault();

    const inputLetter = event.target[0].value.toUpperCase();
    word = word.toUpperCase();

    if (isInvalid(inputLetter)) {
      alert('Palavra inválida ou já inserida.');
    } else {
      if (word.includes(inputLetter)) {
        insertRightLetter(inputLetter);
      } else {
        insertWrongLetter(inputLetter);
      }
    }
  }

  function resetGame() {
    let letterFields = document.querySelectorAll('.letterField');
    let wordTip = document.querySelectorAll('.wordTip span');
    let margins = document.querySelectorAll('.marginSpan')


    objectIndex = 0;
    wrongCount = 0;
    wrongLetters = [];
    rightLetters = [];
    input.value = ''

    startButton.removeEventListener('click', resetAndStartGame);

    images.forEach((img) => (img.style.visibility = 'hidden'));
    letterFields.forEach((field) => field.remove());
    wordTip.forEach((tip) => tip.remove());
    margins.forEach((margin) => margin.remove());
    rightLetter.innerText = '';
    wrongLetter.innerText = '';
  }

  function isInvalid(inputLetter) {
    if (
      inputLetter === ' ' ||
      wrongLetters.includes(inputLetter) ||
      rightLetters.includes(inputLetter)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function insertRightLetter(inputLetter) {
    let rightField = document.getElementById('right');
    let wordToCompare = [];
    let wordArray = word.split('');
    rightLetters.push(inputLetter);

    rightLetter.innerText += ' ' + inputLetter;
    rightField.appendChild(rightLetter);

    for (c = 0; c < wordLength; c++) {
      if (word[c] === inputLetter) {
        let field = document.getElementById(c);
        let createChar = document.createElement('a');
        createChar.innerText = inputLetter;
        field.appendChild(createChar);
      }
      input.value = ''
    }

    let letters = document.querySelectorAll('.letterField a');
    letters.forEach((x) => wordToCompare.push(x.textContent));

    checkWin(wordArray, wordToCompare);
  }

  function insertWrongLetter(inputLetter) {
    let wrongField = document.getElementById('wrong');

    wrongLetter.innerText += ' ' + inputLetter;
    images[wrongCount].style.visibility = 'visible';
    wrongField.appendChild(wrongLetter);
    wrongLetters.push(inputLetter);
    checkLose();
  }

  function checkWin(wordArray, wordToCompare) {
    if (JSON.stringify(wordArray) === JSON.stringify(wordToCompare)) {
      images[6].style.visibility = 'visible';
      setTimeout(() => {
        resetAndStartGame();
      }, 1000);
    }
    input.value = ''
  }

  function checkLose() {
    if (wrongCount === 6) {
      images.forEach((img) => (img.style.visibility = 'hidden'));
      images[7].style.visibility = 'visible';
      setTimeout(() => {
        resetAndStartGame();
      }, 1000);
    }
    wrongCount++;
  }

  function resetAndStartGame() {
    resetGame();
    startGame();
  }

  function createSpan(id, classname, text) {
    let span = document.createElement('span');
    span.id = id;
    span.className = classname;
    span.innerText = text;

    return span;
  }

  function randomNumber(number) {
    objectIndex = Math.floor(Math.random() * number);
  }

  function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }
});
