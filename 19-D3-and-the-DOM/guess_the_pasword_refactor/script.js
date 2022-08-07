d3.select('#start-btn').on('click', () => {
  const guess = new GuessThePassword();
  let guessesRemaining = 4;

  console.log(guess.props);

  d3.select('#start-page').attr('class', 'hide');
  d3.select('#game-page').attr('class', 'show');
  d3.select('#words').html(''); // remove all children
  d3.select('#guesses').text(guessesRemaining);
  d3.select('#game-over').attr('class', 'hide');

  // listener for 'Play again?' message at the end of the game
  d3.select('#game-over span:nth-child(2n)').on('click', () => {
    d3.select('#start-page').attr('class', 'show');
    d3.select('#game-page').attr('class', 'hide');
  });

  d3.select('#words')
    .selectAll('p')
    .data(guess.props.words)
    .enter()
    .append('p')
    .attr('id', (_, idx) => `word_${idx}`)
    .attr('class', 'unselected')
    .text(word => word)
    .on('click', function (text, idx) {
      const message = `${text} --> Matching Letters: ${guess.getLettersCorrect(text)}`;

      if (guess.props.answer === idx) {
        // Game won
        d3.select(`#word_${idx}`).attr('class', 'correct').text(message);
        d3.select('#game-over')
          .attr('class', 'show')
          .select('span')
          .text('Congratulations! You win!');
        d3.select('#words').selectAll('p').on('click', null);
      } else {
        d3.select(`#word_${idx}`).attr('class', 'incorrect').text(message);
        d3.select('#guesses').text(--guessesRemaining);

        // Game lost
        if (guessesRemaining == 0) {
          d3.select('#words').selectAll('p').on('click', null);
          d3.select('#game-over').attr('class', 'show').select('span').text('Sorry! You lose!');
        }
      }
    });
});
