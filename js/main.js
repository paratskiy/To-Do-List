'use strict';

const addTodoList = document.querySelector('#add-todo-list');
const addTaskBtn = document.querySelector('#add-task');

const parentNode = document.querySelector('.todo-list-wrap');

let todoList = new TodoList(parentNode);

addTodoList.addEventListener('click', function () {

    console.log('add');

    todoList.createTodoList();

})



