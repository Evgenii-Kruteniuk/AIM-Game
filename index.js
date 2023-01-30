const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

const colors = [
  "linear-gradient(70deg, #00f2ff 0%, #ff0303 47%, #051ead 100%)",
  "linear-gradient(270deg, #0c04f9 0%, #03ff07 47%, #ed02f5 100%)",
  "linear-gradient(130deg, #7c7c82 0%, #38f803 47%, #0000ff 100%)",
  "linear-gradient(90deg, #ccff00 0%, #73ff00 47%, #097809 100%)",
  "linear-gradient(90deg, #fb0202 0%, #f77d02 50%, #800000 100%)",
  "linear-gradient(90deg, #6dfa02 0%, #040cf5 47%, #ff0000 100%)",
  "linear-gradient(20deg, #ffff00 0%, #f0ad03 47%, #df3eaf 100%)",
  "linear-gradient(90deg, #fd0303 0%, #d3f300 47%, #4ff602 100%)",
  "linear-gradient(90deg, #e9e107 0%, #f69c00 47%, #905b0c 100%)",
  "linear-gradient(90deg, #fa02d4 0%, #0420f4 47%, #1cf304 100%)",
  "linear-gradient(140deg, #ff1493 0%, #10f504 47%, #f90185 100%)",
  "linear-gradient(180deg, #ffffff 0%, #020afa 47%, #ff0202 100%)",
];

let time = 0;
let score = 0;

/*Создаем событие для клика в 1-м экране*/
startBtn.addEventListener("click", (event) => {
  /*Отменяем # в адресной строке*/
  event.preventDefault();
  screens[0].classList.add("up");
});

/*На timeList вешаем обработчик событий.Используем делигирование
событий. Если event.target-тот элемент по которому мы кликнули
contains-проверит есть ли у элемента определенный класс*/
timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    /*Получаем значение нужного нам атрибута data-time. 
    Полученное значение-строка,переведем ее в число с помощью
    parseInt*/
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

/*ф-я при клике на шар, увеличивается счет и пропадает 
прежний шар.createRandomCircle()- снова появляется шар в другом месте */
board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
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
    /*Если время меньше 10 сек, то для красобы добавляем 0*/
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  /*В конце игры удаляем parentNode-родителя элемента time с помощью remove()
  или прячем его с помощью classList.add("hide")*/
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span>${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");

  const size = getRandomNumber(10, 60);
  /*С помощью ф-и getBoundingClientRect мы получаем размеры 
  доски. Делаем ее деструктуриз, чтобы получить размеры 
  width и height*/
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  setColor(circle);

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/*ф-я выбирает цвета из массива под определ индексом*/
function setColor(circle) {
  const color = getRandomColor();
  circle.style.background = color;
}

/*ф-я генерирует наши цвета кружков согласно массиву цветов */
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
