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

const finder = document.querySelector('.autocomplete');
finder.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

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
