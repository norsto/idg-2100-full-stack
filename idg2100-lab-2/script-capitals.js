let countries = [];
//Holds the list of country data fetched from the API
let score = 0;
//Tracks the number of correct guesses made by the user, starts at 0

async function fetchCountries() {
//async function that fetches country data from the API usin fetch in the try bit
    const message = document.querySelector("#statusMessage");

    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        //the fetch bit

        if(!response.ok) {
        //if the response is not ok/correct it will throw the new error
            throw new Error("Failed to load countries");
        }

        countries = await response.json();
        //the data is parsed intp JSON and stored in the countries array

        startNewRound();
    } catch(err) {
    //Displays this error message if the network is down or the API is unreachable
        message.innerHTML = "It didn't work " + err;
    }
}
//when the data is successfully fetched and stored, the game begins with the startNewRound function

function startNewRound() {
//calls on getRandomCountry to select a random country
    const randomCountry = getRandomCountry();
    //selects the random country
    const countryName = randomCountry.name.common;
    //retrieves the country name and capital. 
    const correctCapital = randomCountry.capital ? randomCountry.capital[0] : null;
    //If a capital is not found, null is used.

    if (!correctCapital) {
        return startNewRound
        //skips countries without capitals and starts a new round
    }

    window.currentCapital = correctCapital;
    //correct capital is stored here for later comparison

    document.querySelector("#countryName").textContent = `What is the capital of ${countryName}?`;
    //Country name is dynamically displayed on the page where the element id is countryName
    document.querySelector("#feedback").textContent = "";
    //clears the feedback message to prepare for the next round of the game

    const options = new Set();
    //generate incorrect options
    while(options.size < 4) {
    //while adding 4 options--
        const randomOption = getRandomCountry().capital?.[0];
        //--select random capitals optios from the getRandomCountry function
        if(randomOption /*&& randomOption*/ !== correctCapital) {
        //if the options is not the correct capital, add it as an option
            options.add(randomOption);
        }
    }

    options.add(correctCapital);
    //add the correct option/capital

    const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);
    //Shuffles the options so the same button isn't always the correct option

    //document.querySelector("#capitalOptions label").textContent = `${window.}`;
    const optionsContainer = document.querySelector("#capitalOptions");
    optionsContainer.innerHTML = "";
    //clears previous options

    shuffledOptions.forEach(option => {
        const input = document.createElement("input");
        input.type = "button";
        input.name = "capital";
        input.value = option;
        input.classList.add("option");

        const label = document.createElement("label");
        label.appendChild(input);
        //label.appendChild(document.createTextNode(` ${option}`));

        optionsContainer.appendChild(label);

    });

    input.forEach(input => (input.checked = false));
    //clears the previous selections
}

function getRandomCountry() {
//generates a random index using Math.random() and retrieves the corresponding country from the countries array
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

function checkGuess() {
    const selectedOption = document.querySelector("input[name='capital']:checked");
    const feedback = document.querySelector("#feedback");
    const displayScore = document.querySelector("#score");

    if(!selectedOption) {
    //if an option is not selected--
        feedback.textContent = "Please select an option";
        //--the user will be asked to select one
        return;
    }

    const userGuess = selectedOption.value;
    const correctCapital = window.currentCapital;

    if(userGuess === correctCapital) {
        feedback.textContent = "Correct! Yay!";
        score++;
    } else {
        //if the answer isn't correct, the message below will display, and no points will be added to the score
        feedback.textContent = `Incorrect, it is ${window.currentCapital}.`;
        //displays the correct capital name that is saved in the currentCapital variable
    }

    displayScore.textContent = `Score: ${score}`;
    //displays the updated score

    setTimeout(startNewRound, 2000);
    //starts a new round after 2 seconds
}

/*
document.querySelector("#submit").addEventListener("click", checkGuess);
//submits the user's guess when they click on the submit button*/

document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    checkGuess();
});

window.onload = fetchCountries;
//runs the fetchCountries function when the page loads