//HTML refererences
const searchField = document.getElementById("search-input");
const mainFlix = document.getElementById("movies-grid");
const flixForm =  document.querySelector("form");
const loadButton = document.querySelector("#load-more-movies-btn");
const backButton = document.querySelector("#close-search-btn");
const searchButton = document.querySelector("#searchBtn");



var offset = 0;
var currPage = 1;
let movie = "batman";
let initial = false;


//GLobal constants
const apiKey = "14584f09d70fd8607a6f5b56859b6a07"

function generateHTML(word,start){

    if(start){
        return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currPage}`;
    }
    else{
        return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${word}&page=${currPage}`;
    }
}

async function getMovies(word,start){
    let url = generateHTML(word,start);
    console.log(url);

    try{
        let response = await fetch(url);
        console.log("response is: ", response);
        let responseData = await response.json();
        console.log("responseData is: ", responseData);
        displayMovies(responseData);
        return responseData;
    }
    catch(e){
        console.log(e);
    }


}

flixForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    loadButton.classList.add("hidden");
    mainFlix.innerHTML= `<div id="holder">
        </div>  
    
    `
    
    initial = false;

    currPage = 1;
    movie = evt.target.searchBar.value;
    console.log(movie);
    getMovies(movie,false);
    searchField.value = "";
    loadButton.classList.remove("hidden");


    

})

function displayMovies(respData){
    respData.results.forEach(elem => {
        mainFlix.innerHTML += `<div class="movie-card">
           <div>
           <img src="https://image.tmdb.org/t/p/original/${elem.poster_path}" class="movie-poster" width="250" height="250"> 
           </div>
           <div>
           <p class="movie-title">${elem.original_title}</p>
           </div>
           <div>
           <p class="movie-votes>${elem.vote_average}</p>
           </div>
           </div>
        
        `


    })
    
}

loadButton.addEventListener("click", () =>{
    loadMore();
})

function loadMore(){
    console.log(movie);
    currPage++;
    let data = getMovies(movie,initial);
    console.log(data);
}


flixForm.addEventListener("reset", (evt) =>{
    evt.preventDefault();
    if(initial){
        return;
    }
    mainFlix.innerHTML= `<div id="movies-grid">
        </div>  
    
    `
    window.onload();

})

window.onload = function(){
    currPage = 1;
    initial = true;
    url = generateHTML("", true);
    console.log(url);
    getMovies("",true);
    loadButton.classList.remove("hidden");
}
