let toDoList = [" Clean your room", "Wash the Dishes" , " Fold the Laundry", " Call your parents" , "Apply for College"]


let addTaskButton = document.getElementById("addNewTaskButton");
let removeTaskButton = document.getElementById("removeTaskButton");
let listToBeEdited = document.getElementById("toDoList");
let newTask = document.getElementById("newTask");
let removeATask = document.getElementById("removeATask");
let errorBox = document.getElementById("errorBox");

window.addEventListener("load", displayList);
addTaskButton.addEventListener("click", addTask);
removeTaskButton.addEventListener("click", removeTask);

function displayList(){
  

  listToBeEdited.textContent = "";
   for (let i = 0; i < toDoList.length; i++) {
    let li = document.createElement("li");
    li.textContent = toDoList[i];
    listToBeEdited.appendChild(li);
    
  }
  errorBox.textContent = "";
}

function addTask(){

let taskName = newTask.value.trim();
  if(taskName === "")
  {
    errorBox.textContent = "";
    errorBox.textContent = "Name of tasks can't be blank";
    return;
  }
  toDoList.push(taskName);
  newTask.value = "";
  displayList();

}


function removeTask(){

 
  let taskToBeRemoved = removeATask.value.trim();
  let taskIndex = toDoList.indexOf(taskToBeRemoved);

  if(taskIndex === -1){
    errorBox.textContent = "";
    errorBox.textContent = "Name of task doesn't exist";
    return;
  }
  else if(taskToBeRemoved === " "){
    errorBox.textContent = "";
    errorBox.textContent = "Name of tasks can't be blank";
    return;
  }
  toDoList.splice(taskIndex,1);
  removeATask.value = "";
  displayList();


}