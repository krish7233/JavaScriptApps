const btns = document.querySelectorAll(".btn");
const store = document.querySelector(".store");
const img = [
  "cake-1",
  "cake-2",
  "cake-3",
  "cake-4",
  "cupcake-1",
  "cupcake-2",
  "cupcake-3",
  "doughnut-1",
  "doughnut-2",
  "doughnut-3",
  "sweets-1",
  "sweets-2",
  "sweets-3",
];

const addRow = function (type) {
  let btn = "btn-" + type;
  store.innerHTML = "";
  let imgList;
  if (type == "all") {
    imgList = [...img];
  } else {
    imgList = img.filter((item) => {
      return item.split("-")[0] == type;
    });
  }

  let len = imgList.length;
  let div = parseInt(len / 3);
  let rem = len % 3;
  let cntImg = 0;

  while (div > 0) {
    const row = createRow();
    for (let i = 0; i < 3; i++) {
      let column = createColumn();
      column.firstElementChild.src = `images/${imgList[cntImg++]}.jpeg`;
      row.appendChild(column);
    }
    store.appendChild(row);
    --div;
  }

  if (rem > 0) {
    const row = createRow();
    for (let i = 0; i < rem; i++) {
      let column = createColumn();
      column.firstElementChild.src = `images/${imgList[cntImg++]}.jpeg`;
      row.appendChild(column);
    }
    store.appendChild(row);
  }
};

const createColumn = function () {
  const column = document.createElement("div");
  const img = document.createElement("img");
  img.src = "";
  img.setAttribute("alt", "image");
  column.className = "column";
  column.appendChild(img);
  return column;
};

const createRow = function () {
  const row = document.createElement("div");
  row.className = "row";

  return row;
};

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let btnType = e.target.classList[1].split("-");
    if (btnType[1] == "all") {
      addRow(btnType[1]);
    } else {
      addRow(btnType[1]);
    }
  });
});

addRow("all");
