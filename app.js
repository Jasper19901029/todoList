/* 
<input type="text" class="todo" required />
<input type="number" class="day" min="1" max="31" required />
<input type="number" class="month" min="1" max="12" required />
<button class="btn">+</button> 
*/

const todo = document.querySelector(".todo");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const btn = document.querySelector(".btn");
const section = document.querySelector("section");

// create new todoList
btn.addEventListener("click", () => {
  let todoList = todo.value;
  let dayList = parseInt(day.value);
  let monthList = parseInt(month.value);

  if (todo.value == "" || day.value == "" || month.value == "") {
    return alert("請輸入內容");
  }
  // 判斷日期與月份是否符合
  if (dayList < 1 || dayList > 31) {
    return alert("日期只能輸入1~31");
  }
  // if (monthList < 1 || monthList > 12) {
  //   return alert("月份只能輸入1~12");
  // } else if (dayList > 29 && monthList == 2) {
  //   return alert("2月份只能輸入1~29");
  // }
  switch (monthList) {
    case 2:
      if (dayList > 29) {
        return alert("2月份只能輸入1~29");
      }
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      if (dayList > 30) {
        return alert(`${monthList}月只有30天喔`);
      }
      break;
  }

  // 創建div 並把input的值放進去
  let todoLa = document.createElement("div");
  todoLa.classList =
    "todoList d-flex align-items-start justify-content-center container mt-5";
  let text = document.createElement("p");
  text.innerText = todoList;
  text.classList = "text-center h3";
  let date = document.createElement("p");
  date.classList = "ps-5 h3";
  date.innerText = monthList + "/" + dayList;
  todoLa.appendChild(text);
  todoLa.appendChild(date);
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "-";
  deleteBtn.classList = "delete bg-transparent h3 border-0 ps-5";
  todoLa.appendChild(deleteBtn);

  // delete todoList and localStorage data
  deleteBtn.addEventListener("click", () => {
    let checkText = JSON.parse(localStorage.getItem("list"));
    checkText.forEach((item, index) => {
      if (text.innerText == todoList) {
        checkText.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(checkText));
      }
    });
    todoLa.remove();
  });

  // create an object
  let myTodo = {
    todoList: todoList,
    monthList: monthList,
    dayList: dayList,
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
  section.appendChild(todoLa);
  // clearn the input
  todo.value = "";
  day.value = "";
  month.value = "";
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
      let todoLa = document.createElement("div");
      todoLa.classList =
        "todoList d-flex align-items-start justify-content-center container mt-5";
      let text = document.createElement("p");
      text.innerText = item.todoList;
      text.classList = "text-center h3";
      let date = document.createElement("p");
      date.classList = "ps-5 h3";
      date.innerText = item.monthList + "/" + item.dayList;
      todoLa.appendChild(text);
      todoLa.appendChild(date);
      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "-";
      deleteBtn.classList = "delete bg-transparent h3 border-0 ps-5";
      todoLa.appendChild(deleteBtn);

      // delete todoList and localStorage data
      deleteBtn.addEventListener("click", () => {
        let checkText = JSON.parse(localStorage.getItem("list"));
        checkText.forEach((item, index) => {
          if (text.innerText == item.todoList) {
            checkText.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(checkText));
          }
        });
        todoLa.remove();
      });
      //add todo in section
      section.appendChild(todoLa);
    });
  }
}
