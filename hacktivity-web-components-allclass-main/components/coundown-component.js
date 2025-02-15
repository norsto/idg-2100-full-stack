// Declares a class called CountdownComponent that extends HTMLElement 
// The export default means this class can be imported into other JS files
export default class CountdownComponent extends HTMLElement {

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
            //Set bubbles to true so it is not constrained to the shadowDOM
            bubbles: true,
            //Added composed for it to be accessible outside shadowDOM
            composed: true
        })
        )}
    }

// Registers the CountdownComponent as a custom HTML element named <countdown-timer>
// customElements.define is a built-in browser AOI that allows you to create custom HTML elements
window.customElements.define("countdown-timer", CountdownComponent);
// This creates an instance of CountdownComponent which runs its constructor and starts managing its own Shadow DOM