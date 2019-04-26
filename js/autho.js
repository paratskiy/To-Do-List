'use strict';

class Authorization extends Global {

    constructor(parent) {

        super();

        this.parent = parent;

        this.signOutBtn = this.createElement('button', { class: 'sign-out' }, 'Выход');

        this.loginInput = this.createElement('input', { name: 'login', type: 'text', placeholder: 'Введите логин' });
        this.passwordInput = this.createElement('input', { name: 'password', type: 'password', placeholder: 'Введите пароль' });
        this.toRegistrationBtn = this.createElement('a', { class: 'to-registration', href: '#' }, 'Регистрация');
        this.button = this.createElement('button', { name: 'submit', type: 'submit' }, 'Вход');
        this.btnWrap = this.createElement('div', { class: 'btn-wrap' }, this.button, this.toRegistrationBtn);
        this.form = this.createElement('form', { class: 'authorization' }, this.loginInput, this.passwordInput, this.btnWrap);

        this.sendData = this.sendData.bind(this);
        this.toRegistration = this.toRegistration.bind(this);
        this.signOut = this.signOut.bind(this);

        this.button.addEventListener('click', this.sendData, false);
        this.toRegistrationBtn.addEventListener('click', this.toRegistration, false);
        this.signOutBtn.addEventListener('click', this.signOut, false);

    }

    cleanInput() {
        this.loginInput.value = '';
        this.passwordInput.value = '';
    }

    toRegistration() {

        this.parent.removeChild(this.form);

        const registration = new Registration(parentNode);

        registration.render();

    }

    render() {

        this.parent.appendChild(this.form);

    }

    takeInputData() {

        const userData = {}

        userData.login = this.loginInput.value;
        userData.password = this.passwordInput.value;

        return JSON.stringify(userData);

    }

    checkUserAutho() {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/autho.php', true);

        xhr.send();

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {

                let isJson = true;

                try {
                    JSON.parse(xhr.responseText)
                } catch (e) {
                    isJson = false
                }

                if (isJson) {

                    const response = JSON.parse(xhr.responseText);

                    console.dir(response);

                    if (response.user) {

                        const todoList = new TodoList(this.parent, true);

                        todoList.loadTodoList();

                        this.user = this.createElement('span', {}, response.user);
                        this.authoUser = this.createElement('span', { class: 'autho-user' }, 'Добро пожаловать, ', this.user);

                        this.parent.appendChild(this.authoUser);
                        this.parent.appendChild(this.signOutBtn);

                        this.addIcon = this.createElement('i', { class: 'fas fa-plus' });
                        this.addTodoListBtn = this.createElement('button', { id: 'add-todo-list', type: 'button' }, this.addIcon, 'Add TODO List');

                        this.parent.appendChild(this.addTodoListBtn);

                        this.addTodoListBtn.addEventListener('click', function () {

                            const todoList = new TodoList(parentNode, false);

                            todoList.createTodoList();

                        });

                        return;
                    }

                }

                this.render();

            }

        }

    }

    signOut() {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/signOut.php', true);

        xhr.send();

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {

                while (this.parent.children[0]) {
                    this.parent.removeChild(this.parent.children[0]);
                }

                this.render();

            }

        }

    }

    sendData() {

        event.preventDefault();

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/autho.php', true);

        xhr.send(this.takeInputData());

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {

                let isJson = true;

                try {
                    JSON.parse(xhr.responseText)
                } catch (e) {
                    isJson = false
                }

                if (isJson) {

                    const response = JSON.parse(xhr.responseText);

                    if (!response.user) {
                        console.log('Вы ошиблись. Повторите попытку или зарегестрируйтесь');
                        this.cleanInput();
                        return;
                    }

                    this.parent.removeChild(this.form);

                    const todoList = new TodoList(this.parent, true);

                    todoList.loadTodoList();

                    this.user = this.createElement('span', {}, response.user);
                    this.authoUser = this.createElement('span', { class: 'autho-user' }, 'Добро пожаловать, ', this.user);

                    this.parent.appendChild(this.authoUser);
                    this.parent.appendChild(this.signOutBtn);

                    this.addIcon = this.createElement('i', { class: 'fas fa-plus' });
                    this.addTodoListBtn = this.createElement('button', { id: 'add-todo-list', type: 'button' }, this.addIcon, 'Add TODO List');

                    this.parent.appendChild(this.addTodoListBtn);

                    this.addTodoListBtn.addEventListener('click', function () {

                        const todoList = new TodoList(parentNode, false);

                        todoList.createTodoList();

                    });
                    
                    this.cleanInput();

                    return;

                }



            }

        }

    }

}


class Registration extends Global {

    constructor(parent) {

        super();

        this.parent = parent;

        this.loginInput = this.createElement('input', { name: 'login', type: 'text', placeholder: 'Введите логин' });
        this.passwordInput = this.createElement('input', { name: 'password', type: 'password', placeholder: 'Введите пароль' });
        this.confirmPasswordInput = this.createElement('input', { name: 'confirm-password', type: 'password', placeholder: 'Подтвердите пароль' });
        this.signIn = this.createElement('a', { class: 'to-signin', href: '#' }, 'Вход');
        this.button = this.createElement('button', { name: 'submit', type: 'submit' }, 'Зарегестрироваться');
        this.btnWrap = this.createElement('div', { class: 'btn-wrap' }, this.button, this.signIn);
        this.form = this.createElement('form', { class: 'registration', onsubmit: 'return false' }, this.loginInput, this.passwordInput, this.confirmPasswordInput, this.btnWrap);

        this.sendData = this.sendData.bind(this);
        this.toSignIn = this.toSignIn.bind(this);

        this.button.addEventListener('click', this.sendData, false);
        this.signIn.addEventListener('click', this.toSignIn, false);

    }

    cleanInput() {
        this.loginInput.value = '';
        this.passwordInput.value = '';
        this.confirmPasswordInput.value = '';
    }

    toSignIn() {

        this.parent.removeChild(this.form);

        const authorization = new Authorization(parentNode);

        authorization.render();

    }

    render() {

        this.parent.appendChild(this.form);

    }

    takeInputData() {

        if (this.passwordInput.value == this.confirmPasswordInput.value) {

            const userData = {}

            userData.login = this.loginInput.value;
            userData.password = this.passwordInput.value;

            return JSON.stringify(userData);

        }

        console.log('Пароли не совпадают');


    }

    sendData() {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/registration.php', true);

        xhr.send(this.takeInputData());

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {

                const response = JSON.parse(xhr.responseText);

                if (!response) {
                    return;
                }

                if (response.registration) {

                    this.parent.removeChild(this.form);

                    const authorization = new Authorization(parentNode);

                    authorization.render();

                    this.cleanInput();

                    return;

                }

                console.log(response);
                this.cleanInput();

            }

        }

    }

}