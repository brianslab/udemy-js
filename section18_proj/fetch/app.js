fetch('https://swapi.dev/api/planets')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Status code error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('fetched first 10 planets');
        const filmURL = data.results[0].films[0];
        return fetch(filmURL);
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Status code error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('fetched first film of first planet');
        console.log(data.title);
    })
    // fetch will only catch errors due to connection failure, not 404 or 500
    .catch((err) => {
        console.log('ERROR with fetch');
        console.log(err);
    });
