class Particle{
    constructor(x, y){
        this.pos = createVector(x, y)
        this.rays = []
        this.vel = createVector()
        this.acc = createVector()
        this.maxSpeed = 3
        this.sight = 90
        for (let a = 0; a < 360; a += 45){
            this.rays.push(new Ray(this.pos, radians(a)))
        }
        this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1)
    }

    applyForce(force){
        this.acc.add(force)
    }

    update(x, y){
        this.pos.add(this.vel)
        this.vel.limit(this.maxSpeed)
        this.vel.add(this.acc)
        this.acc.set(0, 0)
    }

    look(walls){
        const inputs = []

        for(let i = 0; i < this.rays.length; i++) {
            let closest = null
            let record = this.sight
            for(let wall of walls){
                const pt = this.rays[i].cast(wall)
                if(pt){
                    const d = p5.Vector.dist(this.pos, pt)
                    if(d < record && d < this.sight){
                        record = d
                        closest = pt
                    }
                }
            }

            inputs[i] = map(record, 0, 50, 1, 0)

            if(closest){
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
        // console.log(output)
    }


    show(){
        fill(255, 100)
        ellipse(this.pos.x, this.pos.y, 5)
        for(let ray of this.rays){
            // ray.show()
        }
    }
}