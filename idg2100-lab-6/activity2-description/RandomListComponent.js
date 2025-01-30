//This will be a parameter
const myList = ["apple", "pineapple", "pen"];

/* 
attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue === newValue) return;
    if(name !== "nok") return;
    this._nok = newValue;
    this.render();
}*/

//re-render the individual items 

export default class RandomList extends HTMLElement {

    constructor() {
        super();

        let listString = this.getAttribute('list');

        this.staticList = [...myList];
        this.listA = [...myList];
        this.listB = [];

        let templateContent = this._getTemplateContent();
        //No need to store variable shadowRoot, it is already part of the HTMLElement spec now.
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // If the old value is the exact same as the new value, return
        if(oldValue === newValue) return;
        // If 
        if(name !== "nok") return;
        this._nok = newValue;
        this.render();
    }

    connectedCallback() {
        // Use this if you wish to debug
        // console.log("Connected component");
        this._populateStaticList();
        this._setEventListeners();
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