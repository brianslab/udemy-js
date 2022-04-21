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
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const suggestion = document.createElement('a');

        suggestion.classList.add('dropdown-item');
        suggestion.innerHTML = `
            <img src="${movie.Poster}"/>
            ${movie.Title}    
        `;

        resultsWrapper.appendChild(suggestion);
    }
};

input.addEventListener('input', debounce(onInput, 500));
