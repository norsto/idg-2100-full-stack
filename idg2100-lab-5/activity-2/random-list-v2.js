/*const container = document.querySelector("#list-container");
const myList = ["apple", "pineapple", "pen"];
const betterRandomList = new BetterRandomList(myList, container);

function pullElement() {
    betterRandomList.pullElement();
}

function resetList() {
    betterRandomList.resetList();
}
*/

const stringList = ["apple", "pineapple", "pen"];

function getRandomElFromList(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomElement = list[randomIndex];
    return randomElement;
}

function getRandomElFromListAndRemove(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list.splice(randomIndex, 1);
}

function populateStaticList(stringList) {
    const ul = document.querySelector("#originalList");
    stringList.forEach(elem => {
        ul.insertAdjacentHTML('beforeend', `<li>${elem}</li>`);
    })
}

function pullElement() {
    const randomElem = getRandomElFromListAndRemove(stringList)
    const addElementToPulledList = getRandomElFromList();
    if(randomElem && randomElem.length()) addElementToPulledList(randomElem); //not defined or smtn
}

function resetList() {
    const ul = document.querySelector("#pulledList");
    ul.innerHTML = "";
}

populateStaticList(stringList);