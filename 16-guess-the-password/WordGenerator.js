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
  const arr = [];
  let counter = quantity;

  while (counter > 0) {
    const word = this.wordBank[this.random()];
    if (arr.indexOf(word) === -1) {
      arr.push(word);
      --counter;
    }
  }

  return { answer: arr[this.random(quantity)], words: arr };
};

WordGenerator.prototype.random = function (range = 100) {
  return Math.floor(Math.random() * range);
};
