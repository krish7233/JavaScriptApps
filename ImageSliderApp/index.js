const container = document.querySelector(".container");
const btns = document.querySelectorAll(".container button");
let i = 0;
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.classList[0] == "prev-btn") i--;
    else i++;

    if (i > 5) i = 0;
    else if (i < 0) i = 5;

    container.style.backgroundImage = `url('images/img-${i}.jpeg')`;
  });
});
