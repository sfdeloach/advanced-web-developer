// The charFreq uses an object to keep track of unique character values. When called by D3 to
// produce its data (get characterFrequency), the object is converted to an array.
class CharacterFrequency {
  // private
  #charFreq = {};

  // getter that transforms an object to an array
  get characterFrequency() {
    const resultArray = [];

    for (let char in this.#charFreq) {
      resultArray.push({
        char: char === ' ' ? '" "' : char, // label spaces for visibility
        count: this.#charFreq[char].count,
        isNewChar: this.#charFreq[char].isNewChar
      });
    }

    // return result sorted by count
    return resultArray.sort((a, b) => b.count - a.count);
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

window.onload = event => {
  let cf = new CharacterFrequency();
  const SVG_WIDTH = d3.select('#graph').property('clientWidth');
  const SVG_HEIGHT = d3.select('#graph').property('clientHeight');
  const BAR_WIDTH = SVG_WIDTH / 30;
  const BAR_HEIGHT_SCALE = 10;

  d3.select('form').on('submit', () => {
    d3.event.preventDefault();

    const letters = d3.select('#letters').property('value');
    cf.updateCharFreq(letters);

    // Display vertical bar graphs //////////
    const bars = d3
      .select('#graph')
      .selectAll('rect')
      .data(cf.characterFrequency, d => d.char);

    // Set attributes to the update selection and remove elements w/ no associated data
    bars.attr('class', 'old').exit().remove();

    // Set attributes to new elements w/ associated data, then merge and set attributes to the
    // entire selection (merge = enter + update)
    bars
      .enter()
      .append('rect')
      .attr('class', 'new')
      .attr('width', BAR_WIDTH)
      .merge(bars)
      .attr(
        'x',
        (d, i) =>
          BAR_WIDTH * i * 1.1 + SVG_WIDTH / 2 - (BAR_WIDTH * cf.characterFrequency.length * 1.1) / 2
      )
      .attr('y', d => SVG_HEIGHT - (d.count / BAR_HEIGHT_SCALE) * SVG_HEIGHT)
      .attr('height', d => (d.count / BAR_HEIGHT_SCALE) * SVG_HEIGHT);

    // Display labels on bar graph //////////
    const labels = d3
      .select('#graph')
      .selectAll('text')
      .data(cf.characterFrequency, d => d.char);

    labels.attr('class', 'old').exit().remove();

    labels
      .enter()
      .append('text')
      .text(d => d.char)
      .attr('class', 'new')
      .merge(labels)
      .attr(
        'x',
        (d, i) =>
          BAR_WIDTH * i * 1.1 +
          BAR_WIDTH / 2 +
          SVG_WIDTH / 2 -
          (BAR_WIDTH * cf.characterFrequency.length * 1.1) / 2
      )
      .attr(
        'y',
        d => SVG_HEIGHT - (d.count / BAR_HEIGHT_SCALE) * SVG_HEIGHT + BAR_HEIGHT_SCALE * 1.5
      );

    d3.select('.results > h2').text('Analyzing: ' + letters);
    d3.select('.results > h4').text(`(new letters: ${bars.enter().nodes().length})`);
    d3.select('#letters').property('value', '');
  });

  // Reset the form, remove the data set from the D3 object, and hide the graph portion of the page
  d3.select('form > #reset').on('click', () => {
    // assign an empty dataset to the model
    d3.select('#graph').selectAll('rect').remove();
    d3.select('#graph').selectAll('text').remove();

    // hide the results area of the page
    d3.select('.results > h2').text('');
    d3.select('.results > h4').text('');
  });
};
