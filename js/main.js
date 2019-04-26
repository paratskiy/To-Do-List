'use strict';

const parentNode = document.querySelector('.wrapper');

const registrationForm = document.querySelector('.registration');
const autchoForm = document.querySelector('.autho');

document.addEventListener('DOMContentLoaded', function () {

    const authorization = new Authorization(parentNode);

    authorization.checkUserAutho();

});