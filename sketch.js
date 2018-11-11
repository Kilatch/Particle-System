let particles = []
let qtree
let j = 0
let attract = -1

function setup() {
  createCanvas(displayWidth - 10, displayHeight / 2 + 100)
  for (var i = 0; i < 150; i++) {
    particles[i] = new Particle(random(width), random(height))

  }
}



function draw() {
  colorMode(HSB, 100)
  background(0)

  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2)
  qtree = new QuadTree(boundary, 4)

  if (mouseIsPressed) {
    attract = 1
  } else {
    attract = -2
  }

  for (let p of particles) {
    let point = new Point(p.pos.x, p.pos.y, p)
    qtree.insert(point)

    //p.show()
    p.update()
    p.offScreen()
    p.repell(attract)
  }

  for (let p of particles) {
    let range = new Circle(p.pos.x, p.pos.y, p.r * 100)
    let points = qtree.query(range)
    for (let point of points) {
      let other = point.userData
      if (p !== other && p.closest(other) < 100) {
        stroke(0 + p.d, j, 255, 10)
        strokeWeight(2)
        line(p.pos.x, p.pos.y, other.pos.x, other.pos.y)
      }
    }
  }
  // for (let p of particles) {
  //   for (let other of particles) {
  //     if (p !== other && p.closest(other) < 100) {
  //       stroke(p.d % 256, p.d % j, 255, 20)
  //       strokeWeight(2)
  //       line(p.pos.x, p.pos.y, other.pos.x, other.pos.y)
  //     }
  //   }
  // }
  j++
}
