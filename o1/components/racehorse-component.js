/*Race Horse (<race-horse>)
Represents a racing horse and moves based on key presses.

Attributes:
horsename: The name of the horse.
key: The assigned key to move the horse.
(*) consider adding additional attributes to control control exactly how the horse will be displayed giving the user absolute control of how the horse will look like (e.g.: 🏇 vs 😪 )
Functionality:
Waits for the race-start event before responding to key presses.
Moves forward (a predefined fixed amount of pixels) when the assigned key is pressed.
Stops moving when the race finishes.
Move to the start line according to the gameplay described in previous sections.
Displays:
A horse emoji (🏇) or a similar visual representation.
The horse’s name for easy identification.
The assigned key, so players know which key to press to move their horse.
Make sure the horse display is visually appealing and well-designed. Also, notice the horse must somehow be able to inform other components that it has moved and its exact position every time it does it (the <race-track> component will need this information to handle the game logic).
*/

/* old
class RaceHorse extends HTMLElement {
    static horseCounter = 0; 
    static horseData = [["horsy", "hamanda", "roach"], ["a", "g", "l"]]; 
    static listenerAdded = false;
    static startInterval = false;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        let horseName = RaceHorse.horseData[0][RaceHorse.horseCounter];
        let horseKey = RaceHorse.horseData[1][RaceHorse.horseCounter];

        this.shadowRoot.innerHTML = this.horseTemplate(horseName, horseKey);

        this.horseElement = this.shadowRoot.querySelector(".raceHorse");
        this.horseElement.dataset.key = horseKey;

        RaceHorse.horseCounter++; 

    }

    static handleKeyPress(event) {
        document.querySelectorAll("race-horse").forEach(horse => {
            let horseElem = horse.shadowRoot.querySelector(".raceHorse");

            if (event.key.toLowerCase() === horseElem.dataset.key) {
                let currentLeft = parseInt(horseElem.style.left || 0);
                horseElem.style.left = `${currentLeft + 1}%`;
            }
        });
    }

    connectedCallback() {
        //Did interval already start?
        if (!RaceHorse.startInterval){
            RaceHorse.startInterval = true;
            this.waitForGo = setInterval(() => {
                //Get the attribute from countdown-html-tag
                const countdown = document.querySelector("#countdownTimer").getAttribute("seconds");
                console.log(countdown); 
                if(countdown == 0){
                    clearInterval(this.waitForGo);
                    if (!RaceHorse.listenerAdded) {
                        document.addEventListener("keyup", RaceHorse.handleKeyPress);
                        RaceHorse.listenerAdded = true;
                    }
                }
            }, 500);
        } else {
            return;
        }
    }

    horseTemplate(name, key) {
        return `
        <style>
            .raceHorse {
                position: relative;
                left: 0;
                width: 30px;
                height: 30px;
                font-size: 30px;
                transform: scaleX(-1);
                transition: left 0.1s ease-out;
            }
        </style>

        <p class="raceHorse" data-name="${name}" data-key="${key}">🏇</p>
        `;
    }
}

customElements.define("race-horse", RaceHorse);
*/

class RaceHorse extends HTMLElement {
    static horseCounter = 0; 
    static horseData = [["horsy", "hamanda", "roach"], ["a", "g", "l", "c", "n"]]; 
    static listenerReadySetGo = false;
    static listenerHorseStartRunning = false;
//  static startInterval = false;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        let horseName = RaceHorse.horseData[0][RaceHorse.horseCounter];
        let horseKey = RaceHorse.horseData[1][RaceHorse.horseCounter];

        this.shadowRoot.innerHTML = this.horseTemplate(horseName, horseKey);

        this.horseElement = this.shadowRoot.querySelector(".raceHorse");
        this.horseElement.dataset.key = horseKey;

        RaceHorse.horseCounter++; 
    }

    static handleKeyPress(event) {
        document.querySelectorAll("race-horse").forEach(horse => {
            let horseEmoji = horse.shadowRoot.querySelector(".raceHorse");

            if (event.key.toLowerCase() === horseEmoji.dataset.key) {
                let currentLeft = parseInt(horseEmoji.style.left || 0);
                
                if (currentLeft < 100){
                    horseEmoji.style.left = `${currentLeft + 5}%`;
                };

                if (currentLeft >= 100) {
                    document.removeEventListener("keyup", RaceHorse.handleKeyPress);

                    horse.fireEvent("race-finished");
                };

                document.addEventListener("race-reset", () => {
                    document.removeEventListener("keyup", RaceHorse.handleKeyPress);
                    RaceHorse.listenerReadySetGo = false;
                    RaceHorse.listenerHorseStartRunning = false;
                    horse.resetEventListeners();
                    horseEmoji.style.left = `${0}%`;
                })
            }
        });
    }

    connectedCallback(){

        if (!RaceHorse.listenerReadySetGo){
            RaceHorse.listenerReadySetGo = true;
            document.addEventListener("race-start", (event)=> {
                if (!RaceHorse.listenerHorseStartRunning){
                    RaceHorse.listenerHorseStartRunning = true;

                    document.addEventListener("keyup", RaceHorse.handleKeyPress);
                }
            })
        }
    }

    resetEventListeners() {
        if (!RaceHorse.listenerReadySetGo){
            RaceHorse.listenerReadySetGo = true;
            document.addEventListener("race-start", (event)=> {
                if (!RaceHorse.listenerHorseStartRunning){
                    RaceHorse.listenerHorseStartRunning = true;

                    document.addEventListener("keyup", RaceHorse.handleKeyPress);
                }
            });
        }
    }

    fireEvent() {
        this.dispatchEvent(
            new CustomEvent("race-finished", {
                detail: {
                    winner: this.horseElement.dataset.name,
                    key: this.horseElement.dataset.key
                },
                bubbles: true,
                composed: true
            })
        );
    }

    horseTemplate(name, key) {
        return `
        <style>
            .raceHorse {
                position: relative;
                left: 0;
                width: 30px;
                height: 30px;
                font-size: 30px;
                transform: scaleX(-1);
                transition: left 0.1s ease-out;
            }
        </style>

        <p class="raceHorse" data-name="${name}" data-key="${key}">🏇</p>
        `;
    }
}

customElements.define("race-horse", RaceHorse);