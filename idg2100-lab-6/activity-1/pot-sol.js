//see lecture web components for a solution


export default class ListRender extends HTMLElement {
    list = ["valnøtt", "hasselnøtt", "mandel"];

    constructor() {
        super();

        this.shadowObj = this.attachShadow({mode: 'open'});
        this.shadowObj.innerHTML = "Hello I'm a list render";

        this.print();
    }

    print() {
        const ul = document.createElement('ul');

        this.list.forEach(element => {

        });
    }
}