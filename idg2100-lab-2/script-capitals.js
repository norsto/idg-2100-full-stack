let countries = [];
//Holds the list of country data fetched from the API
let score = 0;
//Tracks the number of correct guesses made by the user, starts at 0

/*
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
}*/
//when the data is successfully fetched and stored, the game begins with the startNewRound function

const fetchCountries = async(url) => {
    const message = document.querySelector("#statusMessage");

    try {
        const response = await fetch(url);
        //fetch the url

        if(!response.ok){
        //if the response is not ok/correct it will throw the new error
            throw new Error('Network issues');
        }
        countries = await response.json();
        //the data is parsed intp JSON and stored in the countries array
    } 
    catch(err) {
        //Displays this error message if the network is down or the API is unreachable
        message.innerHTML = "It didn't work " + err;
    }
}


function startNewRound() {
//calls on getRandomCountry to select a random country
    const randomCountry = getRandomCountry();
    //selects the random country
    const countryName = randomCountry.name.common;
    //retrieves the country name and capital. 
    const capital = randomCountry.capital ? randomCountry.capital[0] : null;
    //If a capital is not found, null is used.

    window.currentCapital = capital;
    //capital is stored here for later comparison

    document.querySelector("#countryName").textContent = `What is the capital of ${countryName}?`;
    //Country name is dynamically displayed on the page where the element id is countryName
    document.querySelector("#capitalGuess").value = "";
    //clears the input field so the user can type their next guess
    document.querySelector("#feedback").textContent = "";
    //clears the feedback message to prepare for the next round of the game
}

function getRandomCountry() {
//generates a random index using Math.random() and retrieves the corresponding country from the countries array
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

function checkGuess() {
//is called when the user clicks the submit button
    const userGuess = document.querySelector("#capitalGuess").value.trim().toLowerCase();
    //retrieves the user's guess from the input field and trims any whitespace and converts it to lowercase for case-insensitive comparison
    const correctCapital = window.currentCapital.toLowerCase();
    //compares the user's guess with the correct capital, also converted to lowercase

    const feedback = document.querySelector("#feedback");
    //selects the element with the id feedback and turns it into a cons for later use
    const displayScore = document.querySelector("#score");
    //selects the element with id score and turns it into a cons for later use

    if(userGuess === correctCapital) {
    //if the userGuess is strictly the same as the capital saved in the correctCapital variable--
        feedback.textContent = "Correct! Yay!";
        //--it will dispay the message in the html element saved in feedback, and display the message--
        score++;
        //--and add a point to the score
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

document.querySelector("#submit").addEventListener("click", checkGuess);
//submits the user's guess when they click on the submit button

window.onload = fetchCountries("https://restcountries.com/v3.1/all");
//runs the fetchCountries function when the page loads