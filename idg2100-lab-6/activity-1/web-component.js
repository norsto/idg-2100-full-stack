/* Student Activity: Web Components 
Create a web component that can render a list of elements
    Ex.: ["valnøtt", "hasselnøtt", "mandel"];
The component has to be reusable:
    Name it <list-render> (or <nuts-list>)
Create two divs in your HTML file and use your new component inside of each one of the divs*/

/*
import 'awesome-explosion.js';
import {awesomeExplosion} from '@awesome-things/awesome-explosion';
*/

class ListRender extends HTMLElement {
    constructor(list) {
        const li = document.createElement('li');
        const shadowRoot = li.attachShadow({mode: 'open'});

    }
}

customElements.define("list-render", ListRender);

/*
const li = document.createElement('li');
const shadowRoot = li.attachShadow({mode: 'open'});
*/