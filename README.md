# Pathfind in Javascript


```js
import { Astar } from 'pathfind-js'

const { Point, Grid } = Astar
const test = new Grid(6, ['2|2', '3|2', '3|3'])
const path = test.findPath(new Point(1, 5), new Point(4, 1))

console.log(path.getPath());
```

## License

[MIT](LICENSE).
