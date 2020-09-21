const colors = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const btn = document.querySelector(".btn");
const span = document.querySelector(".hexText h1 span");

const generateRandomColor = function () {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += colors[parseInt(Math.random() * colors.length)];
  }

  return color;
};

let randomColor = "#FFFF24";
document.body.style.backgroundColor = randomColor;
span.textContent = randomColor;
btn.addEventListener("click", (e) => {
  const randomColor = generateRandomColor();
  span.textContent = randomColor;
  document.body.style.backgroundColor = randomColor;
});
