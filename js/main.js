'use strict';

const addTodoList = document.querySelector('#add-todo-list');
const addTaskBtn = document.querySelector('#add-task');

const parentNode = document.querySelector('.todo-list-wrap');

class TodoList {

    constructor(parent){

        this.parent = parent;

    }
   
    createTodoList(){

        let x = prompt('Введите название листа');

        const logoTodoList = this.createElement('i', {class: 'far fa-calendar-alt calendar'});
        const titleTodoList = this.createElement('input', {type: 'text', name: 'title', id: 'title', value: `${x}`});
        const editTodoList = this.createElement('i', {class: 'fas fa-pen edit'});
        const deleteTodoList = this.createElement('i', {class: 'far fa-trash-alt delete'});
        const todoListHeader = this.createElement('form', {id: 'todo-list-header'}, logoTodoList, titleTodoList, editTodoList, deleteTodoList);

        const logoAddTodoItem = this.createElement('i', {class: 'fas fa-plus'});
        const inputAddTodoItem = this.createElement('input', {type: 'text', name: 'add-todo-item', id: 'add-todo-item', placeholder: 'Start typing here to create a task...'});
        const addTodoItemBtn = this.createElement('button', {id: 'add-todo-item', type: 'button'}, 'Add Task');
        const createTodoItem = this.createElement('form', {id: 'create-todo-item'}, logoAddTodoItem, inputAddTodoItem, addTodoItemBtn);

        this.parent.appendChild(todoListHeader);
        this.parent.appendChild(createTodoItem);

        addTodoItemBtn.addEventListener('click', () => {

            this.addTodoItem(inputAddTodoItem.value);

        });

    }

    addTodoItem(value){

        // Формируем todo item

        console.log(value);
    }

    createElement(tag, attributes, ...children){

        const element = document.createElement(tag);
        
        for (const key in attributes) {
    
            if (attributes.hasOwnProperty(key)) {
    
                const props = attributes[key];
    
                element.setAttribute(key, props);
    
            }
    
        }
    
        if(children.length > 0){
    
            children.forEach(function(child){
    
                if(typeof child === 'string'){
    
                    child = document.createTextNode(child);
    
                }
    
                element.appendChild(child);
    
            });
    
        }
    
        return element;
    
    }

}

let todoList = new TodoList(parentNode);

addTodoList.addEventListener('click', function(){

    console.log('add');

    todoList.createTodoList();



})



