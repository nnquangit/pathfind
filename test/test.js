const assert = require('assert')
const { Point, Grid } = require('..').Astar
const test = new Grid(6, ['2|2', '3|2', '3|3'])
const path = test.findPath(new Point(1, 5), new Point(4, 1))

assert.equal(path.getPath().join(), ['1|5', '1|4', '1|3', '1|2', '1|1', '2|1', '3|1', '4|1'].join())
console.log(`Done`)
