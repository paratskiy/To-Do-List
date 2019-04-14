'use strict';

const addTodoList = document.querySelector('#add-todo-list');

const parentNode = document.querySelector('.wrapper');

const registrationForm = document.querySelector('.registration');;
const autchoForm = document.querySelector('.autho');;


addTodoList.addEventListener('click', function () {

    const todoList = new TodoList(parentNode);

    todoList.createTodoList();

});

document.addEventListener('DOMContentLoaded', function () {

    const todoList = new TodoList();
    
    todoList.loadTodoList()

});

registrationForm.addEventListener('submit', function (event) {
    registration();
    event.preventDefault();
    return false;
});

autchoForm.addEventListener('submit', function (event) {
    autho();
    event.preventDefault();
    console.log(event);
    return false;
});




function autho() {

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'server/autho.php', true);

    xhr.send('');

    xhr.onreadystatechange = () => {

        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {

            // const response = xhr.responseText;

        }

    }

}

function registration() {

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'server/registration.php', true);

    xhr.send('');

    xhr.onreadystatechange = () => {

        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {

            // const response = xhr.responseText;

        }

    }

}