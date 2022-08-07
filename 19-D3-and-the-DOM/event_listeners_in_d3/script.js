d3.select('#new-note').on('submit', () => {
  d3.event.preventDefault(); // prevent the page from refreshing

  const input = d3.select('input');

  // add paragraph element to notes div
  d3.select('#notes').append('p').attr('class', 'note').text(input.property('value'));

  // clear input
  input.property('value', '');
});

d3.select('#clear').on('click', () => {
  d3.selectAll('p').remove();
});
