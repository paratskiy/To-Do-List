'use strict';

class TodoList extends Global {

    constructor(parent, name, data) {

        super();

        this.parent = parent;
        this.data = data;
        this.name = name;

        this.todoListName = (this.name) ? this.name : '';

        this.logoTodoList = this.createElement('i', { class: 'far fa-calendar-alt calendar' });
        this.editTodoTitle = this.createElement('input', { type: 'text', name: 'edit-todo-title', class: 'edit edit-todo-title hide', value: this.todoListName });
        this.titleTodoList = this.createElement('label', { class: 'title todo-title' }, this.todoListName);
        this.editTodoListBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        this.deleteTodoListBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });


        this.todoListHeader = this.createElement('form', {
            class: 'todo-list-header',
            onsubmit: 'return false'
        }, this.logoTodoList, this.titleTodoList, this.editTodoTitle, this.editTodoListBtn, this.deleteTodoListBtn);

        this.logoAddTodoItem = this.createElement('i', { class: 'fas fa-plus' });
        this.inputAddTodoItem = this.createElement('input', {
            type: 'text',
            name: 'add-todo-item',
            class: 'add-todo-item',
            placeholder: 'Start typing here to create a task...'
        });
        this.addTodoItemBtn = this.createElement('button', { class: 'add-todo-item-btn', type: 'button' }, 'Add Task');
        this.createTodoItem = this.createElement('form', {
            class: 'create-todo-item',
            onsubmit: 'return false'
        }, this.logoAddTodoItem, this.inputAddTodoItem, this.addTodoItemBtn);

        this.todoList = this.createElement('ul', { class: 'todo-list' });

        this.todoListWrap = this.createElement('div', { class: 'todo-list-wrap' }, this.todoListHeader, this.createTodoItem, this.todoList);
        this.todoListWrap.dataset.projectName = '';
        this.todoListWrap.dataset.projectId = '';
        this.todoListWrap.dataset.elementName = 'project';

    }

    createTodoList() {

        this.parent.appendChild(this.todoListWrap);

        if (this.data) {
            this.todoListWrap.dataset.projectId = this.data.project_id;
            this.todoListWrap.dataset.projectName = this.name;
            for (const key in this.data) {
                if (this.data.hasOwnProperty(key) && typeof this.data[key] != 'string') {
                    const element = this.data[key];
                    const todoItem = new TodoItem(this.todoList, element.task_name, element.status, element.id);
                    todoItem.addTodoItem();
                }
            }
        }

        this.addTodoItemBtn.addEventListener('click', () => {
            if (this.isValid(this.inputAddTodoItem)) {
                const todoItem = new TodoItem(this.todoList, this.inputAddTodoItem.value);
                let taskInfo = todoItem.addTodoItem();
                this.inputAddTodoItem.value = '';

                if(taskInfo){
                    console.log(taskInfo);
                }

            } else {
                console.log('invalid');
            }
        });

        // this.inputAddTodoItem.addEventListener('keydown', (event) => {
        //     if (event.keyCode == 13) {
        //         if (this.isValid(this.inputAddTodoItem)) {
        //                  const todoItem = new TodoItem(element.task_name, element.status, element.id);
        //todoItem.addTodoItem();
        //         } else {
        //             console.log('invalid');
        //         }
        //     }
        // });

        this.deleteTodoListBtn.addEventListener('click', () => {
            this.deleteElement(this.todoListWrap);
        });

        this.editTodoListBtn.addEventListener('click', () => {
            if (this.isValid(this.editTodoTitle)) {
                let projectInfo = this.editElement(this.todoListWrap);

                if(projectInfo.project_id == ''){
                    this.insertTodoList(projectInfo);
                } else {
                    this.updateTodoList(projectInfo);
                }

            } else {
                console.log('invalid');
            }
        });

        if (!name) {
            this.nameTheList(this.todoListWrap);
        }
        // console.log(this);

        if (this.todoListWrap.dataset.projectName) {
            // console.log(this.todoListWrap.dataset.projectName);
        }



    }

    nameTheList(el) {

        const editInput = el.querySelector('input.edit');

        editInput.focus();

        this.editElement(el);

        if (this.isValid(editInput)) {
            let projectName = this.editElement(el);
            // console.log(projectName);
        } else {
            console.log('invalid');
        }

    }

    loadTodoList() {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/load_data.php', true);

        xhr.send('load-todo-list');

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {

                const response = JSON.parse(xhr.responseText);

                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        const element = response[key];
                        const todoList = new TodoList(parentNode, key, element);
                        todoList.createTodoList();
                    }
                }

            }

        }

    }

    updateTodoList(body) {
        console.log(JSON.stringify(body));
        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/update_data.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                // console.log(JSON.parse(xhr.responseText));
                
                console.log(xhr.responseText);
            }

        }

    }

    insertTodoList(body) {
        
        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/insert_data.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                // console.log(JSON.parse(xhr.responseText));
                
                console.log(xhr.responseText);
            }

        }
        
    }


    // deleteElementDB(body){

    //     const xhr = new XMLHttpRequest();

    //     xhr.open('POST', 'server/index.php', true);

    //     xhr.send(JSON.stringify(body));

    //     xhr.onreadystatechange = () => {

    //         if (xhr.readyState != 4) return;

    //         if (xhr.status != 200) {
    //             alert(xhr.status + ': ' + xhr.statusText);
    //         } else {
    //             console.log(JSON.parse(xhr.responseText));
    //         }

    //     }
    // }

    deleteElement(el) {
        el.parentNode.removeChild(el);
    }

    editElement(el) {

        const editInput = el.querySelector('input.edit');
        const editableLabel = el.querySelector('label.title');

        editInput.classList.toggle('hide');
        editableLabel.classList.toggle('hide');

        editInput.focus();
        editInput.selectionStart = editInput.value.length;

        if (editInput.value != editableLabel.innerHTML) {

            if (el.dataset.elementName == 'project') {
                
                this.todoListWrap.dataset.projectName = editInput.value;
                editableLabel.innerHTML = editInput.value;
                return { element_name: this.todoListWrap.dataset.elementName, 
                         project_name: this.todoListWrap.dataset.projectName, 
                         project_id:   this.todoListWrap.dataset.projectId }
            }

            if (el.dataset.elementName == 'task') {
                
                this.todoItem.dataset.taskName = editInput.value;
                editableLabel.innerHTML = editInput.value;
                return { element_name: this.todoItem.dataset.elementName, 
                         task_name:    this.todoItem.dataset.taskName, 
                         task_id:      this.todoItem.dataset.taskId,
                         task_status:  this.todoItem.dataset.status }
            }

            editableLabel.innerHTML = editInput.value;

        }

        return false;

        // const keydownEvent = (event) => {

        //     if (event.keyCode === 13) {
        //         if (this.isValid(editInput)) {
        //             editInput.classList.toggle('hide');
        //             editableLabel.classList.toggle('hide');

        //             editableLabel.innerHTML = editInput.value;

        //             editInput.removeEventListener('keydown', keydownEvent, false);
        //             console.log(editableLabel);
        //         } else {
        //             console.log('invalid');
        //         }

        //     }

        // }
        // editInput.removeEventListener('keydown', keydownEvent, false);
        // editInput.addEventListener('keydown', keydownEvent, false);

    }

    isValid(el) {

        if (el.value.length > 0) {
            return true;
        }

        return false;

    }

}


class TodoItem extends TodoList {

    constructor(todoList, name_from_db, status, task_id, name) {

        super();

        this.todoList = todoList;
        this.name_from_db = name_from_db;
        this.name = name;
        this.status = status;
        this.task_id = task_id;

        this.todoItemName = (this.name_from_db) ? this.name_from_db : this.name;
        this.isComlete = (this.status == 0) ? false : true;

        this.completeCheckbox = this.createElement('input', { type: 'checkbox', name: 'done', class: 'done' });
        this.itemTitle = this.createElement('label', { class: 'title item-title' }, this.todoItemName);
        this.editItemTitle = this.createElement('input', { type: 'text', name: 'edit-item-title', class: 'edit edit-item-title hide', value: this.todoItemName });
        this.moveItemBtn = this.createElement('i', { class: 'fas fa-arrows-alt-v move' });
        this.editItemBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        this.deleteItemBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });
        this.todoItem = this.createElement('li', { class: 'todo-item' }, this.completeCheckbox, this.itemTitle, this.editItemTitle, this.moveItemBtn, this.editItemBtn, this.deleteItemBtn);
        this.todoItem.dataset.taskName = this.todoItemName;
        this.todoItem.dataset.taskId = '';
        this.todoItem.dataset.status = '0';

    }


    addTodoItem() {

        this.todoList.appendChild(this.todoItem);

        this.deleteItemBtn.addEventListener('click', () => {
            console.log(this.todoItem.dataset.taskId);
            this.deleteElement(this.todoItem);
        });

        this.editItemBtn.addEventListener('click', () => {
            if (this.isValid(this.editItemTitle)) {
                // this.editElement(this.todoItem);
                let taskInfo = this.editElement(this.todoItem);
                
                if(taskInfo){
                    
                    if(taskInfo.task_id == ''){
                        console.log('new');
                    } else {
                        this.updateTodoList(taskInfo);
                    }

                }

            } else {
                console.log('invalid');
            }
        });

        this.completeCheckbox.addEventListener('change', () => {
            let taskInfo = this.completeTask();
            
            if(taskInfo){
                this.updateTodoList(taskInfo);
            }
        })

        if (this.status == true) {
            this.completeCheckbox.checked = this.isComlete;
            this.completeTask(this.todoItem);
        }

        if (this.task_id) {
            this.todoItem.dataset.taskId = this.task_id;
        }

        if (this.name_from_db) {
            this.todoItem.dataset.taskName = this.name_from_db;
        }

        if (this.todoItem.dataset.taskName) {
            // console.log(this.todoItem.dataset.taskName);
        }

        this.todoItem.dataset.elementName = 'task';

        return { element_name: this.todoItem.dataset.elementName, 
                 task_name:    this.todoItem.dataset.taskName, 
                 task_id:      this.todoItem.dataset.taskId,
                 task_status:  this.todoItem.dataset.status }

        

    }

    completeTask() {

        const completeCheckbox = this.todoItem.querySelector('.done');

        this.todoItem.classList.toggle('complete');

        if(this.todoItem.dataset.status == 0){
            this.todoItem.dataset.status = 1;
        } else {
            this.todoItem.dataset.status = 0;
        }

        return { element_name: this.todoItem.dataset.elementName, 
                 task_name:    this.todoItem.dataset.taskName, 
                 task_id:      this.todoItem.dataset.taskId,
                 task_status:  this.todoItem.dataset.status }

    }

}
