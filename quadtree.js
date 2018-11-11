class Point {
  constructor(x, y, userData) {
    this.x = x
    this.y = y
    this.userData = userData
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h)
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h)
  }
}


class Circle {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.rSquared = this.r * this.r
  }


  contains(point) {
    let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2)
    return d <= this.rSquared
  }
  intersects(range) {
    var xDist = Math.abs(range.x - this.x)
    var yDist = Math.abs(range.y - this.y)

    var r = this.r

    var w = range.w
    var h = range.h

    var edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2)

    if (xDist > (r + w) || yDist > (r + h))
      return false

    if (xDist <= w || yDist <= h)
      return true

    return edges <= this.rSquared
  }
}





class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary
    this.capacity = n
    this.points = []
    this.divided = false
  }

  subdivide() {
    let x = this.boundary.x
    let y = this.boundary.y
    let w = this.boundary.w
    let h = this.boundary.h
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2)
    this.ne = new QuadTree(ne, this.capacity)
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2)
    this.nw = new QuadTree(nw, this.capacity)
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2)
    this.se = new QuadTree(se, this.capacity)
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2)
    this.sw = new QuadTree(sw, this.capacity)
    this.divided = true
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false
    }
    if (this.points.length < this.capacity) {
      this.points.push(point)
      return true
    } else {
      if (!this.divided) {
        this.subdivide()
      }
      if (this.ne.insert(point)) {
        return true
      } else if (this.nw.insert(point)) {
        return true
      } else if (this.se.insert(point)) {
        return true
      } else if (this.sw.insert(point)) {
        return true
      }
    }
  }

  query(range, found) {
    if (!found) {
      found = []
    }
    if (!this.boundary.intersects(range)) {
      return
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p)
        }
      }
      if (this.divided) {
        this.nw.query(range, found)
        this.ne.query(range, found)
        this.sw.query(range, found)
        this.se.query(range, found)
      }
    }
    return found
  }

  show() {
    rectMode(CENTER)
    noFill()
    strokeWeight(1)
    stroke(255)
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2)
    if (this.divided) {
      this.ne.show()
      this.nw.show()
      this.se.show()
      this.sw.show()
    }
    for (let p of this.points) {
      strokeWeight(2)
      point(p.x, p.y)
    }
  }

}
