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
        suggestion.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        });

        resultsWrapper.appendChild(suggestion);
    }
};

input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (event) => {
    if (!finder.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});

const onMovieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params : {
            apikey : 'e823d88e',
            i      : movie.imdbID
        }
    });

    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primarty">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primarty">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primarty">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primarty">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primarty">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
            `;
};
