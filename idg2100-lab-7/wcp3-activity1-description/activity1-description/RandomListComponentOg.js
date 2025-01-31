//This will be a parameter
const myList = ["apple", "pineapple", "pen"];

export default class RandomList extends HTMLElement {

    constructor() {
        super();
        this.staticList = [...myList];
        this.listA = [...myList];
        this.listB = [];

        let templateContent = this._getTemplateContent();
        // No need to store variable shadowRoot, it is already part of the HTMLElement spec now.
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }

/*
    set list(list) {
        this.staticList = [...myList];
        this.listA = [...myList];
        this.listB = [];
        const list = newList
    } */
    setStaticList(list) {
        this._initList(list);
        this.render();
    }

    _initList() {

    }

    render() {
        
    }

    renderStaticList() {
        this.shadowRoot.getElementById("")
    }

    renderRandomList() {

    }

    connectedCallback() {
        // Use this if you wish to debug
        // console.log("Connected component");
        this._populateStaticList();
        this._setEventListeners();
    }

    setList(newList) {
        this.listB = newList;
        return newList;
    }

    _getTemplateContent() {
        const template = document.createElement("template");
        template.innerHTML = `
            <h2>Original list of elements</h2>
            <ul id="originalList"></ul>

            <button id="pullButton">Pull Element</button>
            <button id="resetButton">Reset</button>

            <h2>Random elements removed from list</h2>
            <ol id="pulledList"></ul>
        `;
        return template.content;
    }

    _populateStaticList() {
        let shadowRoot = this.shadowRoot;
        const ul = shadowRoot.getElementById("originalList");
        this.staticList.forEach(elem => {
            ul.insertAdjacentHTML('beforeend', `<li>${elem}</li>`);
        });
    }

    _setEventListeners() {
        let shadowRoot = this.shadowRoot;
        let pullButton = shadowRoot.getElementById("pullButton");
        let resetButton = shadowRoot.getElementById("resetButton");

        pullButton.addEventListener("click", (e) => {
            // Use this if you wish to debug
            // console.log('listend to click event');
            // console.log(e);
            this._pullElement();
        });

        resetButton.addEventListener("click", (e) => {
            // Use this if you wish to debug
            // console.log('listend to reset click event');
            // console.log(e);
            this._resetList();
        });

    }

    _pullElement() {
        const randomElem = this._pullRandomElementFromList();
        if (!randomElem)
            return;
        this._addElementToPulledList(randomElem);
    }

    //pulling one element from listA and putting it into listB
    _pullRandomElementFromList() {
        if (!this.listA.length)
            return null;
        const randomIndex = Math.floor(Math.random() * this.listA.length);
        const randomElem = this.listA.splice(randomIndex, 1)[0];
        this.listB.push(randomElem);
        return randomElem;
    }

    _addElementToPulledList(elem) {
        let shadowRoot = this.shadowRoot;
        const ul = shadowRoot.getElementById("pulledList");
        ul.insertAdjacentHTML('beforeend', `<li>${elem}</li>`);
    }

    _resetList() {
        this.listA = [...this.staticList];
        this.listB = [];
        let shadowRoot = this.shadowRoot;
        const ul = shadowRoot.getElementById("pulledList");
        ul.innerHTML = "";
    }
}

customElements.define("random-list", RandomList);