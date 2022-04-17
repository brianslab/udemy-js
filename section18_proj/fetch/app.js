fetch('https://swapi.dev/api/planets')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Status code error: ${response.status}`);
        } else {
            response.json().then((data) => {
                for (let planet of data.results) {
                    console.log(planet.name);
                }
            });
        }
    })
    // fetch will only catch errors due to connection failure, not 404 or 500
    .catch((err) => {
        console.log('ERROR with fetch');
        console.log(err);
    });
