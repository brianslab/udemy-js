const firstReq = new XMLHttpRequest();

firstReq.addEventListener('load', function () {
    console.log('First request worked!');
    const data = JSON.parse(this.responseText);
    const filmURL = data.results[0].films[0];
    const filmReq = new XMLHttpRequest();
    filmReq.addEventListener('load', function () {
        console.log('Second request worked!');
        console.log(JSON.parse(this.responseText));
    });
    filmReq.addEventListener('error', function () {
        console.log('ERROR!', e);
    });
    filmReq.open('GET', filmURL);
    filmReq.send();
    // for (let planet of data.results) {
    //     console.log(planet.name);
    // }
});
firstReq.addEventListener('error', () => {
    console.log('ERROR!');
});
firstReq.open('GET', 'https://swapi.dev/api/planets');
firstReq.send();

console.log('Request sent.');
