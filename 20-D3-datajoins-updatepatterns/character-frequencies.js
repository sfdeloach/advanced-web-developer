// The charFreq uses an object to keep track of unique character values. When called by D3 to
// produce its data (get characterFrequency), the object is converted to an array.
class CharacterFrequency {
  // private
  #charFreq = {};

  // getter that transforms an object to an array
  get characterFrequency() {
    const resultArray = [];

    for (const char in this.#charFreq) {
      resultArray.push({
        char,
        count: this.#charFreq[char].count,
        isNewChar: this.#charFreq[char].isNewChar
      });
    }

    return resultArray;
  }

  // Iterate over enumerable keys of the existing #charFreq object to see if it already contains
  // characters in the newly provided string, then iterate over the word to count occurrences.
  updateCharFreq(w) {
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
      }
    }

    return;
  }
}

let cf = new CharacterFrequency();

d3.select('form').on('submit', function () {
  d3.event.preventDefault();

  const letters = d3.select('#letters').property('value');
  cf.updateCharFreq(letters);

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
    .select('#graph')
    .selectAll('div')
    .data(cf.characterFrequency, d => d.char); // join data with the char as the key

  // The selection only contains data that was already associated with it, this is referred to as
  // the "update" selection, make changes unique to the "update" selection now. Then select the
  // exit (elements in view with no associated data) and remove them from the DOM.
  mySelection.style('color', 'black').exit().remove();

  // Now create new views for new data by selecting the "enter" selection, also make any changes
  // unique only to this selection (no changes are made in this example). Note that the merge
  // function is chained to the enter selection.
  mySelection
    .enter()
    .append('div')
    .attr('class', 'char')
    .text(d => d.char)
    .merge(mySelection) // from now on, enter and update selection
    .style('height', d => d.count * 24 + 'px');

  // Update text at the top of the results section
  d3.select('.results > h2 > span').text(letters);
  d3.select('.results > h4 > span').text(mySelection.enter().nodes().length);

  // show the graph and clear the input field
  d3.select('.results').classed('hide', false);
  d3.select('#letters').property('value', '');
});

// Reset the form, remove the data set from the D3 object, and hide the graph portion of the page
d3.select('form > #reset').on('click', () => {
  // assign an empty dataset to the model
  d3.select('#graph').selectAll('div').remove();

  // hide the results area of the page
  d3.select('.results').classed('hide', true);
});
