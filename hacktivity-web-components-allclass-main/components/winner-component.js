//Remember to use ES6 modules//Remember to use ES6 modules

// Creates a new class called Winner that extends HTMLElement, alloeing it to behave like a standard HTML element, but with custom behavior
class Winner extends HTMLElement{

    // The constructor is called whenever an instance of <winner> is created
    constructor() {
        // super() ensures that the parent class HTMLElement is initialized properly
        super(); 
        // alldata stores an array and is used for game related data
        this.alldata = [];
        // Boolean that tracks whether a game has ended
        this.isGameOver = false;

        // Attaches a Shadow DOM to the custom element, aka. the element will have encapsulated styles and strucure that won't be affected by the global DOM
        let shadowRoot = this.attachShadow({
            // mode: open allows external scripts to access the Shadow DOM
            mode: "open"
        });

        // Calls the method _templatePlaying() that returns som HTML strucure and/or content 
        // Is the default state of <winner> before the game ends 
        let templateContent = this._templatePlaying();

        // Listens for the custom event called finalscoreready, from the game-with-player-component.js file ...
        // ... this event is dispatched when the game determines that all players' scores are available
        document.addEventListener("finalscoreready", (e) => {
            // Gets the number of <game-with-player> elements in the document using length, which represent the players in the game
            let playerAmount = document.getElementsByTagName('game-with-player').length;
            // Calls _getdetail(e), which extracts relevant score data from the event object ...
            // ... and stores it in this.alldata. AKA processing score details
            this._getdetail(e)
            // Checks if all scores are collected. When the number of stored scores matches the number of players, it means all players' scores are ready
            if (this.alldata.length === playerAmount) {
                // Updates the UI to show the winner
                // Clears the Shadow DOM, effectively  resetting the UI
                shadowRoot.innerHTML = '';
                // Sets this.isGameOver = true, marking the game as finished
                this.isGameOver = true; 
                // Calls _find winner, ehich determines which player has won based on the collected scores
                const data = this._findWinner();
                // Calls _templateWinner(data), which returns an HTML template (or element) displaying the winner
                let winnerTemplate = this._templateWinner(data);
                // Appends this winner template to the Shadow DOM, updating the component UI to show the winner
                shadowRoot.append(winnerTemplate);
            }
        });

        // Ensures that the <winner> component can be reset dynamicalyy and return to its starting state when needed
        // Listens for the custom event named "resetgame", fires when the reset game button is clicked
        document.addEventListener("resetgame", (e) => {
            // this.alldata = []; resets the alldata array, which stores the players' scores
            this.alldata = []; 
            // Clears everything inside the Shadow DOM, effectively removingthe winner announcement
            shadowRoot.innerHTML = '';
            // Adds this cloned template back to the Shadow DOM, resetting the component to its initial state (templateContent, therefore _templatePlaying)
            shadowRoot.append(templateContent.cloneNode(true));
        });

        // This line (outside the event listener) ensures that when the <winner> element is first created, it displays the initial game UI (templateContent, therefore _templatePlaying)
        shadowRoot.append(templateContent.cloneNode(true));
    }

    // Anything outside the constructor is a method of te class and can be called anywhere within the class

    // Loops through this.alldata to find the player with the highest keystrokes
    _findWinner() {
        // Starts at 0 to track the highest keystroke count
        let highScore = 0;
        // Starts as an empty string and will store the winning player's data
        let winner = "";
        // this.alldata is the array that contains the player data...
        // ... this loop goes through each player's data
        this.alldata.forEach(data => {
            // If a player's keystrokes count is higher than the current highScore, then: ...
            if (data.keystrokes > highScore) {
                // highScore is updated to this new highest value
                highScore = data.keystrokes;
                // winner is updated to store the current player's data
                winner = data;
            } 
        })
        // After checking all players, the function returns the player data with the highest keystrokes
        return winner;
    }

    // _getdetail(e) method is responsible for extracting data from an ecent and storing it in the this.alldata array  
    // AKA processes score details, and is crucial for keeping track of players' scores
    _getdetail(e) {
        // e.detail (event detail) is used to access custom data that was sent when the event was dispatched 
        // This means that somewhere in the game, the event finalscoreready was dispatched 
        const detail = e.detail
        // The extracted data (detail) is added to the this.alldata array
        // Over time, this array collects all players' scores
        this.alldata.push(detail)
    }   

    // Is called  in the constructor or in the "resetgame" event listenter...
    // ... this appends a clone of the template to the Shadow DOM, rendering "Playing..." when the game starts
    // Creates and returns an HTML template that represents the "Playing..." state of the <winner> component
    _templatePlaying() {
        // A <template> element is created
        // The <template> tag is used because it allows HTML content to be stored without being immediatley rendered in the DOM
        const template = document.createElement("template");
        // Contains the HTML code you want to render 
        template.innerHTML = `
        <div>
            <h2>Playing...</h2>
        </div>`;
        // .content extractes the actual DOM elements from the <template>, making it ready for insertion into the Shadow DOM
        return template.content;
    }

    // Creates and returns an HTML template that displays the winner of the game inside the <winner> component
    _templateWinner(data) {
        // Creates a <template> element to hold the winner announcement 
        const template = document.createElement("template");
        // Contains the HTML code you want to render 
        // The <p> displaying the winner's name is dynamically set using the ${data.player} placeholder
        template.innerHTML = `
        <div>
            <h2>Winner!</h2>
            <p id="winner-paragraph">The winner is player: ${data.player}</p>
        </div>`;
        // .content extracts the actual DOM elements from the <template>, making it ready for inseriton into the Shadow DOM
        return template.content;
        // The template is appended tothe Shadow DOM, updating the UI with the winner
    }
    
}

// Registers the custom element <winner-box> in the browser 
// "winner-box" is the name of the custom tag that will be used in HTML
// Winner is the class that defines its behaviour 
// Allows <winner-box> to be used just like any other HTML tag
customElements.define("winner-box", Winner);
// Enables the component to handle game state, listen for events, and display the winner dynamically 