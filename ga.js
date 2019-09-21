// Cleanderson Lins
// Neuro-Evolutional Steering

function nextGeneration() {
    console.log("Next generation.")
    calculateFitness(end)
    for (let i = 0; i < TOTAL; i++) {
        population[i] = pickOne()
    }
    for (let i = 0; i < TOTAL; i++) {
        savedParticles[i].dispose()

    }
    savedPaticles = []
}

function pickOne() {
    let index = 0
    let r = random(1)
    while (r > 0) {
        r = r - savedParticles[index].fitness
        index++
    }
    index--
    // TODO: implement copy Particle
    let particle = savedParticles[index]
    let child = new Particle(particle.brain)
    child.mutate()
    return child
}

function calculateFitness(target) {
    for (let particle of savedParticles) {
        particle.calculateFitness(target)
    }
    let sum = 0

    //Normalize all values
    for (let particle of savedParticles) {
        sum += particle.fitness
    }

    for (let particle of savedParticles) {
        particle.fitness = particle.fitness / sum
    }
}