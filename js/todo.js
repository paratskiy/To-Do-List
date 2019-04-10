'use strict';

class TodoList extends Global {

    constructor(parent) {

        super();

        this.parent = parent;

    }

    createTodoList(name, data) {

        this.todoListName = (name) ? name : '';

        const logoTodoList = this.createElement('i', { class: 'far fa-calendar-alt calendar' });
        const editTodoTitle = this.createElement('input', { type: 'text', name: 'edit-todo-title', class: 'edit edit-todo-title hide', value: this.todoListName });
        const titleTodoList = this.createElement('label', { class: 'title todo-title' }, this.todoListName);
        const editTodoListBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        const deleteTodoListBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });


        const todoListHeader = this.createElement('form', {
            class: 'todo-list-header',
            onsubmit: 'return false'
        }, logoTodoList, titleTodoList, editTodoTitle, editTodoListBtn, deleteTodoListBtn);

        const logoAddTodoItem = this.createElement('i', { class: 'fas fa-plus' });
        this.inputAddTodoItem = this.createElement('input', {
            type: 'text',
            name: 'add-todo-item',
            class: 'add-todo-item',
            placeholder: 'Start typing here to create a task...'
        });
        const addTodoItemBtn = this.createElement('button', { class: 'add-todo-item-btn', type: 'button' }, 'Add Task');
        const createTodoItem = this.createElement('form', {
            class: 'create-todo-item',
            onsubmit: 'return false'
        }, logoAddTodoItem, this.inputAddTodoItem, addTodoItemBtn);

        this.todoList = this.createElement('ul', { class: 'todo-list' });

        const todoListWrap = this.createElement('div', { class: 'todo-list-wrap' }, todoListHeader, createTodoItem, this.todoList);

        this.parent.appendChild(todoListWrap);


        if(data){
            console.log(data);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    this.addTodoItem(element.task_name, element.status);
                }
            }
        }

        addTodoItemBtn.addEventListener('click', () => {
            if (this.isValid(inputAddTodoItem)) {
                this.addTodoItem();
            } else {
                console.log('invalid');
            }
        });

        this.inputAddTodoItem.addEventListener('keydown', (event) => {
            if (event.keyCode == 13) {
                if (this.isValid(this.inputAddTodoItem)) {
                    this.addTodoItem();
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

        if (!name) {
            this.nameTheList(todoListHeader);
        }

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

    addTodoItem(name, status) {
        
        this.todoItemName = (name) ? name : this.inputAddTodoItem.value;
        this.status = (status == 0) ? false : true;

        const completeCheckbox = this.createElement('input', { type: 'checkbox', name: 'done', class: 'done'});
        const itemTitle = this.createElement('label', { class: 'title item-title' }, this.todoItemName);
        const editItemTitle = this.createElement('input', { type: 'text', name: 'edit-item-title', class: 'edit edit-item-title hide', value: this.todoItemName });
        const moveItemBtn = this.createElement('i', { class: 'fas fa-arrows-alt-v move' });
        const editItemBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        const deleteItemBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });
        const todoItem = this.createElement('li', { class: 'todo-item' }, completeCheckbox, itemTitle, editItemTitle, moveItemBtn, editItemBtn, deleteItemBtn);

        this.todoList.appendChild(todoItem);

        deleteItemBtn.addEventListener('click', () => {
            this.deleteElement(this.todoList, todoItem);
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

        if(status){
            completeCheckbox.checked = this.status;
        }
        this.inputAddTodoItem.value = '';

    }

    loadTodoList() {

        let xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/index.php', true);

        xhr.send('load-todo-list');

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                
                this.data = JSON.parse(xhr.responseText);

                for (const key in this.data) {
                    if (this.data.hasOwnProperty(key)) {
                        const element = this.data[key];
                        this.createTodoList(key, element);
                    }
                }

            }

        }

    }

    // loadTodoItem() {

    //     let xhr = new XMLHttpRequest();

    //     xhr.open('POST', 'server/index.php', true);

    //     xhr.send('load-todo-items');

    //     xhr.onreadystatechange = () => {

    //         if (xhr.readyState != 4) return;

    //         if (xhr.status != 200) {
    //             alert(xhr.status + ': ' + xhr.statusText);
    //         } else {
    //             this.data = JSON.parse(xhr.responseText);
    //             for (let i = 0; i < this.data.length; i++) {
    //                 const element = this.data[i];
    //                 console.log(element);
    //                 this.addTodoItem(element);

    //             }
    //         }

    //     }

    // }

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
