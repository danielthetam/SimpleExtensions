inc = document.getElementById("increase")
dec = document.getElementById("decrease")
reset = document.getElementById("reset")
counter = document.getElementById("counter")

counter.innerHTML = localStorage.getItem("counter");

inc.onclick = () => {
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
    localStorage.setItem("counter", counter.innerHTML)
}

dec.onclick = () => {
    counter.innerHTML = parseInt(counter.innerHTML) - 1;
    localStorage.setItem("counter", counter.innerHTML)
}

reset.onclick = () => {
    counter.innerHTML = 0;
    localStorage.setItem("counter", counter.innerHTML)
}