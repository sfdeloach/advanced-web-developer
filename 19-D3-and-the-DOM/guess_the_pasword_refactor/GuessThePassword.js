'use strict';

class GuessThePassword {
  constructor(size = 10) {
    this.createGameProps(size);
  }

  // public class members
  createGameProps(size) {
    const wordSet = new Set();

    while (wordSet.size < size) {
      wordSet.add(this.#wordBank[Math.floor(Math.random() * this.#wordBank.length)]);
    }

    const answer = Math.floor(Math.random() * size);
    const words = Array.from(wordSet);
    const mapping = this.#makeMap(words[answer]);

    this.props = { answer, mapping, words };
  }

  getLettersCorrect(word) {
    let correctLetters = 0;
    const wordMap = this.#makeMap(word);

    for (const prop in wordMap) {
      if (prop in this.props.mapping) {
        correctLetters += Math.min(wordMap[prop], this.props.mapping[prop]);
      }
    }

    return correctLetters;
  }

  // private class members
  #makeMap(word) {
    const result = {};

    for (const letter of word) {
      if (letter in result) {
        result[letter] += 1;
      } else {
        result[letter] = 1;
      }
    }

    return result;
  }

  #wordBank = [
    '8Zc2j4QxqBsv22an',
    '2uvr6VgU8edAqw28',
    'FVdCCMf9rjPwxB3b',
    'FEZ868d77kQaKHZ5',
    'hPW9bvs7QnuEsXDD',
    'caFHDSwG6wBgGc5t',
    'EjE2Vp5y9SQWxHzP',
    'KSFgSKCENJhawZJQ',
    'cbRCTePGZuKygxfW',
    'AjNMmDXKAvRcCYzt',
    'tskApj98W2GM3CG4',
    'aYY9Dd37Z8uqULqN',
    'nFBgRTxVLpc5JJ7s',
    '3cHzpVMWNeE4Mh33',
    'srFHdJzBhGUddVpE',
    'yYgVwrRJVFrMw8Ch',
    'y2CAbCqvsWYMb8JF',
    'FDvbHDQS49QXdLXq',
    'R7G8tayc57jc4vj8',
    'zYrceFu8LexUkEM7',
    'S8CaZ4DvAt6MzxvH',
    'MPH5QEWamXfjD49W',
    'UDqXTJrGLLUgqTFc',
    'CaTDfKAFS4fv2Mnb',
    'yyE7YCDHEjHf3uyK',
    'A4TMzTy3WpDnZQpG',
    'tnH3suZu87FYkDwj',
    'QK65fZDyG9BxKQUk',
    'RNaMq2MzRfBmQEsF',
    'Dd2ecdnVR9uKr2S2',
    '3s3YKRn92sVDpn7Y',
    'j9Kkpbvb85XNznMv',
    'jj8ZvaWs7wXEAmnb',
    '6D2Jk5uTTftDPduc',
    'EASwSpuXcsavPxkF',
    'SNMJ9JQKeDGK3crA',
    'y3GqbG3KWZCeCdHm',
    'QQEpa4PcEss4A4Rn',
    'KRLu8BCSEJtTFS6H',
    'pWFPBJf6W47mTrCJ',
    'nPeLN7vy3j35xg5S',
    '2T6c6d66zaMf95U3',
    'SQ6uaxuDswNcTv3S',
    '5uCwrRzdVAvpVGvk',
    'LwUCvSW8DTTrQFgP',
    '9QLGst3sv7MT5XF6',
    'UwcKVxsJVKreDndb',
    'SkUmX9yyGeau3Apg',
    'bTYFgGDBsvBqG8Ue',
    'WFeV5tyCBqgWmhMj',
    'xxmyZ5S4t4xDCuqG',
    'vqHdLu6J2dRMhtQ7',
    '8REwrj8JvueMgrRh',
    'ZQG3SKbjMdx4zBHV',
    'dB3nrdKsZV2dBSUk',
    's24MEDbHX5R8CZ87',
    'rH2bVxsvm6XAyD7s',
    'ANTReJ2dSDnHMERJ',
    'Zg7Khuf6EsXYhVut',
    'G2Sp7kyq3hDsELZS',
    'y6FutWFGuxbg3EAy',
    'ETnhezLey7eXmqUk',
    'F9UMKZymTTkGYfq8',
    'zMBjNhZ7UXEhxwqu',
    'Hw25zEyyByVwqdDR',
    'kKzHg7dZLg6vmhJ8',
    'qUCKFadCJnmpmAPf',
    'yvyJNcXQDbHYNGPE',
    'K2BgPrFUxLUmhSrm',
    'wZpmpgT2GbUcCwp3',
    'ZgnmDXbVCwNwyVbC',
    'hYQSuJHKNHJBPWZk',
    'wJrUpbVGhMXjWK3D',
    'BBExTALF88jLL7xp',
    'fbsbDZLG2Ux9TDqV',
    '767fSvUW4jGSrU9m',
    'E4p4S9kxabcDSe4W',
    'ynSsnWFt9E5LCwcZ',
    '3EdWhGxaJx6L8FeG',
    '8qUEBh86nAuamV4S',
    'TDEYC3LZaA3BwQ6L',
    'ubweXBf3cctnUNNg',
    'ad7MGZPfNUpqF5m4',
    'nchUZwQ24yqKcLy6',
    '8d7mqzNnSLVLs5rL',
    '6uuM4UuEKwY32TRv',
    'zDRqKy6TXZhWpRn4',
    'wEW8tCpWCmNeVfz2',
    'tNsdhSJw4PzzXEg9',
    '64kDuxpXQxypVkMj',
    'J8PZ64bszyuzkgEL',
    'tGPsGt3aR4ekFHZk',
    'EG37A4mbbJBx8QNw',
    'bjjbyxpcUMtSpkCA',
    'FYeBvnTCem78tC3T',
    'wScjX8kxYJuZjnLd',
    'vQRrUaQRrFPwT47e',
    'Ek6MrJEejKMw9Ftv',
    'MrJNYB5UFJhfAmCq',
    'dCr8tYJBJcakPF3M'
  ];
}
