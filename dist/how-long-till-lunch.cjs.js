'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Astar = {};

class Point {
  constructor(x, y, parent, weight) {
    Object.assign(this, { id: `${x}|${y}`, x, y, parent, w: weight || 0 });
  }

  isMatch(node) {
    return this.x === node.x && this.y === node.y
  }

  getPath() {
    let parent = this.parent;
    let result = [this.id];
    while (parent) {
      result.push(parent.id);
      parent = parent.parent;
    }
    return result.reverse()
  }
}

class Grid {
  constructor(size, wall) {
    Object.assign(this, { size, wall });
  }

  findPath(root, target) {
    var Open = [root];
    var Closed = [];
    var Visited = [];

    while (!!Open.length) {
      var best = 0;
      for (var i = 1; i < Open.length; i++) {
        if (Open[i].w < Open[best].w) {
          best = i;
        }
      }

      var current = Open.splice(best, 1)[0];
      if (current.isMatch(target)) {
        return current
      }

      var neighbors = this.neighbors(current, target);
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (Visited.indexOf(neighbor.id) === -1) {
          Visited.push(neighbor.id);
          Open.push(neighbor);
        }
      }

      Closed.push(current.id);
    }
    return false
  }

  isWalkable(node) {
    if (this.wall.indexOf(`${node.id}`) > -1) {
      return false
    }

    if (node.x < 0 || node.x > this.size) {
      return false
    }

    if (node.y < 0 || node.y > this.size) {
      return false
    }

    return true
  }

  weight(x, y, x1, y1) {
    return Math.abs(x - x1) + Math.abs(y - y1)
  }

  neighbors(current, target) {
    var results = [];
    var x = current.x;
    var y = current.y;

    var N = new Point(x, y - 1, current, current.w + this.weight(x, y - 1, target.x, target.y));
    var S = new Point(x, y + 1, current, current.w + this.weight(x, y + 1, target.x, target.y));
    var E = new Point(x + 1, y, current, current.w + this.weight(x + 1, y, target.x, target.y));
    var W = new Point(x - 1, y, current, current.w + this.weight(x - 1, y, target.x, target.y));

    this.isWalkable(N) && results.push(N);
    this.isWalkable(S) && results.push(S);
    this.isWalkable(E) && results.push(E);
    this.isWalkable(W) && results.push(W);

    return results
  }
}

Astar.Point = Point;
Astar.Grid = Grid;

exports.Astar = Astar;
