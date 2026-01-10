// API key: 806b3177

const searchForm = document.getElementById("search__form");

searchForm.addEventListener('submit', function(event) {
    
    // my important const and let variables
    const searchBar = document.getElementById("search-bar");
    let search = searchBar.value;

    // no website refresh on submit 
    event.preventDefault();

    // fetches movies by search
    renderMovies(search)
});

async function renderMovies(search) {
    const moviesPromise = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=806b3177`);
    const moviesData = await moviesPromise.json()
    const firstSix = moviesData.Search.splice(0, 6)
    console.log(firstSix)
};