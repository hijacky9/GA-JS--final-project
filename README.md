# JSR2021-04-21 GA-JS-final-project
# App Name: Popular Movie App 


## Why should I make it?
As a movie lover, the app user would like to get the the most popular movies from the themoviedb.org open API. I would like to see the rating of the movies and add favourites to my list which stores in the superbase, and can be retrieved by clicking on hearted button. 


## moviedb.org OPEN API 
TMDb offers a powerful API service that is free to use as long as you properly attribute us as the source of the data and/or images you use. You can find the logos for attribution here.
https://developers.themoviedb.org/3/movies/get-movie-details
https://developers.themoviedb.org/3/getting-started/introduction

## movie object
Anyone who is working on a programming project, especially if you want others to use it or contribute.
https://api.themoviedb.org/3/movie/508943?api_key=04c35731a5ee918f014970082a0088b1

{"adult":false,
"backdrop_path":"/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg",
"belongs_to_collection":null,"budget":0,
"genres":[{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"}],
"homepage":"https://www.disneyplus.com/movies/luca/7K1HyQ6Hl16P","id":508943,"imdb_id":"tt12801262",
"original_language":"en",
"original_title":"Luca",
"overview":"Luca and his best friend Alberto experience an unforgettable summer on the Italian Riviera. But all the fun is threatened by a deeply-held secret: they are sea monsters from another world just below the water’s surface.",
"popularity":5670.601,"poster_path":"/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
"production_companies":[{"id":2,
"logo_path":"/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
"name":"Walt Disney Pictures","origin_country":"US"},


{"id":3,"logo_path":"/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png","name":"Pixar","origin_country":"US"}],"production_countries":[{"iso_3166_1":"US","name":"United States of America"}],"release_date":"2021-06-17","revenue":11600000,"runtime":95,"spoken_languages":[{"english_name":"English","iso_639_1":"en","name":"English"},{"english_name":"Italian","iso_639_1":"it","name":"Italiano"}],"status":"Released","tagline":"","title":"Luca","video":false,"vote_average":8.2,"vote_count":1650}

## Movie API sort by popularity
Examples of JSON return is here 
https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8fbcfef472a62c3ed8f482719d13af10&page=1


## Feature 1: Dsiplay pupular movies
Display popular movies
Display next popular movie page

## Feature 2: Heart movies
Heart movies and stores in suparbase 

## Feature 3: Update movies by heart
Display movies hearted or not

## Feature 4: Search movie name
Search API to search movie names 