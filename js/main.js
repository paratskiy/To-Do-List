'use strict';

const addTodoList = document.querySelector('#add-todo-list');
const addTaskBtn = document.querySelector('#add-task');

const parentNode = document.querySelector('.todo-wrap');

class TodoList {

    constructor(parent) {

        this.parent = parent;

    }

    createTodoList() {

        let x = prompt('Введите название листа');

        const logoTodoList = this.createElement('i', { class: 'far fa-calendar-alt calendar' });
        const titleTodoList = this.createElement('input', { type: 'text', name: 'title', id: 'title', value: x });
        const editTodoList = this.createElement('i', { class: 'fas fa-pen edit' });
        const deleteTodoList = this.createElement('i', { class: 'far fa-trash-alt delete' });
        const todoListHeader = this.createElement('form', {
            id: 'todo-list-header',
            onsubmit: 'return false'
        }, logoTodoList, titleTodoList, editTodoList, deleteTodoList);

        const logoAddTodoItem = this.createElement('i', { class: 'fas fa-plus' });
        const inputAddTodoItem = this.createElement('input', {
            type: 'text',
            name: 'add-todo-item',
            id: 'add-todo-item',
            placeholder: 'Start typing here to create a task...'
        });
        const addTodoItemBtn = this.createElement('button', { id: 'add-todo-item', type: 'button' }, 'Add Task');
        const createTodoItem = this.createElement('form', {
            id: 'create-todo-item',
            onsubmit: 'return false'
        }, logoAddTodoItem, inputAddTodoItem, addTodoItemBtn);

        const todoList = this.createElement('ul', { class: 'todo-list' });

        const todoListWrap = this.createElement('div', {class: 'todo-list-wrap'}, todoListHeader, createTodoItem, todoList);

        this.parent.appendChild(todoListWrap);
        
        addTodoItemBtn.addEventListener('click', () => {

            this.addTodoItem(todoList, inputAddTodoItem.value);

        });

        deleteTodoList.addEventListener('click', () => {
            this.deleteElement(todoListWrap);
        });

    }

    addTodoItem(parent, value) {

        const doneItem = this.createElement('input', { type: 'checkbox', name: 'done', class: 'done' });
        const itemTitle = this.createElement('input', { type: 'text', name: 'item-title', class: 'item-title', value: value });
        const moveItemBtn = this.createElement('i', { class: 'fas fa-arrows-alt-v move' });
        const editItemBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        const deleteItemBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });
        const item = this.createElement('li', { class: 'todo-item' }, doneItem, itemTitle, moveItemBtn, editItemBtn, deleteItemBtn);

        parent.appendChild(item);

        

        console.log(value);
    }

    deleteElement(el) {
        this.parent.removeChild(el);
    }

    editTodoList() {
        
    }



    createElement(tag, attributes, ...children) {

        const element = document.createElement(tag);

        for (const key in attributes) {

            if (attributes.hasOwnProperty(key)) {

                const props = attributes[key];

                element.setAttribute(key, props);

            }

        }

        if (children.length > 0) {

            children.forEach(function (child) {

                if (typeof child === 'string') {

                    child = document.createTextNode(child);

                }

                element.appendChild(child);

            });

        }

        return element;

    }

}

let todoList = new TodoList(parentNode);

addTodoList.addEventListener('click', function () {

    console.log('add');

    todoList.createTodoList();

})



