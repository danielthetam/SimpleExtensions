// Local Storage - state, start_time, counter (in seconds, accurate to miliseconds)
// Two states - "running"(when the timer is still running) and "rest"(when the timer is on pause)

toggler = document.getElementById("toggler")
time = document.getElementById("time")
reset = document.getElementById("reset")

// Formats a number of seconds into a HH:MM:SS format
function formatSeconds(seconds) {
    seconds = Math.floor(seconds)
    var hours = Math.floor(seconds/3600)
    seconds = seconds - (hours * 3600)
    var minutes = Math.floor(seconds/60)
    seconds = seconds - (minutes * 60)

    if (seconds < 10) {
        seconds = '0' + seconds.toString()
    }
    if (minutes < 10) {
        minutes = '0' + minutes.toString()
    }
    if (hours < 10) {
        hours = '0' + hours.toString()
    }
    return hours + ":" + minutes + ":" + seconds
}

// Handles changes in state when pressing the START/PAUSE button
toggler.onclick = () => {
    if (localStorage.getItem("state") == "rest") {
        if (localStorage.getItem("counter") == undefined) {
            localStorage.setItem("counter", 0)
        }
        localStorage.setItem("state", "running")

        let now = new Date().getTime()
        localStorage.setItem("start_time", now)
    }
    else {
        localStorage.setItem("state", "rest")
    }
}

reset.onclick = () => {
    time.innerHTML = formatSeconds(0);
    localStorage.setItem("state", "rest")
    localStorage.setItem("counter", 0)
}

function update() {
    if (localStorage.getItem("state") == "running") {
        let now = new Date().getTime()
        var start_time = localStorage.getItem("start_time");
        if (now - start_time >= 1000) {
            localStorage.setItem("counter", parseFloat(localStorage.getItem("counter")) + ((now - start_time) / 1000))
            time.innerHTML = formatSeconds(parseFloat(localStorage.getItem("counter")))

            localStorage.setItem("start_time", now)
        }
    }
    if (localStorage.getItem("state") == "rest") {
        toggler.innerHTML = "START";
        time.innerHTML = formatSeconds(parseInt(localStorage.getItem("counter")))
    }
    else {
        toggler.innerHTML = "PAUSE";
    }
    window.requestAnimationFrame(update)
}

window.onload = update