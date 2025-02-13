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

/*
class RaceHorse extends HTMLElement {
    constructor() {
        super();
        this.horseName = this.getAttribute("name");
        this.horseKey = this.getAttribute("key");
        
        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML = this.horseTemplate();

        this.position = { x: 0 };

//        this.horseData = [["horsy", "hamanda", "roach"], ["a", "g", "l"]];
        this.horseElement = this.shadowRoot.querySelector(".raceHorse");
    }

    connectedCallback() {
        document.addEventListener("keyup", this.handleKeyDown.bind(this));
        const index = Array.from(document.querySelectorAll("race-horse")).indexOf(this);
                
        this.horseElement.style.top = `${index * 50}px`; // Adjust spacing as needed
        this.horseElement.style.left = `0px`; // Start at the left edge
    }

    disconnectedCallback() {
        document.removeEventListener("keyup", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        const keyBindings = {"a": 0, "g": 1, "l": 2};

        const index = Array.from(document.querySelectorAll("race-horse")).indexOf(this);

        if (Object.keys(keyBindings).includes(event.key) && keyBindings[event.key] === index) {
            this.position.x += 10;
            this.updateHorsePosition();
        }
    }

    updateHorsePosition() {
        this.horseElement.style.left = `${this.position.x}px`;
    }

    horseTemplate() {
        return `
        <style>
            .raceHorse {
                position: absolute;
                width: 20px;
                height: 20px;
                font-size: 20px;
                margin-bottom: 20px;
                transform: scaleX(-1);
            }
        </style>

        <p class="raceHorse">🏇</p>
        `;
    }
}

customElements.define("race-horse", RaceHorse);
*/

/*

let horseCounter = 0;

class RaceHorse extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        let horseData = [["horsy", "hamanda", "roach"], ["a", "g", "l"]];

        let horseName = horseData[0][horseCounter];
        let horseKey = horseData[1][horseCounter];

        this.shadowRoot.innerHTML = this.horseTemplate(horseName, horseKey);

        this.horseElement = this.shadowRoot.querySelector(".raceHorse");


        this.horseElement.dataset.key = horseKey;

        horseCounter++; 


        if (!RaceHorse.listenerAdded) {
            document.addEventListener("keyup", RaceHorse.handleKeyPress);
            RaceHorse.listenerAdded = true;
        }
    }

    static handleKeyPress(event) {
        document.querySelectorAll("race-horse").forEach(horse => {
            let horseElem = horse.shadowRoot.querySelector(".raceHorse");

            if (event.key.toLowerCase() === horseElem.dataset.key) {
                let currentLeft = parseInt(getComputedStyle(horseElem).left || 0);
                horseElem.style.left = `${currentLeft + 10}px`;
            }
        });
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

        <p class="raceHorse" name="${name}" key="${key}">🏇</p>
        `;
    }
}

customElements.define("race-horse", RaceHorse);

*/

/*
class RaceHorse extends HTMLElement {
    static horseCounter = 0; 
    static horseData = [["horsey", "hamanda", "roach"], ["a", "g", "l"]]; 
    static listenerAdded = false;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        let horseName = RaceHorse.horseData[0][RaceHorse.horseCounter];
        let horseKey = RaceHorse.horseData[1][RaceHorse.horseCounter];

        this.shadowRoot.innerHTML = this.horseTemplate(horseName, horseKey);

        this.horseElement = this.shadowRoot.querySelector(".raceHorse");
        this.horseElement.dataset.key = horseKey;

        RaceHorse.horseCounter++; 

        if (!RaceHorse.listenerAdded) {
            document.addEventListener("keyup", RaceHorse.handleKeyPress);
            RaceHorse.listenerAdded = true;
        }
    }

    static handleKeyPress(event) {
        document.querySelectorAll("race-horse").forEach(horse => {
            let horseElem = horse.shadowRoot.querySelector(".raceHorse");

            if (event.key.toLowerCase() === horseElem.dataset.key) {
                let currentLeft = parseInt(getComputedStyle(horseElem).left || 0);
                horseElem.style.left = `${currentLeft + 10}px`;
            }
        });
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

    connectedCallback(){
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
        }else{
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