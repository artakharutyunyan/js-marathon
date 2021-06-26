const startBtn = document.querySelector("#start");

const screens = document.querySelectorAll(".screen");

const timeList = document.querySelector("#time-list");

const timeEl = document.querySelector("#time");

const board = document.querySelector("#board");

let time = 0;
let score = 0;

const colors = [
  "#DFFF00",
  "#FFBF00",
  "#FF7F50",
  "#DE3163",
  "#9FE2BF",
  "#40E0D0",
  "#6495ED",
  "#CD5C5C",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFFFF",
  "#FFFF00",
  "#008000",
  "#00FFFF",
  "#FF00FF",
  "#800080",
];

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Score: <span class='primary'> ${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");

  const size = getRandomNumber(10, 60);

  const { width, height } = board.getBoundingClientRect();

  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor(colors);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = color;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

//hacking game

// function winTheGame() {
//   function kill() {
//     const circle = document.querySelector(".circle");
//     if (circle) {
//       circle.click();
//     }
//   }
//   setInterval(kill, 75);
// }
