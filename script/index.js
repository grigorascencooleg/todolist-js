'use strict'

const descTaskInput=document.querySelector('.todolist__input'),
      addTaskBtn=document.querySelector('.todolist__add-btn'),
      tasksWrapper=document.querySelector('.tasks-wrapper');

let tasks;
let todoItemElems=[];

!localStorage.tasks? tasks=[] :tasks=JSON.parse(localStorage.getItem('tasks'));

class Task{
    constructor(description){
        this.description=description;
        this.completed=false;
    }
}

const template=(task,index)=>{
    return `
    <div class="task__item ${task.completed?'checked':''}">
        <div class="task__title"><span>${task.description}</span></div>
        <div class="task__functions">
            <button class="task__delete" onclick="deleteTask(${index})" title="delete task">X</button>
            <input type="checkbox" class="task__completed" title="mark task completed" onclick="completeTask(${index})" ${task.completed?'checked':''}>
        </div>
    </div>
    `;
}

const filterTasks=()=>{
    const activeTasks=tasks.length && tasks.filter(task=>task.completed===false);
    const completedTask=tasks.length && tasks.filter(task=>task.completed===true);
    tasks=[...activeTasks,...completedTask];
}

const fillTodoList=()=>{
    tasksWrapper.innerHTML="";
    if(tasks.length!=0){
        filterTasks();
        tasks.forEach((item,index) => {
            tasksWrapper.innerHTML+=template(item,index);
        });
        todoItemElems=document.querySelectorAll('.task__item');
    }

}

const updateLocalStorage=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const completeTask=index=>{
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todoItemElems[index].classList.add('checked');
    }
    else{
        todoItemElems[index].classList.remove('checked');
    }
    updateLocalStorage();
    fillTodoList();
}

addTaskBtn.addEventListener('click',()=>{
    tasks.push(new Task(descTaskInput.value));
    updateLocalStorage();
    fillTodoList();
    descTaskInput.value="";
})

const deleteTask=index=>{
    todoItemElems[index].classList.add('delete-anim');
    setTimeout(()=>{
        tasks.splice(index,1);
        updateLocalStorage();
        fillTodoList();
    },500)
}

fillTodoList();