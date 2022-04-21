const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params : {
            apikey : 'e823d88e',
            s      : searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

const input = document.querySelector('input');

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    for (let movie of movies) {
        const div = document.createElement('div');

        div.innerHTML = `
            <h1>${movie.Title}</h1>    
            <img src="${movie.Poster}"/>
        `;

        document.querySelector('#target').appendChild(div);
    }
};

input.addEventListener('input', debounce(onInput, 500));
