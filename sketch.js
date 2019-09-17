let ray 
let wall
let particle

function setup() {
	createCanvas(400, 400)
	wall = new Boundary(300, 100, 300, 300)
	ray = new Ray(100, 200)
	particle = new Particle()
}

function draw() {
	background(0)
	wall.show()
	particle.update(mouseX, mouseY)
	particle.show()
	particle.look(wall)
	// ray.show()
	// ray.lookAt(mouseX, mouseY)

	// let pt = ray.cast(wall)
	
	// if (pt){
	// 	fill(255)
	// 	ellipse(pt.x, pt.y, 8, 8)
	// }
}