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
/*
    // You can create a new array and use the same methods to get it to work, aka the script is made with reusable code
    // Setter method for a property called list
    // A setter (set) alows updating a property when assigning a new value
    set list(newList) {
        // Takes the newList parameter and stores it in staticList (original copy)
        this.staticList = [...newList];
        // Copies newList into listA, meaning listA always starts with this data
        // Reset listA
        this.listA = [...newList];
        // Clear listB to remove precious pulled elements
        this.listB = [];
    }
    // This method doesn't change the UI however    
    */

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

        // When pullButton is clicked, ... 
        pullButton.addEventListener("click", (e) => {
            //Task: Use this if you wish to debug
            //Task: console.log('listend to click event');
            //Task: console.log(e);
            //... it calls the _pullElement() method
            this._pullElement();
        });

        // When the resetButton is clicked, ...
        resetButton.addEventListener("click", (e) => {
            //Task: Use this if you wish to debug
            //Task: console.log('listend to reset click event');
            //Task: console.log(e);
            //... it calls the _resetList() method
            this._resetList();
        });
    }

    _pullElement() {
        // Creates a constant variable called randomElem that calls on the _pullRandomElementFromList function/method... 
        // ... which returns a random item from listA
        // this refers to RandomList
        const randomElem = this._pullRandomElementFromList();
        // If listA is empty, it exits/returns early...
        if (!randomElem)
            return;
        // ... otherwise it adds the element to the pulled list via the _addElementToPulledList() function/method
        this._addElementToPulledList(randomElem);
    }

    // Returns a random item from listA
    _pullRandomElementFromList() {
        // if listA has no elements, return null to stop execution
        if (!this.listA.length)
            return null;
        // const randomIndex stores built in functions, so you don't have to write the whole thing over and over
        // Math.random() generates a random decimal between 0 and 1 (e.g., 0,57)
        // Multiplying by listA.length gives a number between 0 and listA.length -1 (e.g., 0.57 * 3 = 1.71)
        // Math.floor() rounds it down to get a valid index (e.g., 1)
        const randomIndex = Math.floor(Math.random() * this.listA.length);
        // splice(index, 1) removes one item at randomIndex, the method returns an array of removed items
        // [0] extracts the first (and only) element from that array
        const randomElem = this.listA.splice(randomIndex, 1)[0];
        // Moves the element to listB (tracks removed elements in listB)
        this.listB.push(randomElem);
        // then the randomElem is returned to _pullElement() and it now has the randomly chosen item
        return randomElem;
    }

    // Adds the element to pulledList
    _addElementToPulledList(elem) {
        let shadowRoot = this.shadowRoot;
        // Finds the <ol id="pulledList"> inside the Shadow DOM
        const ul = shadowRoot.getElementById("pulledList");
        // Appends the element to the end of the pulled list, and keeps previous elements intact
        ul.insertAdjacentHTML('beforeend', `<li>${elem}</li>`);
    }

    // Resets the list
    _resetList() {
        // [...] is a spread operator and it creates new array copy, ensuring listA is separate from staticList
        // Restores listA
        this.listA = [...this.staticList];
        // Clears pulled elements, and won't hold any previously removed items
        this.listB = [];
        // shadowRoot holds the shadow DOM of the component (this is where the element's private HTML structure lives)
        // AKA accesses the shadow DOM
        let shadowRoot = this.shadowRoot;
        // Searches for the <ol id="pulledList"> inside the shadow DOM (this is where pulled elements are displayed)
        const ul = shadowRoot.getElementById("pulledList");
        // Clears the displayed pulled list (even though listB was already emptied, this removes elements from the screen)
        ul.innerHTML = "";
    }
}

// Registers RandomList as a custom HTML element (<random-list>)
customElements.define("random-list", RandomList);