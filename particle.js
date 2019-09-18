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
        for(let ray of this.rays) {
            let closest = null
            let record = Infinity
            for(let wall of walls){
                const pt = ray.cast(wall)
                if(pt){
                    const d = p5.Vector.dist(this.pos, pt)
                    if(d < record && d < this.sight){
                        record = d
                        closest = pt
                    }
                }
            }
            if(record < 2){
                console.log("hit wall")
            }

            if(closest){
                stroke(255, 255, 255, 100)
                line(this.pos.x, this.pos.y, closest.x, closest.y)
            }
        }
    }

    show(){
        fill(255)
        ellipse(this.pos.x, this.pos.y, 8)
        for(let ray of this.rays){
            // ray.show()
        }
    }
}