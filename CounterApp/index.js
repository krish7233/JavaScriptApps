const countText = document.querySelector(".count-text p");
const btns = document.querySelectorAll(".btn");

let count = 0;

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnType = e.target;
    if (btnType.classList[1] == "btn-lower") {
      count--;
      countText.textContent = count;
    } else {
      count++;
      countText.textContent = count;
    }
  });
});
