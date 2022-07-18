function WordGenerator(quantity) {
  this.wordBank = [
    'contain',
    'blue-eyed',
    'tall',
    'ambiguous',
    'peck',
    'aunt',
    'nonchalant',
    'icy',
    'supply',
    'applaud',
    'boundary',
    'robin',
    'noxious',
    'influence',
    'gruesome',
    'bikes',
    'interesting',
    'trouble',
    'nine',
    'thoughtless',
    'dinner',
    'worry',
    'grab',
    'mine',
    'songs',
    'uptight',
    'acid',
    'suggestion',
    'zebra',
    'delirious',
    'spectacular',
    'dare',
    'small',
    'debonair',
    'hurry',
    'mature',
    'cellar',
    'interrupt',
    'glow',
    'famous',
    'education',
    'x-ray',
    'beef',
    'yard',
    'creature',
    'deeply',
    'waste',
    'guarantee',
    'receive',
    'substantial',
    'cold',
    'rod',
    'smelly',
    'humorous',
    'fixed',
    'public',
    'insurance',
    'damp',
    'incredible',
    'letters',
    'ablaze',
    'absurd',
    'agreeable',
    'reflect',
    'cent',
    'poised',
    'crib',
    'marble',
    'tranquil',
    'wish',
    'upbeat',
    'pat',
    'wave',
    'hesitant',
    'camp',
    'thrill',
    'juggle',
    'unlock',
    'boring',
    'annoying',
    'scientific',
    'early',
    'wren',
    'twig',
    'wistful',
    'second-hand',
    'observe',
    'deep',
    'scare',
    'zephyr',
    'disturbed',
    'testy',
    'odd',
    'ticket',
    'enthusiastic',
    'known',
    'sick',
    'troubled',
    'shame',
    'dynamic'
  ];
}

WordGenerator.prototype.getWords = function (quantity) {
  this.words = [];
  let counter = quantity;

  while (counter > 0) {
    const word = this.wordBank[this.random()];
    if (this.words.indexOf(word) === -1) {
      this.words.push(word);
      --counter;
    }
  }

  this.answer = this.words[this.random(quantity)];
};

WordGenerator.prototype.random = function (range = 100) {
  return Math.floor(Math.random() * range);
};

WordGenerator.prototype.getLetters = function (word) {
  const guess = this.letterMap(word);
  const answer = this.letterMap();
  let matchingLetters = 0;

  for (const letter in guess) {
    if (letter in answer) {
      matchingLetters = matchingLetters + Math.min(guess[letter], answer[letter]);
    }
  }

  return matchingLetters;
};

WordGenerator.prototype.letterMap = function (word = this.answer) {
  return word.split('').reduce((acc, curr) => {
    acc[curr] = ++acc[curr] || 1;
    return acc;
  }, {});
};
