//This will be a parameter
const myList = ["apple", "pineapple", "pen"];

// Creates a custom element that extends the HTMLElement (not a spesific one), meaning it can be used like a standard HTML element
export default class RandomList extends HTMLElement {

    constructor() {
        //calls the super() function to invoke the HTMLElement constructor
        super();
        // A shallow copy of myList, so it doesn't reference the original
        this.staticList = [...myList];
        // Another shallow copy of myList
        this.listA = [...myList];
        // An empty array, which can be modified later
        this.listB = [];

        // Assumes there's a method that rtrieves an HTML template for the component
        let templateContent = this._getTemplateContent();
        //Task: No need to store variable shadowRoot, it is already part of the HTMLElement spec now.
        // Creates an open Shadow DOM, meaning external scripts can access it
        // Shadow DOM encapsulates the component's styles and structure, preventing conflicts with global styles
        let shadowRoot = this.attachShadow({ mode: "open" });
        // Clones the template into the Shadow DOM so it appears inside the custom element
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
//
    set list(list) {
        this.staticList = [...myList];
        this.listA = [...myList];
        this.listB = [];
    }

    // This method is called automatically when the element is added to the DOM
    connectedCallback() {
        // Populates the initial list of items
        this._populateStaticList();
        // Sets up event listeners for user interaction
        this._setEventListeners();
    }

    // The _ prefix suggests that these methods are ment to be internal (inside the class)
    _getTemplateContent() {
        // Creates a <template> element dynamically in JS (as the variable template)....
        const template = document.createElement("template");
        // ... then fills it with HTML content
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