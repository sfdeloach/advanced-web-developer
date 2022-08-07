// SELECTIONS AND CHANGING PROPERTIES //////////////////////////////////////////////////////////////

// demonstrate that D3 has properly loaded
console.dir(d3);

// display D3's version
console.log(`D3 version ${d3.version}`);

// using CSS selectors to select DOM elements returns a Selection object
const pageTitle = d3.select('#page-title');
console.log(pageTitle);

// selectAll returns all matches
const listItems = d3.selectAll('li');
console.log(listItems);

// DO NOT DO the following to access elements, this is not how you do it:
const listItemGroups = d3.selectAll('li')._groups[0];
console.log(listItemGroups); // returns a NodeList (https://developer.mozilla.org/en-US/docs/Web/API/NodeList)

// instead, use the nodes or node method to access
console.log(listItems.nodes()); // returns an Array
console.log(listItems.node()); // returns a HTMLLIElement

// most of the time, you do not want to access elements directly, usually you want to interact with
// them through the D3 object, here is how to set styles, attributes, and text:
pageTitle
  .style('background-color', '#00feab')
  .style('color', 'gray')
  .attr('class', 'new-class another-class') // adding more than one class
  .text('D3 is cool!');

// omitting a parameter results in getters:
console.log(pageTitle.style('background-color'));
console.log(pageTitle.attr('class'));
console.log(pageTitle.text());

// another method to apply classes, the 2nd argument accepts a boolean to determine if a class
// should be applied
pageTitle.classed('new-class', false); // removes .new-class
console.log('.new-class has been removed, only this class remains: ' + pageTitle.attr('class'));

// USING CALLBACKS ON SELECTIONS ///////////////////////////////////////////////////////////////////

// randomly changes the size on each list item
listItems.style('font-size', (_, idx) => Math.random() * 60 + 10 + 'px');

// D3 uses the following callback structure, the underscore will be discussed later, the idx
// parameter is the index, this example shows how to add shading to every other row
listItems.style('background-color', (_, idx) => (idx % 2 == 1 ? 'yellow' : 'none'));

// CHAINING SELECTION METHODS //////////////////////////////////////////////////////////////////////

// D3 methods can be chained together to "drill down" through elements and change their properties
d3.select('.outer')
  .style('color', 'blue')
  .style('font-size', '20px')
  .select('div')
  .style('background-color', 'orange')
  .select('div')
  .style('border', '4px solid blue');
