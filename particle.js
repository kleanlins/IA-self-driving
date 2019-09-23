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
        this.sight = 120
        this.maxSpeed = 3
        this.maxForce = 0.1
        this.index = 0
        this.counter
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
            this.counter++
            if (this.counter > LIFESPAN) {
                this.dead = true
            }
        }
    }

    check(checkpoints) {
        if (!this.finished) {
            const goal = checkpoints[this.index].midpoint()
            const d = p5.Vector.dist(this.pos, goal)
            if (d < 50) {
                this.counter = 0
                this.index++
                if (this.index == checkpoints.length - 1) {
                    this.finished = true
                }
            }
        }
    }

    calculateFitness() {
        this.fitness = pow(2, this.index)
        // if (this.finished) {
        // } else {
        //     const d = p5.Vector.dist(this.pos, target)
        //     this.fitness = constrain(1 / d, 0, 1)
        // }
    }

    mutate() {
        this.brain.mutate(MUTATION_RATE)
    }

    dispose() {
        this.brain.dispose()
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
                // stroke(255, 255, 255, 100)
                // line(this.pos.x, this.pos.y, closest.x, closest.y)
            }
        }

        const output = this.brain.predict(inputs)
        const angle = map(output[0], 0, 1, 0, TWO_PI)
        const steering = p5.Vector.fromAngle(angle)
        steering.setMag(this.maxSpeed)
        steering.sub(this.vel)
        // steering.limit(this.maxForce)
        this.applyForce(steering)
    }

    bounds() {
        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
            this.dead = true
        }
    }

    show() {
        push()
        translate(this.pos.x, this.pos.y, )
        const heading = this.vel.heading()
        rotate(heading)
        fill(255, 100)
        rectMode(CENTER)
        rect(0, 0, 10, 5)
        pop()
    }
}