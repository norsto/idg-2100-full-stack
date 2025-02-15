/* Countdown Timer (<countdown-timer>)
Controls when the race can start. It serves as a "Ready... Go!" timer but does not control the race duration.

Attributes:
seconds: The number of seconds before the race starts.

Functionality:
Counts down from seconds to 0.
When it reaches 0, the race begins.
Controls:
start: Begins the countdown.
reset: Resets the countdown (horses return to the start position).
Events:
race-start: Emitted when the countdown reaches 0, signaling that the race can begin.
race-reset: Emitted when the countdown is reset, instructing all horses to return to the start line and wait for the next race.
*/

class CountdownTimer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        const countdownTag = document.querySelector("#countdownTimer");
        this.timeLeft = countdownTag.getAttribute("seconds");

        this.countdownStart = false;

        this.shadowRoot.innerHTML = this.getTemplateButtons();
        this.shadowRoot.append(this._countdownTemplate());
        
        this.startButton = this.shadowRoot.querySelector("#startButton");
        this.resetButton = this.shadowRoot.querySelector("#resetButton");

        this.countdownDisplay = this.shadowRoot.querySelector("#countdown");

        this.countdownDisplay.style.opacity = 0;
        
        this.startButton.addEventListener("click", () => {
            if(!this.countdownStart) {
                this.countdownDisplay.style.opacity = 1;
                this.countDown();
                this.countdownStart = true; 
            }
        });

        this.resetButton.addEventListener("click", () =>{
            if(this.timeLeft == 0) {
                this.timeLeft = 5;
                this.countdownStart = false;
                this.countdownDisplay.innerHTML= this.timeLeft;
                this.countdownDisplay.style.opacity = 0;

                this.fireEvent("race-reset");
            }
        });
    }

    getTemplateButtons() {
        return `
        <style>
            button {
                color: whitesmoke;
                background-color: black;
                border-radius: 5px;
                border: none;
                padding: 10px;
                margin-left: 5px;
                margin-right: 5px;
            }
        </style>
        <div>
            <button id="startButton">start</button>
            <button id="resetButton">reset</button> 
        </div>`;
    }

    _countdownTemplate() {
        const template = document.createElement("template");
        
        template.innerHTML = `
        <style>
            #countdown {
                text-align: center;
                font-size: 28px;
            }
        </style>
        <div>
            <h2 id="countdown">${this.timeLeft}</h2>
        </div>`;

        return template.content;
    }

    countDown() {   
        const countdownTag = document.querySelector("#countdownTimer"); 
        this.timer = setInterval(() => {
            if (this.timeLeft > 1) {
                this.timeLeft--;
                this.shadowRoot.querySelector("#countdown").textContent = this.timeLeft;
                countdownTag.setAttribute("seconds", this.timeLeft);
            } else {
                this.timeLeft--;
                clearInterval(this.timer);
                this.shadowRoot.querySelector("#countdown").textContent = "Go!";
                this.fireEvent("race-start");
                countdownTag.setAttribute("seconds", 0);
            }
        }, 1000);
    }

    fireEvent(eventName){
        this.dispatchEvent(
            new CustomEvent(eventName, {
                bubbles: true,
                composed: true
            })
        );
    }
}

customElements.define("countdown-timer", CountdownTimer);

/*
class CountdownTimer extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: "open"});

        const countdownTag = document.querySelector("#countdownTimer");
        this.timeLeft = countdownTag.getAttribute("seconds");

        this.countdownStart = false;

        this.shadowRoot.innerHTML = this.getTemplateButtons();
        this.shadowRoot.append(this._countdownTemplate());

        this.startButton = this.shadowRoot.querySelector("#startButton");
        this.resetButton = this.shadowRoot.querySelector("#resetButton");

        this.countdownDisplay = this.shadowRoot.querySelector("#countdown");

        this.countdownDisplay.style.opacity = 0;

        this.startButton.addEventListener("click", () => {
            if(!this.countdownStart) {
                this.countdownDisplay.style.opacity = 1;
                this.countDown();
                this.countdownStart = true; 
            }
        });
    }

    getTemplateButtons() {
        return `
        <style>
        button {
            color: whitesmoke;
            background-color: black;
            border-radius: 5px;
            border: none;
            padding: 10px;
            margin-left: 5px;
            margin-right: 5px;
        }
        </style>
        <div>
            <button id="startButton">start</button>
            <button id="resetButton">reset</button> 
        </div>`;
    }

    _countdownTemplate() {
        const template = document.createElement("template");
        
        template.innerHTML = `
        <style>
            #countdown {
                text-align: center;
                font-size: 28px;
            }
        </style>
        <div>
            <h2 id="countdown">${this.timeLeft}</h2>
        </div>`;

        return template.content;
    }

    countDown() {
        const countdownTag = document.querySelector("#countdownTimer"); 
        this.timer = setInterval(() => {
            if (this.timeLeft > 1) {
                this.timeLeft--;
                this.shadowRoot.querySelector("#countdown").textContent = this.timeLeft;
                countdownTag.setAttribute("seconds", this.timeLeft);
            } else {
                clearInterval(this.timer);
                this.shadowRoot.querySelector("#countdown").textContent = "Go!";
                countdownTag.setAttribute("seconds", 0);
            }
        }, 1000);
    }
}

customElements.define("countdown-timer", CountdownTimer);
*/
/*
class CountdownTimerNope extends HTMLElement {
    
    constructor() {
        super(); 

        this.attachShadow({mode: "open"});

        this.gameStarted = false;
        // could make this more dynamic
        this.timeLeft = 5;
        this.timer = '';

        this.startBtn = this.shadowRoot.querySelector("#startButton");
        this.resetBtn = this.shadowRoot.querySelector("#resetButton");

        this.buttons = this.getTemplateButtons();

//        this.shadowRoot.appendChild(getTemplateButtons());
//        let display = this.getTemplateButtons();

        this.startBtn.addEventListener("click", (e) => {

            if (this.clicked === true) {
                this.gameStarted = true;
                let countdownTemplate = this._countdownTemplate;
                shadowRoot.append(countdownTemplate);
            }
        });
    }

    connectedCallback() {
        this.startBtn.addEventListener("click",()=>{this.countDown()});
        this.resetBtn.addEventListener("click",()=>{this.resetCountdown()});
    }

    countDown() {
        if (this.timeLeft <= 0) return;

        this.timer = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.shadowRoot.querySelector("#countdown").textContent = this.timeLeft;
            } else {
                clearInterval(this.timer);
                this.timer = '';
            }
        }, 1000);
    }

    resetCountdown() {
        clearInterval(this.timer);
        this.timer = '';
        this.timeLeft = 5;
        this.shadowRoot.querySelector("#countdown").textContent = this.timeLeft;
    }

    getTemplateButtons() {
        return `
        <div>
            <button id="startButton">start</button>
            <button id="resetButton">reset</button> 
        </div>`;
    }

    _countdownTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
        <div>
            <h2 id="countdown">${this.timeLeft}</h2>
        </div>`
    }
}
*/
/*
customElements.define("countdown-timer-nope", CountdownTimerNope);
*/

/*
class CountdownTimer1 extends HTMLElement {

    constructor() {
        // Calls super() to inherit functionality from HTMLElement 
        super();

        // Creates a Shadow DOM for this component
        // mode: "open" allows external JS to access the Shadow DOM
        this.attachShadow({mode: "open"});
        // Retrieves the seconds attribute from the HTML tag (e.g. <countdown-timer seconds="20">)
        // If no seconds attribute is provided, it defaults to 10
        this.seconds = this.getAttribute("seconds") || 5; // maybe i don't need this, or at least have to modify it
        // this.timeLeft = this.seconds; initializes the countdown timer
        this.timeLeft = this.seconds;
        // Calls getCountdownTemplate() which returns the component's HTML structure and sets it inside the Shadow DOM
        this.shadowRoot.innerHTML = this.getCountdownTemplate();

        // Finds and stores references to Start, Pause, and Reset buttons inside the Shadow DOM
        // These buttons are used to control the countdown
        this.startBtn = this.shadowRoot.querySelector("#startButton");
        this.resetBtn = this.shadowRoot.querySelector("#resetButton");
    }

    // The connectedCallback() is a lifecycle method that is automatically called when the custom element is added to the document
    connectedCallback() {
        // Listens for a click on the Start button #startButton
        // When clicked t calls this.countDown(), which starts the countdown
        this.startBtn.addEventListener("click",()=>{this.countDown()});
        // Yknow
        // Calls this.resetCountdown() which resets the countdown to the initial time
        this.resetBtn.addEventListener("click",()=>{this.resetCountdown()});
    }

    // Starts the countdown timer when the Start button is clicked 
    countDown() {
        // Prevents the user from clicking the Start button multiple times while the countdown is running
        this.shadowRoot.querySelector('#startButton').disabled = true;
        // Creates a setInterval() loop that runs every  1000 milliseconds (1 sec)
        // This makes the countdown decrease every second
        this.countdownTimer = setInterval(()=>{
            
            // If timeLeft is greater than 0,... 
            if (this.timeLeft > 0) {
                //...it decreases the timer by 1 ...
                this.timeLeft--;
                //... and updates the element with id="timeLeft" in the Shadow DOM to display the updated countdown time
                this.shadowRoot.querySelector("#timeLeft").textContent = this.timeLeft;
            
            // When timeLeft reaches 0, it...
            } else {
                //... calls this.fireEvents("finishgame") that dispatches a custom event to notify other components that the countdown has finished 
                this.fireEvents("finishgame")
                // Stops the timer using clearInterval(this.countdownTimer), and clears the interval, preventing it from running indefinitely
                clearInterval(this.countdownTimer);
            }
        // Repeats the enclosed code every second (1000 millisec)
        // In this case, it reduces timeLeft by 1 every second and updates the displayed time
        }, 1000)

        // Calls this.fireEvents("startgame"), which notifies other parts of the application that the countdown has started
        this.fireEvents("startgame")
    }
    
    getCountdownTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
        <div>
            <h2>Ready?</h2>
            <p id="timeLeft">${this.timeLeft}</p>
            <div>
                <button id="startButton">start</button>
                <button id="resetButton">reset</button>
                <button id="pauseButton">pause</button>
            </div>
        </div>
        `
        return template.content;
    }
}
customElements.define("countdown-timer-old", CountdownTimer1);
*/


// Declares a class called CountdownComponent that extends HTMLElement ¨
// The export default means this class can be imported into other JS files
class CountdownComponent extends HTMLElement {

    // Runs when the element is created
    constructor() {
        // Calls super() to inherit functionality from HTMLElement 
        super();
        // Creates a Shadow DOM for this component
        // mode: "open" allows external JS to access the Shadow DOM
        this.attachShadow({mode: "open"});
        // Retrieves the seconds attribute from the HTML tag (e.g. <countdown-timer seconds="20">)
        // If no seconds attribute is provided, it defaults to 10
        this.seconds = this.getAttribute('seconds') || 10;
        // this.timeLeft = this.seconds; initializes the countdown timer
        this.timeLeft = this.seconds;
        // Calls getTemplateContent() which returns the component's HTML structure and sets it inside the Shadow DOM
        this.shadowRoot.innerHTML = this.getTemplateContent();
        // Finds and stores references to Start, Pause, and Reset buttons inside the Shadow DOM
        // These buttons are used to control the countdown
        this.startBtn = this.shadowRoot.querySelector("#startButton");
        this.pauseBtn = this.shadowRoot.querySelector("#pauseButton");
        this.resetBtn = this.shadowRoot.querySelector("#resetButton");
    }

    // The connectedCallback() is a lifecycle method that is automatically called when the custom element is added to the document
    connectedCallback() {
        // Listens for a click on the Start button #startButton
        // When clicked t calls this.countDown(), which starts the countdown
        this.startBtn.addEventListener("click",()=>{this.countDown()});
        // Listens for a click on the Pause button #pauseButton
        // Calls this.pauseCountdown() which pauses the countdown
        this.pauseBtn.addEventListener("click",()=>{this.pauseCountdown()});
        // Yknow
        // Calls this.resetCountdown() which resets the countdown to the initial time
        this.resetBtn.addEventListener("click",()=>{this.resetCountdown()});
    }

    // Starts the countdown timer when the Start button is clicked 
    countDown() {
        // Prevents the user from clicking the Start button multiple times while the countdown is running
        this.shadowRoot.querySelector('#startButton').disabled = true;
        // Creates a setInterval() loop that runs every  1000 milliseconds (1 sec)
        // This makes the countdown decrease every second
        this.countdownTimer = setInterval(()=>{
            
            // If timeLeft is greater than 0,... 
            if (this.timeLeft > 0) {
                //...it decreases the timer by 1 ...
                this.timeLeft--;
                //... and updates the element with id="timeLeft" in the Shadow DOM to display the updated countdown time
                this.shadowRoot.querySelector("#timeLeft").textContent = this.timeLeft;
            
            // When timeLeft reaches 0, it...
            } else {
                //... calls this.fireEvents("finishgame") that dispatches a custom event to notify other components that the countdown has finished 
                this.fireEvents("finishgame")
                // Stops the timer using clearInterval(this.countdownTimer), and clears the interval, preventing it from running indefinitely
                clearInterval(this.countdownTimer);
            }
        // Repeats the enclosed code every second (1000 millisec)
        // In this case, it reduces timeLeft by 1 every second and updates the displayed time
        }, 1000)

        // Calls this.fireEvents("startgame"), which notifies other parts of the application that the countdown has started
        this.fireEvents("startgame")
    }

    // Pauses the countdown timer when called
    // Allows the user to restart the timer by enabeling the Start button
    pauseCountdown() {
        // Stops the countdown by clearing the interval created in countDown()
        // This prevents timeLeft from continuing to decrease
        clearInterval(this.countdownTimer);
        // Calls fireEvents("stopgame") which dispatches a custom event to notify other parts of the app that the game has been paused
        this.fireEvents("stopgame") 
        // Re-enables the Start button, allowing the user to resume the countdown
        this.shadowRoot.querySelector('#startButton').disabled = false;
    }

    // Resets the countdown timer to its initial state
    resetCountdown() {
        // Stops the countdown if it's running by clearing the interval
        clearInterval(this.countdownTimer);
        // Resets timeLeft to the original value specified in the <countdown-timer> tag
        // If no seconds attribute is provided, it defaults to 10 seconds
        this.timeLeft = this.getAttribute('seconds') || 10;
        // Updates the countdown display in the Shadow DOM to reflect the reset time
        this.shadowRoot.querySelector("#timeLeft").textContent = this.timeLeft;
        // Calls fireEvents("resetgame") which notifies other parts of the application that the game has been reset
        this.fireEvents("resetgame")
        // Re-enables the Start button, allowing the user to start the coundown again
        this.shadowRoot.querySelector('#startButton').disabled = false;
    }

    // Returns the HTML structure for the countdown component 
    getTemplateContent() {
    // This returns a template string containing HTML
    // The component will use this HTML inside its shadow DOM when it's created
    // The p tag displays the remaining countdown time inside the p element 
    return `
        <div>
            <p id="timeLeft">${this.timeLeft}</p>
            <div>
                <button id="startButton">start</button>
                <button id="resetButton">reset</button>
                <button id="pauseButton">pause</button>
            </div>
        </div>
        `;
    }

    // Creates and dispatches a custom event to notify other parts of the application about changes in the countdown
    fireEvents(eventType) {
        //step 1 new custom event
            //name
            

            //payload
        //step 2 fire event to DOM
        // Creates a new Custom event...
        this.dispatchEvent(
        //... with the name eventType
        // The eventType is passed as an argument and could be "startgame", "stopgame", "resetgame" or "finishgame"
        // This allows different parts of the app to listen for these events and respond accordingly
        new CustomEvent(eventType, {
            // The event carries data (detail) with: ...
            //... seconds: the initial countdown time 
            detail: {seconds: this.seconds,
                    //... scondsLeft: the remaining time when the event is fired
                    secondsLeft: this.timeLeft
            },
            //Set bubbles to true to it is not constrained to the shadowDOM
            bubbles: true,
            //Added composed for it to be accessible outside shadowDOM
            composed: true
        }))}
    }

// Registers the CountdownComponent as a custom HTML element named <countdown-timer>
// customElements.define is a built-in browser AOI that allows you to create custom HTML elements
window.customElements.define("countdown-timer-older", CountdownComponent);
// This creates an instance of CountdownComponent which runs its constructor and starts managing its own Shadow DOM

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
/**/