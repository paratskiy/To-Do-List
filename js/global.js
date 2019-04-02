'use strict';

class Global {

    constructor(){

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