document.addEventListener("DOMContentLoaded", () => {
  const toDOInp = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-task-btn");
  const toDOLi = document.getElementById("todo-list");

//   let localtask = localStorage.getItem("tasks");
//   console.log(localtask);
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  

  tasks.forEach((task) => rendertask(task));

  addBtn.addEventListener("click", () => {
    const tasktext = toDOInp.value.trim();
    if (tasktext == "") return;

    const newtask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };
    tasks.push(newtask);
    saveTasks();
    rendertask(newtask);
    (toDOInp.value = ""), //clear input and its field
      console.log(tasks);
  });

  function rendertask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id);
    if (task.completed) li.classList.add("completed")
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;

    li.addEventListener('click',(e) => {
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks()
    });

    li.querySelector('button').addEventListener('click',(e) => {
        e.stopPropagation()   //prevent toggle from firing
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
    })

    toDOLi.append(li)
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
