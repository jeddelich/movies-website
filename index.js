// API key: 806b3177

const searchForm = document.getElementById("search__form");

// main function that is run

searchForm.addEventListener('submit', function(event) {
    
    // add class which will enable loading css

    // my important const and let variables
    const searchBar = document.getElementById("search-bar");
    let search = searchBar.value;

    // no website refresh on submit 
    event.preventDefault();

    // fetches movies by search
    setTimeout(() => {
        renderMovies(search)
    }, 1000)
});

/* 

functions used within main 

*/ 

async function renderMovies(search) {
    const moviesPromise = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=806b3177`);
    const moviesData = await moviesPromise.json()
    const firstSix = moviesData.Search.splice(0, 6)
    console.log(firstSix)
    moviesHTML(firstSix);

    // remove class that will disable loading css
};

function moviesHTML(firstSix) {
    const movieList = document.querySelector(".movie__list");
    movieList.innerHTML = null
    if (firstSix[5].Poster.status === 404) {
        console.log("testing")
    }
    else {
        console.log("failed")
    }
        
    for (i = 0; i < firstSix.length; i++) {

        if (firstSix[i].Poster === "N/A") {
            movieList.innerHTML += 
            `<div class="movie">
                <div class="movie__poster--wrapper">
                    <div class="movie__poster--unavailable">No Picture<br>In Database</div>
                </div>
                <div class="movie__description">
                    <div class="movie__title">${firstSix[i].Title}</div>
                    <div class="movie__details">
                        <div class="movie__year">${firstSix[i].Year}</div>
                        <div class="movie__rated">PG-13</div>
                    </div>
                </div>
            </div>`    
        }
        else {
            movieList.innerHTML += 
            `<div class="movie">
                <div class="movie__poster--wrapper">
                    <img src="${firstSix[i].Poster}" class="movie__poster">
                </div>
                <div class="movie__description">
                    <div class="movie__title">${firstSix[i].Title}</div>
                    <div class="movie__details">
                        <div class="movie__year">${firstSix[i].Year}</div>
                        <div class="movie__rated">PG-13</div>
                    </div>
                </div>
            </div>`
        }
    }
    
    const container = document.querySelector(".header__container");
    container.style.height = "fit-content";
}