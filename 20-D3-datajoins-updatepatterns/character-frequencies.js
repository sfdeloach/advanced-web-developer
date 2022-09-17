class CharacterFrequency {
  #charFreq = {};
  #newChars = 0;

  get characterFrequency() {
    const resultArray = [];

    for (const char in this.#charFreq) {
      resultArray.push({
        char,
        count: this.#charFreq[char].count,
        isNewChar: this.#charFreq[char].isNewChar,
      });
    }

    return resultArray;
  }

  get newCharactersTotal() {
    return this.#newChars;
  }

  updateCharFreq(w) {
    this.#newChars = 0;

    for (const letter in this.#charFreq) {
      if (w.includes(letter)) {
        this.#charFreq[letter] = { count: 0, isNewChar: false };
      } else {
        delete this.#charFreq[letter];
      }
    }

    for (const letter of w) {
      if (letter in this.#charFreq) {
        this.#charFreq[letter].count += 1;
      } else {
        this.#charFreq[letter] = { count: 1, isNewChar: true };
        this.#newChars += 1;
      }
    }

    return;
  }
}

let cf = new CharacterFrequency();

document.querySelector("form").onsubmit = (event) => {
  event.preventDefault();

  const letters = document.querySelector("#letters");
  cf.updateCharFreq(letters.value);

  document.querySelector(".results > h2 > span").innerHTML = letters.value;
  document.querySelector(".results > h4 > span").innerHTML = cf.newCharactersTotal;

  /*
  # General Update pattern

  1. Grab the update selection, make any changes unique to that selection, and store the selection
     in a variable.
  2. Grab the exit selection and remove any unnecessary elements.
  3. Grab the enter selection and make any changes unique to that selection.
  4. Merge the enter and update selections, and make any changes that you want to be shared across
     both selections.
  */

  const mySelection = d3
    .select("#graph")
    .selectAll("div")
    // make unique changes to update selection
    .data(cf.characterFrequency, (d) => d.char);

  // remove exit selection
  mySelection.exit().remove();

  mySelection
    .enter()
    .append("div")
    // make unique changes to enter selection
    .merge(mySelection)
    // make changes to both selections
    .text((d) => d.char);

  document.querySelector(".results").classList.remove("hide");
  letters.value = "";
};

document.querySelector("form > #reset").addEventListener("click", (event) => {
  cf = new CharacterFrequency();
  document.querySelector(".results").classList.add("hide");
});
