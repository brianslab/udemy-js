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

    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const suggestion = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        suggestion.classList.add('dropdown-item');
        suggestion.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}    
        `;

        resultsWrapper.appendChild(suggestion);
    }
};

input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (event) => {
    if (!finder.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});
