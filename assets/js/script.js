var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name'").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //add task id as custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHtml = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild (taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild (taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  //increase task counter for next unique id
  taskIdCounter++;

};

varCreateTaskActions = function(taskID) {
actionContainerEl.className = "task-actions";

//Create edit button
var editButtonEl = document.createElement ("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute ("data-task-id", taskId);

actionContainerEl.appendChild (editButtonEl);

//Create Delete Button
var deleteButtonEl = document.createElement ("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute ("data-task-id", taskId);

actionContainerEl.appendChild (deleteButtonEl);

varStatusSelectEl = document.createElement ("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute ("name", "status-change");
statusSelectEl.setAttribute ("data-task-id", taskId);

actionContainerEl.appendChild (statusSelectEl);

var statusChoices = ["To Do", "In Progress", "Completed"];

for (var i = 0; i < statusChoices.length; i++) {
  //create option element
  var statusOptionEl  = document.createElement ("option");
  statusOptionEl.textContent  = statusChoices [i];
  statusOptionEl.setAttribute ("value", statusChoices [i]);

  //append to select
  actionContainerEl.appendChild (statusOptionEl);
}

return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function (event) {
  console.log (event.target);

  if  (event.target.matches ("delete-btn")) {
    //get the element's task's id
    var taskID = event.target.attribute ("data-task-id");
    deleteTask (taskId);
  }

}

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector (".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove ();
}
pageContentEl.addEventListener("click", taskButtonHandler);