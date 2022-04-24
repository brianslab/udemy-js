const autoCompleteConfig = {
    // Define how to show each option in the list
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}"/>
            ${movie.Title} (${movie.Year})   
        `;
    },
    // Define what to do when the user selects an option
    onOptionSelect(movie) {
        onMovieSelect(movie);
    },
    // Extract the name of the option to the input box
    inputValue(movie) {
        return movie.Title;
    },
    // Make the api call to get data based on search
    async fetchData(searchTerm) {
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
    }
};

// Generate a dropdown menu lists populated with suggestions
// based on the user's input
createAutoComplete({
    ...autoCompleteConfig,
    // Pick where the list should be rendered
    root : document.querySelector('#left-autocomplete')
});
createAutoComplete({
    ...autoCompleteConfig,
    // Pick where the list should be rendered
    root : document.querySelector('#right-autocomplete')
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
