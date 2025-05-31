/* alert("test") */

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let arrToDoItems = getToDoItems();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addToDo();
});

function addToDo(){
    const todoText = todoInput.value.trim();
    if (todoText.length > 0)
    {
        const todoObject = {
            text: todoText,
            completed: false
        }
        
        arrToDoItems.push(todoObject);
        updateTodoList();
        saveToDoItems();

        todoInput.value = "";
    }
}


function updateTodoList(){
    todoListUL.innerHTML = "";
    arrToDoItems.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}


function createTodoItem(todoObject, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");

    const todoText = todoObject.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
                <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <!--ikonka z fonts.google.com/icons-->
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>                

                <label class="todo-text" for="${todoId}">
                    ${todoText}
                </label>

                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>

    `

    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{deleteTodoItem(todoIndex);})

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        arrToDoItems[todoIndex].completed = checkbox.checked;
        saveToDoItems();
    })
    checkbox.checked = todoObject.completed;

    return todoLI;
}


function deleteTodoItem(todoIndex){
    arrToDoItems = arrToDoItems.filter((_, i)=> i !== todoIndex);
    saveToDoItems();
    updateTodoList();
}

function saveToDoItems(){
    const todosJson = JSON.stringify(arrToDoItems);
    localStorage.setItem("todos", todosJson);
}

function getToDoItems(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);    
}

