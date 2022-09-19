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

d3.select("form").on("submit", function () {
  d3.event.preventDefault();

  const letters = d3.select("#letters").property("value");
  cf.updateCharFreq(letters);

  d3.select(".results > h2 > span").property("innerHTML", letters);
  d3.select(".results > h4 > span").property("innerHTML", cf.newCharactersTotal);

  /*
  # General Update pattern

  1. Grab the update selection, make any changes unique to that selection, and store the selection
     in a variable.
  2. Grab the exit selection and remove any unnecessary elements.
  3. Grab the enter selection and make any changes unique to that selection.
  4. Merge the enter and update selections, and make any changes that you want to be shared across
     both selections.
  */

  // Define the selection on the page and the data to model
  const mySelection = d3
    .select("#graph")
    .selectAll("div")
    .data(cf.characterFrequency, (d) => d.char);

  // The selection only contains data that was already associated with it, this is referred to as
  // the "update" selection, make changes unique to the "update" selection now
  mySelection.style("color", "black");

  // There may be items selected that are no longer associated to data, remove this "exit" selection
  mySelection.exit().remove();

  // Now create new views for new data by selecting the "enter" selection, also make any changes
  // unique only to this selection (no changes are made in this example)
  mySelection.enter().append("div");

  // Merge all selections and make any changes that apply to both the update and enter selections
  mySelection
    .merge(mySelection)
    // make changes to both selections
    .attr("class", "char")
    .style("height", (d) => d.count * 24 + "px")
    .text((d) => d.char);

  // show the graph and clear the input field
  d3.select(".results").classed("hide", false);
  d3.select("#letters").property("value", "");
});

// Reset the form, create a new reference to the character frequency object, remove the data set
// from the D3 object, and hide the graph portion of the page
document.querySelector("form > #reset").addEventListener("click", (event) => {
  // create a new character frequency object
  cf = new CharacterFrequency();

  // assign an empty dataset to the model
  d3.select("#graph").selectAll("div").data([]).exit().remove();

  // hide the results area of the page
  d3.select(".results").classed("hide", true);
});
