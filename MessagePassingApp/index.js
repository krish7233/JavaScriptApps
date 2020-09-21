const myform = document.getElementById("form");
const myinput = document.getElementById("message-input");
const showMessage = document.querySelector(".show-message span");
const error = document.querySelector(".err");

myform.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = myinput.value;
  if (msg) {
    showMessage.textContent = msg;
    myinput.value = "";
  } else {
    error.style.display = "block";
    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
  }
});
