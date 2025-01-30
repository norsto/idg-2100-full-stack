
fetch("https://aliaksem.folk.ntnu.no/resourceUrls.txt", {header: {"Content-Type": "plain/text"}})
	.then(resp=>resp.text())
	.then(txt=>{
		const urls = txt.split("\n");
		timeIt("RACE", urls, findResponded1st);
		timeIt("ANY", urls, findLoadedSuccessfully1st);
		timeIt("ALLSETTLED", urls, findLoadedSuccessfullyLast);
		timeIt("ASYNCAWAIT", urls, getTotalTime);
	});

function timeIt(label, urls, fAsync){
	const tStart = performance.now();
	return fAsync(urls)
		.then(info=>{
			const tEnd = performance.now();
			const t = Math.round((tEnd - tStart) * 1000) / 1000;
			console.log(`${label}, time: ${t} info: ${info}`);
		});
}

function findResponded1st(urls){
	const promiseArr = urls.map(url=>fetch(url).catch(()=>Promise.resolve({status: 404, url})));
	return Promise
		.race(promiseArr)
		.then(resp=>resp.status + " " + resp.url);
}

function findLoadedSuccessfully1st(urls){
	const promiseArr = urls.map(url=>fetch(url));
	return Promise
		.any(promiseArr)
		.then(resp=>resp.status + " " + resp.url);
}

function findLoadedSuccessfullyLast(urls){
	let output = "";
	const promiseArr = urls.map(url=>fetch(url).then(resp=>{
		output = resp.status + " " + resp.url;
	}));
	return Promise
		.allSettled(promiseArr)
		.then(()=>output);
}

async function getTotalTime(urls){
	for(let url of urls){
		try{
			await fetch(url);
		}catch(e){
			// don't do anything here
		}
	}
	return "all URLs sequentially";
}
