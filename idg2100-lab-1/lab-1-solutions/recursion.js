// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment

var minRatio;
var minRatioItems = [];

function checkH2Wratio(el){
	const bbox = el.getBoundingClientRect();
	if(bbox.width && bbox.height){
		const ratio = bbox.height / bbox.width;
		minRatio ??= ratio;
		if(ratio === minRatio){
			minRatioItems.push(el);
		}else if(ratio < minRatio){
			minRatioItems = [el];
			minRatio = ratio;
		}
	}
	// recursion
	for(let childEl of el.children){
		checkH2Wratio(childEl);
	}
}

checkH2Wratio(document.body);

console.log("minRatio:", minRatio, "minRatioItems", minRatioItems);

minRatioItems.forEach(el=>el.style.border="2px solid red");
