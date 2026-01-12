// API key: 806b3177

const searchForm = document.getElementById("search__form");
const spinner = document.querySelector(".fa-spinner");
const container = document.querySelector(".header__container");
const movieList = document.querySelector(".movie__list");


// main function that is run

searchForm.addEventListener('submit', function(event) {

    // my important const and let variables
    const searchBar = document.getElementById("search-bar");
    let search = searchBar.value;

    // no website refresh on submit 
    event.preventDefault();

        renderMovies(search)
});

/* 

functions used within main 

*/ 

async function renderMovies(search) {
    // loading state initiated
    spinner.classList += " loading"  
    container.classList += " move-forward"
    movieList.style.opacity = 0;
    
    const moviesPromise = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=806b3177`);
    const moviesData = await moviesPromise.json()
    const firstSix = moviesData.Search.splice(0, 6)  
    console.log(firstSix)

    setTimeout(() => {
    moviesHTML(firstSix);
    }, 1000)
};

function moviesHTML(firstSix) {
   
    spinner.classList.remove ("loading") 
    container.classList.remove ("move-forward") 
    movieList.style.opacity = 1;  

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
    
    container.style.height = "fit-content";
}