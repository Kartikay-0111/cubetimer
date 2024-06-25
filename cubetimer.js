var running = false;
var isReset = true;
const timerEL = document.getElementById("timer");
var best = document.getElementById("bestsolve");
var avg = document.getElementById("avg");
timerEL.style.color = "green";
array = [];
var arr = [];
class Timer {
    constructor(timerEl) {
        this.timer = timerEl;
    }

    startTimer() {
        this.startTime = new Date().getTime();
        this.intervalId = setInterval(() => {
            this.updateTimerDisplay();
        }, 10);
    }

    endTimer() {
        clearInterval(this.intervalId);
    }

    calculateElapsedTime() {
        var currentTime = new Date().getTime();
        var elapsedTime = (currentTime - this.startTime) / 1000;
        if (elapsedTime > 60) {
            var min = parseInt(elapsedTime / 60);
            elapsedTime = elapsedTime - min * 60;
            var elapsedTimeup = min + ":" + (elapsedTime).toFixed(2);
            return elapsedTimeup;
        } else {
            return elapsedTime.toFixed(2);
        }
    }

    updateTimerDisplay() {
        this.timer.textContent = this.calculateElapsedTime();
    }
}

const timer = new Timer(timerEL);
var solves = document.getElementsByClassName("solves")[0];
var numofsolves = document.getElementById("nos");
var res;

// Load times and stats from localStorage on page load
window.onload = function() {
    if (localStorage.getItem("solves")) {
        arr = JSON.parse(localStorage.getItem("solves"));
        array = JSON.parse(localStorage.getItem("times"));
        best.innerText = localStorage.getItem("best");
        avg.innerText = localStorage.getItem("average");
        solves.innerText = arr.join("\r\n");
        numofsolves.innerText = arr.length;
    }
};

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !running) {
        if (isReset) {
            timer.startTimer();
            timerEL.style.color = "white";
            running = true;
            isReset = false;
            erase();
        } else {
            isReset = true;
            timerEL.textContent = "0.00";
            timerEL.style.color = "green";
            scrambling();
        }
    } else if (event.code === 'Space' && running) {
        stopAndSaveTimer();
    }
});

const containerEl = document.getElementById("super-container");
containerEl.addEventListener('click', function() {
    if (!running) {
        if (isReset) {
            timer.startTimer();
            timerEL.style.color = "white";
            running = true;
            isReset = false;
            erase();
        } else {
            isReset = true;
            timerEL.textContent = "0.00";
            timerEL.style.color = "green";
            scrambling();
        }
    } else {
        stopAndSaveTimer();
    }
});

function stopAndSaveTimer() {
    timer.endTimer();
    timerEL.style.color = "red";
    running = false;
    arr.push(timerEL.innerText);
    var element = arr.at(arr.length - 1);

    for (var i = element.length - 1; i >= 0; i--) {
        if (element.at(i) == ":") {
            var fpart = element.substring(0, i);
            var spart = element.substring(i + 1, element.length);
            var substr1 = parseFloat(fpart) * 60;
            var substr2 = parseFloat(spart);
            res = substr1 + substr2;
            break;
        } else {
            res = parseFloat(element);
        }
    }
    array.push(res);
    solves.innerText = arr.join("\r\n");
    numofsolves.innerText = arr.length;
    avg.innerText = average(array);
    var smallest = Math.min(...array);
    if (smallest > 60) {
        var min = parseInt(smallest / 60);
        smallest = smallest - min * 60;
        var bestf = min + ":" + (smallest).toFixed(2);
        best.innerText = bestf;
    } else {
        best.innerText = Math.min(...array).toFixed(2);
    }
    saveTimesToLocalStorage();
}

var x = document.getElementsByClassName('scramble')[0];
const scramble1 = ["R", "R'", "D2", "F", "L", "B2", "D'", "F'", "L2", "F2"];
const scramble2 = ["F2", "B", "R2", "B'", "L'", "D", "D2", "M", "L", "D'"];

function scrambling() {
    x.innerText = "";
    for (let i = 0; i < scramble1.length; i++) {
        x.innerText = x.innerText + " " + scramble1[parseInt(Math.random() * 10)];
    }
    for (let i = 0; i < scramble2.length; i++) {
        x.innerText = x.innerText + " " + scramble2[parseInt(Math.random() * 10)];
    }
}

function erase() {
    x.innerText = "";
}

// Save the times and stats to localStorage
function saveTimesToLocalStorage() {
    localStorage.setItem("solves", JSON.stringify(arr));
    localStorage.setItem("times", JSON.stringify(array));
    localStorage.setItem("best", best.innerText);
    localStorage.setItem("average", avg.innerText);
}

function erasesolves() {
    while (arr.length > 0) {
        arr.pop();
    }
    while (array.length > 0) {
        array.pop();
    }
    solves.innerText = "";
    numofsolves.innerText = "0";
    timerEL.textContent = "0.00";
    timerEL.style.color = "green";
    avg.innerText = "00";
    best.innerText = "00";
    localStorage.clear();
}

var button = document.querySelector(".clear");
button.addEventListener("click", function(event) {
    event.stopPropagation();
    erasesolves();
});

var avg1;
function average(vector) {
    var sum = 0;
    vector.forEach(element => {
        sum += element;
    });
    avg1 = (sum / array.length);
    if (avg1 > 60) {
        var min = parseInt(avg1 / 60);
        avg1 = avg1 - min * 60;
        var avgf = min + ":" + (avg1).toFixed(2);
        return avgf;
    } else {
        return avg1.toFixed(2);
    }
}
