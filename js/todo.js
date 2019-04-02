'use strict';

class TodoList extends Global{

    constructor(parent) {
        
        super();
        
        this.parent = parent;

    }

    createTodoList() {

        let x = prompt('Введите название листа');

        const logoTodoList = this.createElement('i', { class: 'far fa-calendar-alt calendar' });
        const titleTodoList = this.createElement('input', { type: 'text', name: 'title', id: 'title', value: x });
        const editTodoListBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        const deleteTodoListBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });
        const todoListHeader = this.createElement('form', {
            id: 'todo-list-header',
            onsubmit: 'return false'
        }, logoTodoList, titleTodoList, editTodoListBtn, deleteTodoListBtn);

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

        deleteTodoListBtn.addEventListener('click', () => {
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

    editTodoListBtn() {

    }

}
