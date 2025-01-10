/*Promises
https://aliaksem.folk.ntnu.no/resourceUrls.txt 
find URLs that 
    responded first
    loaded first
    loaded last
    total time to load for all URLs*/

/*
fetch("https://aliaksem.folk.ntnu.no/resourceUrls.txt");

const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success!");
    }, 250);
});
*/

fetch("https://aliaksem.folk.ntnu.no/resourceUrls.txt", {header: {"Content-type": "pal"}})
    .then(resp=>resp.text())
    .then(txt=>{
        const urls = txt.split("\n");
        timeIt("RACE", urls, findResponded1st);
        timeIt("ANY", urls, slowest);
        timeIt("ALLSETTLED", urls, getTotalTime);
        timeIt("ASYNCAWAIT", urls, );
    });


function timeIt(label, urls, fAsync) {
    const tStart = performance.now();
    return fAsync(urls)
        .then(fasyerUrl=>{
            const tEnd = performance.now();
            const t = Math.round(tEnd - tStart) * 1000 / 1000;
            console.log(`${label}, time: ${t} info ${info}`);
        });
}

function findResponded1st(urls) {
    const promiseArr = urls.map(url=>fetch(url).catch(()=>Promise.resolve({status: 404, url})));
    return Promise
        .any 
        .then
}

function slowest(urls) {
    let output = "";
    const promiseArr = urls.map(url=>fetch(url).then(resp=>{
        output
    }));
    return promise
}

async function getTotalTime(urls) {
    //findResponded1st(let url of urls)
}