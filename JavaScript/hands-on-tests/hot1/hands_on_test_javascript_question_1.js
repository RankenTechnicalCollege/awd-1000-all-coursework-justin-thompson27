/*  Create an array named "favoriteMovies" that holds 3 of your personal favorite movies. _____ / 5pts
❏ Ask the user to enter their favorite movie into a text box. Have them click a button to add the movie to the
existing array. _____ / 5pts
❏ Use a for loop to print the movies stored in the array to the same page that contains the textbox.
(This must happen when you click the add button described above.) _____ / 10pts
*/


let favoriteMovies = ["Summer Wars","Perfect Blue","Jennifer's Body"];

document.getElementById("submit").addEventListener("click",addToArray);

function addToArray(movie) {
  movie = document.getElementById("movie").value;
   favoriteMovies.push(movie);
   console.log(favoriteMovies);
  for (let i = 0; i < favoriteMovies.length; i++) {
    let movies ="";
    movies += favoriteMovies[i];
    movies += "<br>";
    console.log(movies);
   document.getElementById("moviesarea").innerHTML += movies;
    
  }
  /* document.write(favoriteMovies); */
  
}