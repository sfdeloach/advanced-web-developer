function myApplication() {
  const startPage = document.querySelector('#start-page');
  const gamePage = document.querySelector('#game-page');
  const wordDisplay = document.querySelector('#words');
  const gameOverMsg = document.querySelector('#gameover');

  let guessesRemaining;

  const start = () => {
    startPage.className = 'hide';
    gamePage.className = 'show';

    // clear existing words and display new ones
    guessesRemaining = 4;
    document.querySelector('#guesses').innerHTML = guessesRemaining;
    wordDisplay.innerHTML = '';
    gameOverMsg.className = 'hide';
    const wg = new WordGenerator();
    wg.getWords(10);

    for (let word of wg.words) {
      const p = document.createElement('p');
      p.innerHTML = word;
      p.className = 'unselected';
      p.addEventListener('click', handleWordClick(word, wg));
      wordDisplay.appendChild(p);
    }
  };

  const handleWordClick = (word, wg) => {
    return function () {
      if (guessesRemaining > 0) {
        this.innerHTML = `${word} --> Matching Letters: ${wg.getLetters(word)}`;
        if (word === wg.answer) {
          this.className = 'correct';
          gameOverMsg.firstChild.innerHTML = 'Congratulations! You win!';
          gameOverMsg.className = 'show';
          guessesRemaining = 0;
        } else {
          this.className = 'incorrect';
          --guessesRemaining;
          document.querySelector('#guesses').innerHTML = guessesRemaining;
          if (guessesRemaining === 0) {
            gameOverMsg.firstChild.innerHTML = 'Sorry! You lose!';
            gameOverMsg.className = 'show';
          }
        }
      }
    };
  };

  document.querySelector('#start-btn > button').addEventListener('click', start);
  
  document.querySelector('#gameover span:nth-child(2n)').addEventListener('click', () => {
    startPage.className = 'show';
    gamePage.className = 'hide';
  });
}

document.addEventListener('DOMContentLoaded', myApplication);
