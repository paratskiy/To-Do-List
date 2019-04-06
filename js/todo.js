'use strict';

class TodoList extends Global {

    constructor(parent) {

        super();

        this.parent = parent;

    }

    createTodoList() {

        // let x = prompt('Введите название листа');

        const logoTodoList = this.createElement('i', { class: 'far fa-calendar-alt calendar' });
        const editTodoTitle = this.createElement('input', { type: 'text', name: 'edit-todo-title', class: 'edit edit-todo-title hide' });
        const titleTodoList = this.createElement('label', { class: 'title todo-title' });
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
        const addTodoItemBtn = this.createElement('button', { class: 'add-todo-item-btn', type: 'button' }, 'Add Task');
        const createTodoItem = this.createElement('form', {
            class: 'create-todo-item',
            onsubmit: 'return false'
        }, logoAddTodoItem, inputAddTodoItem, addTodoItemBtn);

        const todoList = this.createElement('ul', { class: 'todo-list' });

        const todoListWrap = this.createElement('div', { class: 'todo-list-wrap' }, todoListHeader, createTodoItem, todoList);

        this.parent.appendChild(todoListWrap);

        addTodoItemBtn.addEventListener('click', () => {
            if (this.isValid(inputAddTodoItem)) {
                this.addTodoItem(todoList, inputAddTodoItem);
            } else {
                console.log('invalid');
            }
        });

        inputAddTodoItem.addEventListener('keydown', (event) => {
            if (event.keyCode == 13) {
                if (this.isValid(inputAddTodoItem)) {
                    this.addTodoItem(todoList, inputAddTodoItem);
                } else {
                    console.log('invalid');
                }
            }
        });

        deleteTodoListBtn.addEventListener('click', () => {
            this.deleteElement(this.parent, todoListWrap);
        });

        editTodoListBtn.addEventListener('click', () => {
            if (this.isValid(editTodoTitle)) {
                this.editElement(todoListHeader);
            } else {
                console.log('invalid');
            }
        });

        this.nameTheList(todoListHeader);

    }

    nameTheList(el) {

        const editInput = el.querySelector('input.edit');

        editInput.focus();

        this.editElement(el);

        if (this.isValid(editInput)) {
            this.editElement(el);
        } else {
            console.log('invalid');
        }

    }

    addTodoItem(parent, addInput) {

        const completeCheckbox = this.createElement('input', { type: 'checkbox', name: 'done', class: 'done' });
        const itemTitle = this.createElement('label', { class: 'title item-title' }, addInput.value);
        const editItemTitle = this.createElement('input', { type: 'text', name: 'edit-item-title', class: 'edit edit-item-title hide', value: addInput.value });
        const moveItemBtn = this.createElement('i', { class: 'fas fa-arrows-alt-v move' });
        const editItemBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        const deleteItemBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });
        const todoItem = this.createElement('li', { class: 'todo-item' }, completeCheckbox, itemTitle, editItemTitle, moveItemBtn, editItemBtn, deleteItemBtn);

        parent.appendChild(todoItem);

        deleteItemBtn.addEventListener('click', () => {
            this.deleteElement(parent, todoItem);
        });

        editItemBtn.addEventListener('click', () => {
            if (this.isValid(editItemTitle)) {
                this.editElement(todoItem);
            } else {
                console.log('invalid');
            }
        });

        completeCheckbox.addEventListener('change', () => {
            this.completeTask(todoItem);
        })

        addInput.value = '';

    }

    deleteElement(parent, el) {
        parent.removeChild(el);
    }

    editElement(el) {

        const editInput = el.querySelector('input.edit');
        const editableLabel = el.querySelector('label.title');

        editInput.classList.toggle('hide');
        editableLabel.classList.toggle('hide');

        editInput.focus();
        editInput.selectionStart = editInput.value.length;

        editableLabel.innerHTML = editInput.value;

        const keydownEvent = (event) => {

            if (event.keyCode === 13) {
                if (this.isValid(editInput)) {
                    editInput.classList.toggle('hide');
                    editableLabel.classList.toggle('hide');

                    editableLabel.innerHTML = editInput.value;

                    editInput.removeEventListener('keydown', keydownEvent, false);
                } else {
                    console.log('invalid');
                }

            }

        }

        editInput.addEventListener('keydown', keydownEvent, false);

    }

    isValid(el) {

        if (el.value.length > 0) {
            return true;
        }

        return false;

    }

    completeTask(el) {

        const completeCheckbox = el.querySelector('.done');

        el.classList.toggle('complete');

    }

}
