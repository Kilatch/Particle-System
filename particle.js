class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = p5.Vector.random2D()
    this.acc = p5.Vector.random2D()
    this.r = 1
    this.d = 0
  }

  show() {
    noStroke()
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.vel.limit(3)
  }

  closest(other) {
    this.d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
    return this.d
  }

  repell(mag) {
    let mouse = createVector(mouseX, mouseY)
    let d = dist(this.pos.x, this.pos.y, mouse.x, mouse.y)
    mouse.sub(this.pos)
    this.vel.normalize()
    mouse.setMag(mag)
    if (d < 100) {
      this.acc = mouse
    }
  }

  offScreen() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r
    }
  }
}
