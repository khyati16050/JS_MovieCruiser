let moviesArray = [];
let favouriteMoviesArray = [];
function getMovies() {
	return fetch('http://localhost:3000/movies').then(
		response =>{
		  if(response.ok){         
				  return response.json();          
		  }
		  else{
			  return Promise.reject("Dummy error");
		  } }).then(response => 
			{			
			moviesArray = response;  
			let myList = document.querySelector("#moviesList");
			let movString = "";	
			moviesArray.forEach(mov => {
			// 	let button = document.createElement("input");
			// button.setAttribute("value","Add to favourite");
			// button.setAttribute("type","button");
			// button.addEventListener("click",() => {
			// 	addFavourite(movie.id);
			// })
			// var item = document.createElement("li");
			// item.appendChild(document.createTextNode(`$(mov.title`));
			// item.appendChild(button);
			// myList.appendChild(item);

				//console.log(mov.id)

			movString += `Id<li>${mov.id}</li>Title<li>${mov.title}</li>Poster<li>'${mov.posterPath}</li>
       		<li><button class='button' onclick='addFavourite(${mov.id})'>AddToFavourites</button></li>
		`
			});
  
			myList.innerHTML = movString;
			  	return response;
	  		}).catch(err => {
				return err;
			})
	}

function getFavourites() {
	return fetch('http://localhost:3000/favourites').then(response =>
	{
		  if(response.ok){         
				  return response.json();          
		  }
		else{
			  return Promise.reject("Dummy Error");
		  }}).then(response => 
		{
			favouriteMoviesArray = response;  
			let favList = document.querySelector("#favouritesList");
			let favString = "";	
			
			favouriteMoviesArray.forEach(mov => {
				//console.log(mov.title);
			 favString += `Id<li>${mov.id}</li>
			  <li>${mov.title}</li>
			  <li>${mov.posterPath}</li>`
		
		});
  
		favList.innerHTML = favString;
			return response;
		}).catch(err => {
			return err;
		})
	  
}

function addFavourite(id) 
{
	//first get id from movieList
	var movie = checkMovie(id);
	//check id in favourite movies, if exists then reject	
	var alreadyExists = checkFavMovie(movie.id);
	
	if(alreadyExists==true)
	 {
        return Promise.reject(new Error("Movie is already added to favourites"));
	}
	else
	{
		return fetch(`http://localhost:3000/favourites`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(movie)
		}).then(response => {
				if(response.ok){
					return response.json();
				}
			}).then(newMovie => {
				//update favourite movies with the new movie
				//console.log(newMovie);
				favouriteMoviesArray.push(newMovie);				 
				var favList = document.querySelector("#favouritesList");
				var favString = "";					
				favouriteMoviesArray.forEach(mov => {
					//console.log(mov.title);
				favString += `Id<li>${mov.id}</li>
				<li>${mov.title}</li>
				<li>${mov.posterPath}</li>`			
			});
	
			favList.innerHTML = favString;
			return favouriteMoviesArray;
			}
		)
	}
}
function checkMovie(id)
{
	var result = null;
	var movie = moviesArray.find(movie =>{
		
		if(movie.id == id)
		{
             result = movie;
        }
	});
	return result;
}
function checkFavMovie(id)
{
	var flag = false;
	var check = favouriteMoviesArray.find(fav => {
		if( fav.id == id )
		{
			flag = true;
            //return fav;
        }
	});	
	return flag;
}
module.exports ={
getMovies,
getFavourites,
addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution