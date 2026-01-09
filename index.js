// my key: 806b3177
// http://www.omdbapi.com/?apikey=[806b3177]&

async function renderMovies(id) {
    const moviesPromise = await fetch('http://www.omdbapi.com/?i=' + id + '&apikey=806b3177');
    const moviesData = await moviesPromise.json()
    console.log(moviesData);
};

renderMovies('tt1285016');