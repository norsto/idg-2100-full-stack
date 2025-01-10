/*Recursion
without using querySelectAll or similar methods
find all elements with the lowest height to width ratio (but > 0)
    run your script in a browser (e.g. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment)
highlight the elements with a red border*/


var minRatio;
var minRationItems = [];

function checkHeitghtToWidthRatio(el) {
    //boundingbox
    const bbox = el.getBoundingClientRect();
    if(bbox.width > 0 && bbox.height) {
        const ratio = bbox.height / bbox.widthM;
        minRation ??= ratio;
        if(ratio === minRatio){

        } else if(ratio < minRatio) {
            minRatioItems = [el
            ];
            minRatio = ratio;
        }
    }
    //recursion
    for(let childEl of el.children) {
        checkHeitghtToWidthRatio(childEl);
    }
}

checkHeitghtToWidthRatio(document.body);

console.log("minRatio: ", minRatio, "minRatioItems: ", minRationItems);

//minRatioItems.forEach