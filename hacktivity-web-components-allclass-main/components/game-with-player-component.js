//Remember to use ES6 modules

// Creates a new class called GameWithPlayer that extends HTMLElement, alloeing it to behave like a standard HTML element, but with custom behavior
class GameWithPlayer extends HTMLElement {
    // Initializes a counter totrack the number of keystrokes a player makes
    keystrokes = 0;

    // Runs when the element is created
    constructor() {
        // Calls super() to inherit functionality from HTMLElement
        super();
        // Retrieves the player attributes from the HTML tag
        this.gamePlayer = this.getAttribute("player");
        // Retrieves the letter attributes from the HTML tag 
        this.gameLetter = this.getAttribute("letter");

        this.playing = true;
        // Calls _getTemplateContent()
        let templateContent = this._getTemplateContent();
        // Creates a Shadow DOM, mode: open means JS outside the component can access it
        let shadowRoot = this.attachShadow({mode:"open"});
        // Clones and appends the template content to the Shadow DOM
        shadowRoot.appendChild(templateContent.cloneNode(true));

        // Selects an element inside the Shadow DOM with id="log", where the keystrokes are displayed
        const logElement = shadowRoot.querySelector("#log");
        // Binds this.getKey(logElement) to the "keyup" event, triggers when a key is pressed and released
        // This means whenever a player types, getKey(logElement) will handle it
        document.addEventListener("keyup", (event) => this.getKey(logElement, event));

        // "startgame" signals the game to start  
        // this.checkForGame("eventname") is called immediately instead of being assigned to an event listener
        document.addEventListener("startgame", this.checkForGame("startgame"));
        // "resetgame" resets the game
        document.addEventListener("resetgame", () => this.checkForGame(logElement));
        // "stopgame" stops the game temporarily
        document.addEventListener("stopgame", this.checkForGame("stopgame"));
        // "finishgame" ends the game and triggers score calculations
        document.addEventListener("finishgame", () => this._finalScoreReady());
    }

    // Creates and returns an HTML template that displays the players, their letter/key they're clicking and how many keystrokes they have, dynamically
    _getTemplateContent() {
        const template = document.createElement("template");
        template.innerHTML = `
        <div id="players">
        <p>Player: ${this.gamePlayer}</p>
        <p class="letter">${this.gameLetter}</p>
        <p id="log">Total keystrokes: ${this.keystrokes}</p>
        </div>
        `;
        // .content extractes the actual DOM elements from the <template>, making it ready for insertion into the Shadow DOM
        return template.content;
    }
    
    // Defines the getKey method, handles the keystroke input by the player and updates the UI based on their input
    // logElement is a reference to the DOM element (within the ShadowDOM) where the keystrokes will be logged (e.g., an element with id="log")
    // event is the event object that is passed when a key is pressed. It contains information about the key that was pressed (e.g., event.key)
    getKey(logElement, event) {
        if (event && this.playing) {
        // if the key pressed (event.key) matches the player's designated gameLetter...
            if (event.key === this.gameLetter) {
                //... it increments the keystrokes count by 1, and keeps track of how many correct keystrokes the player has made
                this.keystrokes++;
                // Updates the inner text of the logElement to display the updated count of keystrokes dynamically
                logElement.innerText = `Total keystrokes: ${this.keystrokes}`;
            }
        }
    }

    // Is intended to handle different game events and perform actions based on the event type
    checkForGame(eventType) {
        if ("startgame" === eventType) return this.getKey();
        else if (this.getKey()) return this.getKey().disabled;
    }

    //Created function to handle game reset
    resetGame(logElement) {
        //resetting "this.playing" to true for the game to be playable
        this.playing = true;

        //resetting keystrokes to 0
        this.keystrokes = 0;

        //Updating displayed keystroke message
        logElement.innerText = `Total keystrokes: ${this.keystrokes}`;
    }

    finalScoreReady() {
        this.dispatchEvent(new CustomEvent("finalscoreready", {
            detail: {
                player: this.gamePlayer,
                letter: this.gameLetter,
                keystrokes: this.keystrokes
            },
            bubbles: true,
            composed: true
        }))
        this.playing = false
    }

}

customElements.define("game-with-player", GameWithPlayer);


/*NEW!! */
//Remember to use ES6 modules
class GameWithPlayer extends HTMLElement {
    keystrokes = 0;

    constructor() {
        super();
        this.gamePlayer = this.getAttribute("player");
        this.gameLetter = this.getAttribute("letter");

        this.playing = true;
        let templateContent = this._getTemplateContent();
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));

        const logElement = shadowRoot.querySelector("#log");
        document.addEventListener("keyup", (event) => this.getKey(logElement, event));


        document.addEventListener("startgame", this.checkForGame("startgame"));

        //Updated this to call "this.resetGame" directly for the game to be reset
        document.addEventListener("resetgame", () => this.resetGame(logElement));
        document.addEventListener("stopgame", this.checkForGame("stopgame"));

        //Call the correct function directly to avoid redundant statements
        document.addEventListener("finishgame", () => this._finalScoreReady());
    }


    _getTemplateContent() {
        const template = document.createElement("template");
        template.innerHTML = `
        <div id="players">
        <p>Player: ${this.gamePlayer}</p>
        <p class="letter">${this.gameLetter}</p>
        <p id="log">Total keystrokes: ${this.keystrokes}</p>
        </div>
        `;
        return template.content;
    }

    getKey(logElement, event) {
        //Making sure event is defined before using ".key", and using boolean as constraint/to stop incrementing.
        if (event && this.playing) {
            if (event.key === this.gameLetter) {
                this.keystrokes++;
                logElement.innerText = `Total keystrokes: ${this.keystrokes}`;
            }
        }

    }


    checkForGame(eventType) {
        if ("startgame" === eventType) return this.getKey();
        else if (this.getKey()) return this.getKey().disabled;
    }
    //Created function to handle game reset
    resetGame(logElement) {
        //resetting "this.playing" to true for the game to be playable
        this.playing = true;

        //resetting keystrokes to 0
        this.keystrokes = 0;

        //Updating displayed keystroke message
        logElement.innerText = `Total keystrokes: ${this.keystrokes}`;
    }

    _finalScoreReady() {
        this.dispatchEvent(new CustomEvent("finalscoreready", {
            detail: {
                player: this.gamePlayer,
                letter: this.gameLetter,
                //Corrected the below line from "total" to "keystrokes"
                keystrokes: this.keystrokes
            },
            bubbles: true,
            composed: true
        }))
        //Setting boolean to false counter stops when time is up
        this.playing = false
    }
}

customElements.define("game-with-player", GameWithPlayer);
