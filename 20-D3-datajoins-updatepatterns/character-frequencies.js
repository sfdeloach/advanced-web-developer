// The charFreq uses an object to keep track of unique character values. When called by D3 to
// produce its data (get characterFrequency), the object is converted to an array.
class CharacterFrequency {
  // private
  #charFreq = {};
  #newChars = 0;

  // getter that transforms an object to an array
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

  // Iterate over enumerable keys of the existing #charFreq object to see if it already contains
  // characters in the newly provided string, then iterate over the word to count occurrences.
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
    .data(cf.characterFrequency, (d) => d.char)
    // make unique changes to update selection
    .style("color", "black");

  // remove exit selection
  mySelection.exit().remove();

  mySelection
    .enter()
    .append("div")
    // make unique changes to enter selection
    .merge(mySelection)
    // make changes to both selections
    .attr("class", "char")
    .style("height", (d) => d.count * 24 + "px")
    .text((d) => d.char);

  // show the graph and clear the input field
  document.querySelector(".results").classList.remove("hide");
  letters.value = "";
};

// Reset the form, create a new reference to the character frequency object, remove the data set
// from the D3 object, and hide the graph portion of the page
document.querySelector("form > #reset").addEventListener("click", (event) => {
  cf = new CharacterFrequency();
  d3.select("#graph").selectAll("div").data([]).exit().remove();
  document.querySelector(".results").classList.add("hide");
});
