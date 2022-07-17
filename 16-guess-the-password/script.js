function myApplication() {
  const startPage = document.querySelector('#start-page');
  const gamePage = document.querySelector('#game-page');
  const wordDisplay = document.querySelector('#words');

  // navigation
  document.querySelector('#start-btn > button').addEventListener('click', () => {
    startPage.className = 'hide';
    gamePage.className = 'show';

    // clear existing words and display new ones
    let guessesRemaining = 3;
    document.querySelector('#guesses').innerHTML = guessesRemaining;
    const wg = new WordGenerator().getWords(10);
    wordDisplay.innerHTML = '';

    for (let word of wg.words) {
      const p = document.createElement('p');
      p.innerHTML = word;
      p.className = 'unselected';
      p.addEventListener('click', function () {
        if (guessesRemaining > 0) {
          if (p.id === wg.answer) {
            this.innerHTML = 'CORRECT';
            guessesRemaining = 0;
          } else {
            this.className = 'incorrect';
            this.innerHTML = 'element --> Matching Letters: ?';
            --guessesRemaining;
            if (guessesRemaining >= 0) {
              document.querySelector('#guesses').innerHTML = guessesRemaining;
            }
          }
        }
      });
      wordDisplay.appendChild(p);
    }
  });

  document.querySelector('#return-btn > button').addEventListener('click', () => {
    gamePage.className = 'hide';
    startPage.className = 'show';
  });
}

document.addEventListener('DOMContentLoaded', myApplication);
