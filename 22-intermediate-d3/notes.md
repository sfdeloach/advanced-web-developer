# Intermediate D3

## Extreme Values

```
d3.max(dataArr {, callback})
d3.min(dataArr {, callback})

d3.extent(dataArr {, callback}) // returns an array [min, max]
```

The optional callback function is how to associate values to array element, this can be helpful when
finding the extremes based on a particular key.

## Scales

```
d3.scaleLinear()
  .domain([num1, num2])
  .range([num3, num4]);

// i.e. mapping a domain to a negative range of numbers
d3.scaleLinear()
  .domain([0, maxBirths])
  .range([graphHeight, 0]);
```

This function linearly maps a domain to a range, helpful when dealing with the reversed y-axis as
shown in the above example. The arguments passed to domain and range must be an array.

## Axes

```
d3.axisTop(scale)
d3.axisBottom(scale)
d3.axisLeft(scale)
d3.axisRight(scale)
```

Top, bottom, left, and right refer to where the text will be placed relative to the axis. By
default, all axes will originate from the top left corner of the svg window. You must use a
transpose/translate function to move the axis to the bottom or right side of the graph, if desired

## Gridlines

```
axis.tickSize([size])
```
