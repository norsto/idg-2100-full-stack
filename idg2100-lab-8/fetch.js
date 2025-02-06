function init() {
    console.log("init");
    fetch('list.json')
        .then(response => response.json())
        .then(allLists => {
            let components = document.getElementsByTagName("random-list");
            console.log(allLists);
            allLists.map((list, index) => {
                console.log(`(${index}) list: $(list)`);
                if(index<components.length) {
                    components[index].setStaticList(list);
                }
            })
        })
}