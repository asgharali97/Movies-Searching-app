// Movies Api
const APIURL =    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH =   "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// Selecting elements 
const box = document.querySelector(".box");
const search = document.querySelector('.search');
const searchResult = document.querySelector('.search-result')
//  Getting the movies data from api
const geData = async(api) =>{
     const response = await fetch(api)
     const data = await response.json()
     console.log(data);
     showMovies(data.results)
}

const showMovies = (data)=>{
    box.innerHTML = '';
    data.forEach(function(e) {
        const imagePath = e.poster_path === null ? 'https://image.tmdb.org/t/p/w1280/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' : IMGPATH + e.poster_path
        const element = document.createElement('div')
        element.classList.add('movies-card')
        element.innerHTML = `<div class="movies-card">
        <img src=${imagePath} alt="movie Banner"class='movie-img' >
        <div class="overlay">
            <div class="title">
                <h3>${e.title}</h3>
                <span>${e.vote_average}</span>
            </div>
            <p>${e.overview}</p>
        </div>
    </div>`
    box.appendChild(element)
    });
}

// EventListener
search.addEventListener('keydown',function(e){
   if(e.target.value !== ''){
    geData(SEARCHAPI+e.target.value)
    searchResult.innerHTML = `Search result for ${e.target.value}`
   }else{
    geData(APIURL)
   }
})

// Calling Api function
geData(APIURL)