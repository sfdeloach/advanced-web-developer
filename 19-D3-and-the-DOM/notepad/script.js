let noteID = 0;

function addNote() {
  ++noteID;
  d3.select('#userInput').node().value = '';
}

d3.select('#userInput').on('keyup', function () {
  if (d3.event.code === 'Enter') {
    addNote();
  } else if (d3.select('ul').select(`#note${noteID}`).node()) {
    d3.select(`#note${noteID}`).text(this.value);
  } else {
    d3.select('ul').append('li').attr('id', `note${noteID}`).text(this.value);
  }
});

d3.select('#addNote').on('click', () => {
  addNote();
});

d3.select('#clearNote').on('click', () => {
  d3.selectAll('li').remove();
});

d3.select('#mode').on('click', function () {
  if (d3.select('body').classed('light')) {
    d3.select('body').attr('class', 'dark');
    d3.select('#mode').text('Dark Mode');
  } else {
    d3.select('body').attr('class', 'light');
    d3.select('#mode').text('Light Mode');
  }
});
