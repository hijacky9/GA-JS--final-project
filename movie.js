//superbase 
const { createClient } = supabase
supabaseClient = createClient('https://egjmvmblnlwardrjogrb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDM1NzgwNCwiZXhwIjoxOTM5OTMzODA0fQ.GXp0tvRCpj5w3SwtHNc9ezZTDbtFX4ZcjtTT1a94RpY')

// API information.
let currentPage = 1;
const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
// Selecting our Elements.
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
/* call the showMovies function that requests the movie data from the Api using fetch.
 Then it puts those data in the main HTML tag by creating elments for those data. */
showMovies(apiUrl);

function showMovies(url) {
    //clear main element before fetch
    main.innerHTML = "";
    //fetch url into a promise
    fetch(url).then(res => res.json())
        .then(function (data) {
            data.results.forEach(element => {
                // Creating elemnts for our data inside the main tag. 
                // Each creation of the element will has its own element event listner
                const el = document.createElement('div');
                const image = document.createElement('img');
                const text = document.createElement('h2');
                const detail = document.createElement('p');
                //create heart button 
                const heart = document.createElement('button');

                //decalre detail default status
                let detailVisible = false;
                //declare hearted status 
                let hearted = false;

                // add a class for styling
                detail.className = "movie-detail";
                heart.className = "unhearted";
                //inline styling is assign css in js 
                detail.style['display'] = "none";
                text.innerHTML = `${element.title}`;
                detail.innerHTML = `Average Rating is ${element.vote_average}`;
                image.src = IMGPATH + element.poster_path;
                heart.innerHTML = "Heart";

                // appendChild makes it part of the document. Append the element to the existing elements
                el.appendChild(image);
                el.appendChild(text);
                el.appendChild(detail);
                el.appendChild(heart);
                main.appendChild(el);


                // seperate event listener for each movie element 
                // event listener to el
                image.addEventListener("click", (e) => {
                    detailVisible = !detailVisible;
                    // variable ? if true run the option 1, if false run the second option
                    detailVisible ? detail.style['display'] = "block" : detail.style['display'] = "none";
                    console.log(element);
                })


                //add heart button event listener
                heart.addEventListener("click", (e) => {
                    hearted = !hearted;
                    hearted ? heart.innerHTML = "unheart" : heart.innerHTML = "heart";
                    setHeart(element, hearted).then(() => {
                        console.log("success");
                    })
                })

                // this is run once the page is loaded 
                getHeart(element.id).then(function (result) {
                    hearted = result;
                    hearted ? heart.innerHTML = "unheart" : heart.innerHTML = "heart";
                    hearted ? heart.className = "hearted" : heart.className = "unheart";
                })
            });
        });
}

function nextPage() {
    ++currentPage;
    const newUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`;
    showMovies(newUrl);
}

// event listener on target propery is the event clicked 


// Prevent the Form from submitting if the search bar is empty.
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchTerm = search.value;
    /* Adding the value wriiten in the search bar to the search Api,
       in order to get the movies we search for. */
    if (searchTerm) {
        showMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});



// the following return a promises as these returns are in the future 
// function 1 Set - set a heart (add or remove)
async function setHeart(movie, hearted) {
    console.log();
    if (hearted) {
        return supabaseClient.from('Movie')
            .insert([{
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                release_date: movie.release_date,
                vote_average: movie.vote_average
            }])
            .then((results) => { return results.data[0]; });
    }
    else {
        return supabaseClient.from('Movie')
            .delete()
            .eq('id', movie.id)
            .then((results) => { return results.data[0]; });
    }
}

// function 2 Get - if is it already added
function getHeart(movieId) {
    let hearted = false;
    return new Promise((resolve) => {
        //call superbase if succeed, resolve true 
        supabaseClient
            .from('Movie')
            .select("*")
            .eq('id', movieId)
            .then((queryResponse) => {
                //the response might be empty, hence do not default it to true 
                resolve(queryResponse.data.length > 0);
            })
        // setTimeout(function callBack(){
        //     resolve(true)
        // },5000);
        // }
    })
}

// function 3 List - show me the full list of hearted, then create the html element
function showHearted() {
            main.innerHTML = '';
            return supabaseClient.from('Movie')
                .select('*')
                .then(function (response) {
                    console.log(response);
                    //return of the api can be in any object name, needs to reference the correct name 
                    response.data.forEach((row) => {
                        console.log(row);
                        const url = `https://api.themoviedb.org/3/movie/${row.id}?api_key=04c35731a5ee918f014970082a0088b1`

                        fetch(url).then(res => res.json())
                            .then(function (movieResponse) {

                                console.log(movieResponse);
                                //create elements
                                const el = document.createElement('div');
                                const image = document.createElement('img');
                                const text = document.createElement('h2');
                                const detail = document.createElement('p');
                                // display 
                                detail.style['display'] = "none";
                                text.innerHTML = `${movieResponse.title}`;
                                detail.innerHTML = `Average Rating is ${movieResponse.vote_average}`;
                                image.src = IMGPATH + movieResponse.poster_path;

                                //append child
                                el.appendChild(image);
                                el.appendChild(text);
                                el.appendChild(detail);
                                main.appendChild(el);
                            })

                    })
                })
        }