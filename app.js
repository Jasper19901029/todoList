/* 
<input type="text" class="todo" required />
<input type="number" class="day" min="1" max="31" required />
<input type="number" class="month" min="1" max="12" required />
<button class="btn">+</button> 
*/

const getTodo = document.querySelector(".todo");
const getDay = document.querySelector(".day");
const getMonth = document.querySelector(".month");
const getBtn = document.querySelector(".btn");
const section = document.querySelector("section");

// create new todoList
getBtn.addEventListener("click", () => {
  if (getTodo.value == "" || getDay.value == "" || getMonth.value == "") {
    return alert("請輸入內容");
  }
  // 判斷日期與月份是否符合
  if (getDay.value < 1 || getDay.value > 31) {
    return alert("日期只能輸入1~31");
  }
  // if (monthList < 1 || monthList > 12) {
  //   return alert("月份只能輸入1~12");
  // } else if (dayList > 29 && monthList == 2) {
  //   return alert("2月份只能輸入1~29");
  // }
  switch (parseInt(getMonth.value)) {
    case 2:
      if (getDay.value > 29) {
        return alert("2月份只能輸入1~29");
      }
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      if (getDay.value > 30) {
        return alert(`${getMonth.value}月只有30天喔`);
      }
      break;
  }

  // 創建div 並把input的值放進去
  let todo = document.createElement("div");
  todo.classList =
    "todoList d-flex align-items-start justify-content-center container mt-5";
  let todoText = document.createElement("p");
  todoText.innerText = getTodo.value;
  todoText.classList = "text-center h3";
  let date = document.createElement("p");
  date.classList = "ps-5 h3";
  date.innerText = getMonth.value + "/" + getDay.value;
  todo.appendChild(todoText);
  todo.appendChild(date);
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "-";
  deleteBtn.classList = "delete bg-transparent h3 border-0 ps-5";
  todo.appendChild(deleteBtn);

  // delete todoList and localStorage data
  deleteBtn.addEventListener("click", () => {
    let checkText = JSON.parse(localStorage.getItem("list"));
    checkText.forEach((item, index) => {
      if (todoText.innerText == todo) {
        checkText.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(checkText));
      }
    });
    todo.remove();
  });

  // create an object
  let myTodo = {
    todo: getTodo.value,
    month: getMonth.value,
    day: getDay.value,
  };

  // store data into an array of object
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }
  console.log(localStorage.getItem("list"));
  //add todo in section
  section.appendChild(todo);
  // clearn the input
  getTodo.value = "";
  getDay.value = "";
  getMonth.value = "";
});

loadData();

// loadData on localStorage
function loadData() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let myTodoArray = JSON.parse(myList);
    myTodoArray.forEach((item) => {
      //create a todo
      // 創建div 並把input的值放進去
      let todo = document.createElement("div");
      todo.classList =
        "todoList d-flex align-items-start justify-content-center container mt-5";
      let todoText = document.createElement("p");
      todoText.innerText = item.todo;
      todoText.classList = "text-center h3";
      let date = document.createElement("p");
      date.classList = "ps-5 h3";
      date.innerText = item.month + "/" + item.day;
      todo.appendChild(todoText);
      todo.appendChild(date);
      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "-";
      deleteBtn.classList = "delete bg-transparent h3 border-0 ps-5";
      todo.appendChild(deleteBtn);

      // delete todoList and localStorage data
      deleteBtn.addEventListener("click", () => {
        let checkText = JSON.parse(localStorage.getItem("list"));
        checkText.forEach((item, index) => {
          if (todoText.innerText == item.todo) {
            checkText.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(checkText));
          }
        });
        todo.remove();
      });
      //add todo in section
      section.appendChild(todo);
    });
  }
}
