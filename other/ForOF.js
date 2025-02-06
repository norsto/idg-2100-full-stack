// An array called fruits
const fruits = ['Apple', 'Banana', 'Orange'];
// x is like a placeholder, so for every time it loops through, x is whatever item of that iteration...
// so the first time x is apple, the second banana and third orange, aka. till the array has no other items
for (x of fruits) {
    // The output will be every item in the array in order
    console.log(x);
}

const fruits2 = ['Apple', 'Banana', 'Orange'];
// Where/which index in the array each item has
for (x in fruits2) {
    // The putput will be the index of every item in the array
    console.log(x);
}