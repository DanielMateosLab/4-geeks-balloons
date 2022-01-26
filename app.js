const BALLOONS_COUNT = 20;
const popBalloon = new Event("popBalloon")

const totalBalloonsCountElement = document.querySelector("#balloon-count")
const balloonsByColorElement = document.querySelector("#balloons-by-color")

const render = () => {
    // Create and place header balloons
    const headerBalloons = Balloon.getAllHeaderBalloons()
    balloonsByColorElement.append(...headerBalloons)
    
    // Create and place game balloons
    const gameBalloons = Balloon.getNGameBalloons(BALLOONS_COUNT)
    document.querySelector("#balloon-map").append(...gameBalloons)

    
    // Set counters' value
    totalBalloonsCountElement.innerHTML = BALLOONS_COUNT
    Balloon.setBallonHeaderCounter()
}

class Balloon {
    static balloonColors = [ 'purple', 'cornflowerblue', 'springgreen', 'crimson' ]

    static getAllHeaderBalloons() {
        return Balloon.balloonColors.map(color => new Balloon().getOneHeaderBalloon(color))
    }

    static setBallonHeaderCounter() {
        const activeBalloons = document.querySelectorAll(".balloon.active")
        
        activeBalloons.forEach(balloon => {
            const balloonColor = balloon.style.backgroundColor
            document.querySelector("#" + balloonColor + "-counter").innerHTML++
        })
    }

    static getNGameBalloons(n) {
        const gameBalloons = []
        
        for (let i = 0; i < n; i++) {
            gameBalloons.push(new Balloon().getGameBalloon())
        }
    
        return gameBalloons
    }

    constructor() {
        this.balloon = document.createElement("div")
    }

    getRandomColor() {
        const randomIndex = Math.floor(Math.random() * Balloon.balloonColors.length)

        return Balloon.balloonColors[randomIndex]
    }

    getOneHeaderBalloon(color) {
        this.balloon.className = "balloon"
        this.balloon.style.background = color

        const containerElement = document.createElement("div")
        containerElement.className = "header-balloon-container"

        const countElement = document.createElement("h3")
        countElement.id = color + "-counter"
        countElement.innerText = 0

        containerElement.append(this.balloon)
        containerElement.append(countElement)

        return containerElement
    }

    getGameBalloon() {
        this.balloon.className = "balloon active"
        this.balloon.style.background = this.getRandomColor()
        this.balloon.addEventListener("popBalloon", poppedBalloon)
        this.balloon.addEventListener("click", function() {
            this.dispatchEvent(popBalloon)
        })

        return this.balloon
    }
}

function poppedBalloon(event) {
    const poppedBalloonElement = event.currentTarget
    const colorCounterElement = getCounterOfColor(poppedBalloonElement.style.backgroundColor)

    poppedBalloonElement.className = "balloon popped"
    totalBalloonsCountElement.innerHTML--
    colorCounterElement.innerHTML--

    const activeBalloons = totalBalloonsCountElement.innerHTML    
    if (activeBalloons == 0) {
        window.location.reload()
    }
}

function getCounterOfColor(color) {
    return document.querySelector("#" + color + "-counter")
}


window.onload = render();
