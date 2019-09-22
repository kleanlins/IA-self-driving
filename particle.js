// Cleanderson Lins
// Neuro-Evolutional Steering

class Particle {
    constructor(brain) {
        this.fitness = 0
        this.dead = false
        this.finished = false
        this.pos = createVector(start.x, start.y)
        this.vel = createVector()
        this.acc = createVector()
        this.rays = []
        this.sight = 90
        this.maxSpeed = 3
        for (let a = 0; a < 360; a += 45) {
            this.rays.push(new Ray(this.pos, radians(a)))
        }
        if (brain) {
            this.brain = brain.copy()
        } else {
            this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1)
        }
    }

    applyForce(force) {
        this.acc.add(force)
    }

    update() {
        if (!this.dead && !this.finished) {
            this.pos.add(this.vel)
            this.vel.limit(this.maxSpeed)
            this.vel.add(this.acc)
            this.acc.set(0, 0)
        }
    }

    mutate() {
        this.brain.mutate(MUTATION_RATE)
    }

    dispose() {
        this.brain.dispose()
    }

    check(target) {
        const d = p5.Vector.dist(this.pos, target)
        if (d < 10) {
            this.finished = true
        }
    }

    calculateFitness(target) {
        if (this.finished) {
            this.fitness = 1
        } else {
            const d = p5.Vector.dist(this.pos, target)
            this.fitness = constrain(1 / d, 0, 1)
        }
    }

    look(walls) {
        const inputs = []
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i]
            let closest = null
            let record = this.sight
            for (let wall of walls) {
                const pt = ray.cast(wall)
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt)
                    if (d < record && d < this.sight) {
                        record = d
                        closest = pt
                    }
                }
            }

            if (record < 2) {
                this.dead = true
            }

            inputs[i] = map(record, 0, 50, 1, 0)

            if (closest) {
                stroke(255, 255, 255, 100)
                line(this.pos.x, this.pos.y, closest.x, closest.y)
            }
        }

        const output = this.brain.predict(inputs)
        const angle = map(output[0], 0, 1, 0, TWO_PI)
        const steering = p5.Vector.fromAngle(angle)
        steering.setMag(this.maxSpeed)
        steering.sub(this.vel)
        this.applyForce(steering)
    }


    show() {
        fill(255, 100)
        ellipse(this.pos.x, this.pos.y, 5)
        for (let ray of this.rays) {
            // ray.show()
        }
    }
}