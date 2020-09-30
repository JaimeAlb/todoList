// Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const eraseButton = document.querySelector('.erase-button');
const todoContainer = document.querySelector('.todo-container');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners

todoButton.addEventListener('click', addTodo);
eraseButton.addEventListener('click', eraseTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APEND TO LIST
    todoList.appendChild(todoDiv);
    //CLEAR Todo INPUT VALUE
    todoInput.value = "";
}
function eraseTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    //crear boton
    const botonManito = document.createElement('button');
    botonManito.innerHTML = '<i class="far fa-thumbs-up"></i>';
    botonManito.classList.add("boton-manito");

    todoContainer.appendChild(botonManito);
    
}
function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Aniimation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        // todo.remove();
    }
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);
    console.log(todos[0].classList.value);
    todos.forEach(function(asd){
        switch(e.target.value){
            case "all":
                asd.style.display = 'flex';
                break;
            case "completed":
                if(asd.classList.contains('completed')){
                    asd.style.display = 'flex';                    
                }else{
                    asd.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!asd.classList.contains('completed')){
                    asd.style.display = 'flex';
                }else{
                    asd.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    console.log(todoInput.value)
    // CHECK hey Do I already have something in there?
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}