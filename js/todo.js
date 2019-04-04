'use strict';

class TodoList extends Global{

    constructor(parent) {
        
        super();
        
        this.parent = parent;

    }

    createTodoList() {

        let x = prompt('Введите название листа');

        const logoTodoList = this.createElement('i', { class: 'far fa-calendar-alt calendar' });
        const titleTodoList = this.createElement('label', { class: 'title todo-title'}, x);
        const editTodoTitle = this.createElement('input', {type: 'text', name: 'edit-todo-title', class: 'edit edit-todo-title hide', value: x});
        const editTodoListBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        const deleteTodoListBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });
        const todoListHeader = this.createElement('form', {
            class: 'todo-list-header',
            onsubmit: 'return false'
        }, logoTodoList, titleTodoList, editTodoTitle, editTodoListBtn, deleteTodoListBtn);

        const logoAddTodoItem = this.createElement('i', { class: 'fas fa-plus' });
        const inputAddTodoItem = this.createElement('input', {
            type: 'text',
            name: 'add-todo-item',
            class: 'add-todo-item',
            placeholder: 'Start typing here to create a task...'
        });
        const addTodoItemBtn = this.createElement('button', { class: 'add-todo-item', type: 'button' }, 'Add Task');
        const createTodoItem = this.createElement('form', {
            class: 'create-todo-item',
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

        editTodoListBtn.addEventListener('click', () => {
            this.editElement(todoListHeader);
        });

    }

    addTodoItem(parent, value) {

        const doneItem = this.createElement('input', { type: 'checkbox', name: 'done', class: 'done' });
        const itemTitle = this.createElement('label', {class: 'title item-title'}, value);
        const editItemTitle = this.createElement('input', { type: 'text', name: 'edit-item-title', class: 'edit edit-item-title hide', value: value });
        const moveItemBtn = this.createElement('i', { class: 'fas fa-arrows-alt-v move' });
        const editItemBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        const deleteItemBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });
        const item = this.createElement('li', { class: 'todo-item' }, doneItem, itemTitle, editItemTitle, moveItemBtn, editItemBtn, deleteItemBtn);

        parent.appendChild(item);

    }

    deleteElement(el) {
        this.parent.removeChild(el);
    }

    editElement(el) {
        
        const editInput = el.querySelector('input.edit');
        const editableLabel = el.querySelector('label.title');

        editInput.classList.toggle('hide');
        editableLabel.classList.toggle('hide');

        editInput.focus();
        editInput.selectionStart = editInput.value.length;

        editInput.addEventListener('keydown', (event) => {
            
            if(event.keyCode === 13){
                console.log('keypress');    
                editInput.classList.toggle('hide');
                editableLabel.classList.toggle('hide');

                editableLabel.innerHTML = editInput.value;

            }

        }, false);

                
        console.dir(editInput);
        console.dir(editableLabel.innerHTML);
        
    }

}
