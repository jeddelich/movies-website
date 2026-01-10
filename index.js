// my key: 806b3177
// http://www.omdbapi.com/?apikey=[806b3177]&

async function renderMovies(id) {
    const moviesPromise = await fetch('http://www.omdbapi.com/?i=' + id + '&apikey=806b3177');
    const moviesData = await moviesPromise.json()
};

renderMovies('tt1285016');

// search bar (variables)

const search = document.getElementById("search-bar")
const form = document.getElementById("search-bar__form")

// no refresh on the submit button 

form.addEventListener('submit', function(event) {
    event.preventDefault()
})