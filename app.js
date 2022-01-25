const BALLOONS_COUNT = 20;

const popBalloon = new Event("popBalloon")
const balloonCountElement = document.querySelector("#balloon-count")
const balloonsByColorElement = document.querySelector("#balloons-by-color")

const render = () => {
    const headerBalloons = Balloon.balloonColors.map(color => new Balloon().getHeaderBalloon(color))
    balloonsByColorElement.append(...headerBalloons)

    const balloons = [];

    for (let i = 0; i < BALLOONS_COUNT; i++) {
        balloons.push(new Balloon().getGameBalloon())
    }

    balloonCountElement.innerHTML = BALLOONS_COUNT
    document.querySelector("#balloon-map").append(...balloons)
    Balloon.setBallonHeaderCounter()
}

class Balloon {
    static balloonColors = [ 'purple', 'blue', 'springgreen', 'darkcyan' ]

    static setBallonHeaderCounter() {
        const activeBalloons = document.querySelectorAll(".balloon.active")
        
        activeBalloons.forEach(balloon => {
            const balloonColor = balloon.style.backgroundColor
            document.querySelector("#" + balloonColor + "-counter").innerHTML++
        })
    }

    constructor() {
        this.balloon = document.createElement("div")
    }

    getRandomColor() {
        const randomIndex = Math.floor(Math.random() * Balloon.balloonColors.length)

        return Balloon.balloonColors[randomIndex]
    }

    getHeaderBalloon(color) {
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
    event.currentTarget.className = "balloon popped"

    balloonCountElement.innerHTML--
    const activeBalloons = balloonCountElement.innerHTML
    
    if (activeBalloons == 0) {
        window.location.reload()
    }
}

window.onload = render();
