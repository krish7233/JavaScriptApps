const err = document.querySelector(".err");
const form = document.querySelector("#form");
const input = document.querySelector(".input");
const todos = document.querySelector(".todos");
const clearBtn = document.querySelector(".btn-clear");
const images = ["check", "update", "cross"];

/*adding event listener to form*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = e.target[0].value;
  if (!val) {
    const span = document.createElement("span");
    span.innerText = "You Cant Add Empty Todo.";
    err.append(span);
    err.style.display = "block";
    setTimeout(() => {
      err.innerHTML = "";
      err.style.display = "none";
    }, 3000);
  } else {
    const todo = getTodo(val);
    todos.appendChild(todo);
    e.target[0].value = "";
  }

  // console.log(document.querySelectorAll(".todo-btns"));
});

/*adding event listener to clear button*/
clearBtn.addEventListener("click", (e) => {
  if (!todos.firstElementChild) {
    const span = document.createElement("span");
    span.innerText = "Your List is Empty.";
    err.append(span);
    err.style.display = "block";
    setTimeout(() => {
      err.innerHTML = "";
      err.style.display = "none";
    }, 3000);
  } else {
    todos.innerHTML = "";
  }
});

/*creating todo*/
const getTodo = function (val) {
  const todo = document.createElement("div");
  todo.className = "todo";
  const todoText = document.createElement("div");
  todoText.className = "todo-text";
  todoText.innerHTML = `<h4>${val}</h4>`;
  todo.appendChild(todoText);
  /*todo-btns*/
  const btns = document.createElement("div");
  btns.className = "todo-btns";
  const ul = document.createElement("ul");
  /*traversing through icon images*/
  images.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = `./icons/${item}.svg`;
    img.setAttribute("alt", `${item}-image`);
    /*adding event listener to icon buttons*/
    img.addEventListener("click", (e) => {
      /*getting todo node*/
      const node =
        e.target.parentNode.parentNode.parentNode.previousElementSibling
          .firstElementChild;
      /*checking which button is this*/
      if (item == "check") {
        node.firstElementChild
          ? (node.innerHTML = node.firstElementChild.innerText)
          : (node.innerHTML = node.innerText.strike());
      } else if (item == "update") {
        const nodeText = node.innerText;
        input.value = nodeText;
      } else {
        todos.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
      }
    });
    li.appendChild(img);
    ul.appendChild(li);
  });

  btns.appendChild(ul);
  todo.appendChild(btns);
  return todo;
};
