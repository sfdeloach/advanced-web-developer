# Intermediate D3

## Extreme Values

```
d3.max(dataArr {, callback})
d3.min(dataArr {, callback})
```

The optional callback function is how to associate values to array element, this can be helpful when
finding the max item based on a particular key.

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
shown in the above example. The arguments passed to domain and range must be an array
