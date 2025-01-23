/*Student Activity
Consider the following example:
    ["pen", "pineapple", "apple"]
        user clicks button and pulls "apple" 
    ["pinapple", "pen"]
        User clicks button and pulls "pineapple"
    ["pen] 
        User clicks button and pulls "pen"*/

//hardcoded array 
const ppap = ["pen", "pineapple", "apple"];

//existig ul node
const ulNode = document.querySelector("#list");

//const liNode = document.createElement("li");

/*
ulNode.appendChild(liNode);
document.querySelector("#pulledElements").appendChild(liNode);

function clicked() {
    document.querySelector("#click").value  
}

Math.floor(Math.random() * 10);*/

/*
ppap.forEach(function(word) {
    ulNode.appendChild(liNode);
    document.querySelector("#pulledElements").appendChild(liNode);
    console.log(word);
});*/

//append = legge til

ppap.forEach(function(item) {
    //creates a new li element
    const li = document.createElement("li");
    //set the text content to the current item
    li.textContent = item;
    //append the li to the ul
    ulNode.appendChild(li);
    //console.log(item);
});

ppap.splice();