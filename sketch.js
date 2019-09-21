// Cleanderson Lins
// Neuro-Evolutional Steering

let TOTAL = 100
let MUTATION_RATE = 0.1

let start, end

let walls = []
let population = []
let savedParticles = []

function setup() {
	createCanvas(800, 800)
	tf.setBackend('cpu')
	walls.push(new Boundary(50, 799, 150, 799))
	walls.push(new Boundary(50, 800, 50, 400))
	walls.push(new Boundary(50, 400, 300, 150))
	walls.push(new Boundary(300, 150, 800, 150))

	walls.push(new Boundary(799, 150, 799, 250))
	walls.push(new Boundary(150, 800, 150, 400))
	walls.push(new Boundary(150, 400, 300, 250))
	walls.push(new Boundary(300, 250, 800, 250))


	start = createVector(100, 700)
	end = createVector(700, 200)

	ray = new Ray(100, 200)

	for (let i = 0; i < TOTAL; i++) {
		population[i] = new Particle()
	}

}

function draw() {
	background(0)
	for (let wall of walls) {
		wall.show()
	}


	for (let particle of population) {
		particle.check(end)
		particle.update()
		particle.show()
		particle.look(walls)
	}

	for (let i = population.length - 1; i >= 0; i--) {
		const particle = population[i]
		if (particle.dead || particle.finished) {
			savedParticles.push(population.splice(i, 1)[0])
		}
	}

	if (population.length == 0) {
		nextGeneration()
	}

	// ray.show()
	// ray.lookAt(mouseX, mouseY)

	// let pt = ray.cast(wall)

	// if (pt){
	// 	fill(255)
	// 	ellipse(pt.x, pt.y, 8, 8)
	// }
	ellipse(start.x, start.y, 10)
	ellipse(end.x, end.y, 10)
}