/* Race Track (<race-track)
Manages the race logic and listens to horse movements.

Functionality:
Waits for the race-start event before allowing horses to move.
Tracks each horse’s progress and detects when the first horse crosses the finish line.
Announces the winner and stops the race.
Slot Support:
<race-horse> components can be slotted inside <race-track> as children, allowing flexible horse management within the track.
Events:
race-finished: Emitted when a horse wins, with the payload containing the name of the winner's horse and any additional information needed.
*/

class RaceTrack extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML = this.racetrackTemplate();
        
    }

    racetrackTemplate() {
        return `
        <style>
        .raceTrack {
            position: relative; 
            background-color: #E7D4B5;
            width: 60vw;
            min-width: 300px;
            max-width: 1000px;
            height: 150px;
            padding: 0 20px;
        }
        </style>

        <div class="raceTrack">
            <slot></slot>
        </div>       
        `;
    }

    addEventListener() {

    }
}

customElements.define("race-track", RaceTrack);