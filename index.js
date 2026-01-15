// API key: 806b3177

const searchForm = document.getElementById("search__form");
const spinner = document.querySelector(".fa-spinner");
const container = document.querySelector(".header__container");
const movieList = document.querySelector(".movie__list");
const header = document.querySelector(".welcome");
const background = document.querySelector(".background__img");
const navLinks = document.querySelectorAll(".nav__link--1");
const navLinkHome = document.querySelector(".nav__link--2");
const width = document.body.scrollWidth + 15
let movieArray = [];
let releaseDates = [];

searchForm.addEventListener("submit", function (event) {
  // my important const and let variables
  const searchBar = document.getElementById("search-bar");
  let search = searchBar.value;

  // no website refresh on submit
  event.preventDefault();

  renderMovies(search);
});

/* 

functions used within main 

*/

async function renderMovies(search) {
  // loading state initiated
  spinner.classList += " loading";
  container.classList += " move-forward";
  movieList.style.opacity = 0;
  header.style.visibility = "hidden";
  scrollBarFloatUp();
  background.style.display = "none";
  navLinks[0].style.display = "none";
  navLinks[1].style.display = "none";

  const moviesPromise = await fetch(
    `https://www.omdbapi.com/?s=${search}&apikey=806b3177`
  );
  const moviesData = await moviesPromise.json();
  const firstSix = moviesData.Search.splice(0, 6);

  movieArray = [];

  calculateRuntimes(firstSix);
  reformatReleaseDates(firstSix);

  setTimeout(() => {
    moviesHTML(firstSix, movieArray);
  }, 1000);
}

function moviesHTML(firstSix, movieArray) {
  spinner.classList.remove("loading");
  container.classList.remove("move-forward");
  movieList.style.opacity = 1;

  movieList.innerHTML = null;

  for (let i = 0; i < firstSix.length; i++) {
    if (firstSix[i].Poster === "N/A") {
      movieList.innerHTML += `<div class="movie">
                <div class="movie__poster--wrapper">
                    <div class="movie__poster--unavailable">No Picture<br>In Database
                        <i class="fa-solid fa-face-sad-cry"></i>
                    </div>
                </div>
                <div class="movie__description">
                    <div class="movie__title movie__title--${i}">${firstSix[i].Title}</div>
                    <div class="movie__details">
                        <div class="movie__year">${firstSix[i].Year}</div>
                        <div class="movie__rated">${movieArray[i]}</div>
                    </div>
                </div>
            </div>`;
    } else {
      movieList.innerHTML += `<div class="movie">
                <div class="movie__poster--wrapper">
                    <img src="${firstSix[i].Poster}" class="movie__poster">
                </div>
                <div class="movie__description">
                    <div class="movie__title movie__title--${i}">${firstSix[i].Title}</div>
                    <div class="movie__details">
                        <div class="movie__year">${firstSix[i].Year}</div>
                        <div class="movie__rated">${movieArray[i]}</div>
                    </div>
                </div>
            </div>`;
    }
  }
  titleWrap(firstSix);
  navLinkHome.style.display = "flex";
  container.style.height = "fit-content";
}

// fetches the length of the movies using the i= given by the fetched s=

async function calculateRuntimes(firstSix) {
  for (let i = 0; i < firstSix.length; i++) {
    const movieId = firstSix[i].imdbID;
    const moviesPromise2 = await fetch(
      `https://www.omdbapi.com/?i=${movieId}&apikey=806b3177`
    );
    const movieData2 = await moviesPromise2.json();
    const movieDataNumbers = movieData2.Runtime.replace(" min", "");

    // formats to hours and minutes

    if (Number(movieDataNumbers) > 119) {
      const hours = Math.floor(movieDataNumbers / 60);
      const minutes = movieDataNumbers % 60;
      const time = hours + " hrs " + minutes + " mins";
      movieArray.push(time);
    } else if (Number(movieDataNumbers) > 59) {
      const hours = Math.floor(movieDataNumbers / 60);
      const minutes = movieDataNumbers % 60;
      const time = hours + " hr " + minutes + " mins";
      movieArray.push(time);
    } else if (movieDataNumbers === "N/A") {
      movieArray.push("tv series");
    } else {
      const time2 = movieDataNumbers + " mins";
      movieArray.push(time2);
    }
  }
}

function reformatReleaseDates(firstSix) {
  for (let i = 0; i < firstSix.length; i++) {
    if (firstSix[i].Year[firstSix[i].Year.length - 1] === "–") {
      firstSix[i].Year = firstSix[i].Year + "current";
    }
  }
}

function titleWrap(firstSix) {
  for (let i = 0; i < firstSix.length; i++) {
    if (firstSix[i].Title.length >= 50) {
      currentTitleClass = document.querySelector(`.movie__title--${i}`);
      console.log(currentTitleClass);
      currentTitleClass.style.maxWidth = "275px";
    } else if (firstSix[i].Title.length >= 42) {
      currentTitleClass = document.querySelector(`.movie__title--${i}`);
      console.log(currentTitleClass);
      currentTitleClass.style.maxWidth = "225px";
    } else if (firstSix[i].Title.length >= 35) {
      currentTitleClass = document.querySelector(`.movie__title--${i}`);
      console.log(currentTitleClass);
      currentTitleClass.style.maxWidth = "200px";
    }
  }
}

function scrollBarFloatUp () {
  if (width < 768) {
    searchForm.style.top = "-58px";
  }
  else {
    searchForm.style.top = "-64px";    
  }
}