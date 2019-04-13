'use strict';

const addTodoList = document.querySelector('#add-todo-list');

const parentNode = document.querySelector('.wrapper');

// function loadTodoList() {

//     const xhr = new XMLHttpRequest();

//     xhr.open('POST', 'server/index.php', true);

//     xhr.send('load-todo-list');

//     xhr.onreadystatechange = () => {

//         if (xhr.readyState != 4) return;

//         if (xhr.status != 200) {
//             alert(xhr.status + ': ' + xhr.statusText);
//         } else {

//             const response = JSON.parse(xhr.responseText);
            
//             for (const key in response) {
//                 if (response.hasOwnProperty(key)) {
//                     const element = response[key];
//                     const todoList = new TodoList(parentNode, key, element);
//                     todoList.createTodoList();                
//                 }
//             }

//         }

//     }

// }

addTodoList.addEventListener('click', function () {

    const todoList = new TodoList(parentNode);

    todoList.createTodoList();

})

document.addEventListener('DOMContentLoaded', function () {

    const todoList = new TodoList();
    
    todoList.loadTodoList()

})

window.onbeforeunload = function () {

}


