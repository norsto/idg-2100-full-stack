//This will be a parameter
const myList = ["apple", "pineapple", "pen"];

// Creates a custom element that extends the HTMLElement (not a spesific one), meaning it can be used like a standard HTML element
export default class RandomList extends HTMLElement {

    constructor() {
        //calls the super() function to invoke the HTMLElement constructor
        super();
        // A shallow copy of myList, so it doesn't reference the original
        // Initialize the list
        this.staticList = [...myList];
        // Another shallow copy of myList
        this.listA = [...myList];
        // An empty array, which can be modified later
        this.listB = [];

        // Assumes there's a method that retrieves an HTML template for the component
        let templateContent = this._getTemplateContent();
        //Task: No need to store variable shadowRoot, it is already part of the HTMLElement spec now.
        // Creates an open Shadow DOM, meaning external scripts can access it
        // Shadow DOM encapsulates the component's styles and structure, preventing conflicts with global styles
        let shadowRoot = this.attachShadow({ mode: "open" });
        // Clones the template into the Shadow DOM so it appears inside the custom element
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
//
/*
    set list(list) {
        this.staticList = [...myList];
        this.listA = [...myList];
        this.listB = [];
        const list = newList
    } */

    // This method is called automatically when the element is added to the DOM
    connectedCallback() {
        //Task: Use this if you wish to debug
        //Task: console.log("Connected component");
        // Populates the initial list of items
        this._populateStaticList();
        // Sets up event listeners for user interaction
        this._setEventListeners();
    }

    setList(newList) {
        this
    }

    // The _ prefix suggests that these methods are ment to be internal (inside the class)
    _getTemplateContent() {
        // Creates a <template> element dynamically in JS (as the variable template)...
        // <template> is a special HTML element used to store markup without rendering it immediatly. Exists in memory but does not appear in the DOM until explicitly inserted.
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
        // Clones and reuses the template without modifying the original
        // template.content is a DocumentFragment, which is like a lightweight container for DOM nodes
        // DocumentFragments are not part of the main DOM until you explicitly insert them
        return template.content;
    }

    _populateStaticList() {
        let shadowRoot = this.shadowRoot;
        // Finds the ul element with id originalList
        const ul = shadowRoot.getElementById("originalList");
        // Loops through this.staticList ...
        this.staticList.forEach(elem => {
            //... and adds each element as a li item inside the ul
            // beforeend specifies where to insert the new content (these wil be added just befor the end)
            ul.insertAdjacentHTML('beforeend', `<li>${elem}</li>`);
        });
    }

    // Finds the two buttins inside the Shadow DOM
    _setEventListeners() {
        let shadowRoot = this.shadowRoot;
        // Finds pullButton
        let pullButton = shadowRoot.getElementById("pullButton");
        // Finds resetButton
        let resetButton = shadowRoot.getElementById("resetButton");

        // When pullButton is clicked, it calls the _pullElement() method
        pullButton.addEventListener("click", (e) => {
            //Task: Use this if you wish to debug
            //Task: console.log('listend to click event');
            //Task: console.log(e);
            this._pullElement();
        });

        resetButton.addEventListener("click", (e) => {
            //Task: Use this if you wish to debug
            //Task: console.log('listend to reset click event');
            //Task: console.log(e);
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