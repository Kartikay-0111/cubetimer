var running = false
var isReset = true
const timerEL = document.getElementById("timer")
timerEL.style.color = "green"
var array =[]
class Timer {
    constructor(timerEl) {
        this.timer = timerEl
    }

    startTimer() {
        this.startTime = new Date().getTime()
        this.intervalId = setInterval(() => {
            this.updateTimerDisplay()
        }, 10)
    }

    endTimer() {
        clearInterval(this.intervalId)
    }

    calculateElapsedTime() {
        var currentTime = new Date().getTime();
        var elapsedTime = (currentTime - this.startTime) / 1000;
        if (elapsedTime > 60) {
            var min = parseInt(elapsedTime / 60);
            elapsedTime = elapsedTime - min * 60;
            var elapsedTimeup = min + ":" + (elapsedTime).toFixed(2);
            return elapsedTimeup;
        }
        else {
            return elapsedTime.toFixed(2);
        }
    }
    updateTimerDisplay() {
        this.timer.textContent = this.calculateElapsedTime()
    }
}

const timer = new Timer(timerEL)
var solves = document.getElementsByClassName("solves")[0]
var arr = [];
var numofsolves = document.getElementById("nos")
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !running) {
        if (isReset) {
            timer.startTimer()
            timerEL.style.color = "white"
            running = true
            isReset = false
            erase()
        } else {
            isReset = true
            timerEL.textContent = "0.00"
            timerEL.style.color = "green"
            scrambling()
        }
    } else if (event.code === 'Space' && running) {
        timer.endTimer()
        timerEL.style.color ="red"
        running = false
        arr.push(timerEL.innerText)
        solves.innerText = arr.join("\r\n")
        nos.innerText = arr.length
    }

});
const containerEl = document.getElementById("super-container")
containerEl.addEventListener('click', function () {
    if (!running) {
        if (isReset) {
            timer.startTimer()
            timerEL.style.color = "white"
            running = true
            isReset = false
            erase()
        } else {
            isReset = true
            timerEL.textContent = "0.00"
            timerEL.style.color = "green"
            scrambling()
        }
    } 
    else {
        timer.endTimer()
        timerEL.style.color ="red"
        running = false
        arr.push(timerEL.innerText)
        solves.innerText = arr.join("\r\n")
        nos.innerText = arr.length
    }
});
var x = document.getElementsByClassName('scramble')[0]
const scramble1 = ["R", "R'", "D2", "F", "L", "B2", "D'", "F'", "L2", "F2"]
const scramble2 = ["F2", "B", "R2", "B'", "L'", "D", "D2", "M", "L", "D'"]
function scrambling() {
    x.innerText = ""
    for (let i = 0; i < scramble1.length; i++) {
        var check;
        check =
            x.innerText = x.innerText + " " + scramble1[parseInt(Math.random() * 10)]
    }
    for (let i = 0; i < scramble2.length; i++) {
        x.innerText = x.innerText + " " + scramble2[parseInt(Math.random() * 10)]
    }
}
function erase() {
    x.innerText = ""
}
function erasesolves() {
    while (arr.length > 0) {
        arr.pop();
    }
    solves.innerText = ""
    nos.innerText="0"
}
var button = document.querySelector(".clear")
button.addEventListener("click", function (event) {
    event.stopPropagation()
})


