const createAutoComplete = ({ root }) => {
    root.innerHTML = `
        <label><b>Search for a Movie</b></label>
        <input class="input"/>
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

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
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};
