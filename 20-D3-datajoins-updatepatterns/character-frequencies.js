class CharacterFrequency {
  #charFreq = {};

  updateCharFreq(w) {
    for (const letter in this.#charFreq) {
      if (w.includes(letter)) {
        this.#charFreq[letter] = { count: 0, newlyAdded: false };
      } else {
        delete this.#charFreq[letter];
      }
    }

    for (const letter of w) {
      if (letter in this.#charFreq) {
        this.#charFreq[letter].count += 1;
      } else {
        this.#charFreq[letter] = { count: 1, newlyAdded: true };
      }
    }

    return this.#charFreq;
  }
}

const cf = new CharacterFrequency();

document.querySelector("form").onsubmit = (event) => {
  event.preventDefault();
  const letters = document.querySelector("#letters");

  document.querySelector(".results > h2 > span").innerHTML = letters.value;
  document.querySelector(".results > #graph").innerHTML = JSON.stringify(
    cf.updateCharFreq(letters.value)
  );

  document.querySelector(".results").classList.remove("hide");
  letters.value = "";
};
