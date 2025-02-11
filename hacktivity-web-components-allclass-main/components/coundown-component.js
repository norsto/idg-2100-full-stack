export default class CountdownComponent extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.seconds = this.getAttribute('seconds') || 10;
        this.timeLeft = this.seconds;
        // this.countdownTimer = this.countDown();
        this.shadowRoot.innerHTML = this.getTemplateContent();
        this.startBtn = this.shadowRoot.querySelector("#startButton");
        this.pauseBtn = this.shadowRoot.querySelector("#pauseButton");
        this.resetBtn = this.shadowRoot.querySelector("#resetButton");
    }

    connectedCallback(){
        this.startBtn.addEventListener("click",()=>{this.countDown()});
        this.pauseBtn.addEventListener("click",()=>{this.pauseCountdown()});
        this.resetBtn.addEventListener("click",()=>{this.resetCountdown()});
    }

    countDown(){
        this.shadowRoot.querySelector('#startButton').disabled = true;
        this.countdownTimer = setInterval(()=>{
            
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.shadowRoot.querySelector("#timeLeft").textContent = this.timeLeft;
                
            } else {
                this.fireEvents("finishgame")
                clearInterval(this.countdownTimer);

            }
        
        }, 1000)

        this.fireEvents("startgame")

    }

    pauseCountdown(){
        clearInterval(this.countdownTimer);
        this.fireEvents("stopgame")
        this.shadowRoot.querySelector('#startButton').disabled = false;
        
    }

    resetCountdown(){
        clearInterval(this.countdownTimer);
        this.timeLeft = this.getAttribute('seconds') || 10;
        this.shadowRoot.querySelector("#timeLeft").textContent = this.timeLeft;
        this.fireEvents("resetgame")
        this.shadowRoot.querySelector('#startButton').disabled = false;
    }

    getTemplateContent(){
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

    fireEvents(eventType){
        //step 1 new custom event
            //name
            

            //payload
        //step 2 fire event to DOM
        this.dispatchEvent(
        new CustomEvent(eventType, {
            detail: {seconds: this.seconds,
                    secondsLeft: this.timeLeft
            },
            //Set bubbles to true to it is not constrained to the shadowDOM
            bubbles: true,
            //Added composed for it to be accessible outside shadowDOM
            composed: true
        }))}
    }

window.customElements.define("countdown-timer", CountdownComponent);