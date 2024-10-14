import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const imdbUrl: string = "https://imdb.iamidiotareyoutoo.com/search";
  type Movie = {
    "#TITLE": string;
    "#YEAR": number;
    "#IMG_POSTER": string;
    "#IMDB_ID": string;
  };

  useEffect(() => {
    if (query.length >= 3) {
      const delayRequest = setTimeout(() => {
        searchMovies(query);
      }, 500);

      return () => clearTimeout(delayRequest);
    }
  }, [query]);

  async function searchMovies(searchTerm: string) {
    try {
      const response = await axios.get(imdbUrl, {
        params: {
          q: searchTerm,
        },
      });
      const description = response.data.description;
      description.sort((a: Movie, b: Movie) => a["#TITLE"].localeCompare(b["#TITLE"]))
      setMovies(description);
      console.log(description);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>Search for a Movie</h1>
      <input
        id="searchMovie"
        type="text"
        placeholder="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <div>
        {movies.length > 0 ? (
          <div id="movies">
            {movies.map((movie: Movie) => (
              <div className="movie" key={movie["#IMDB_ID"]}> <h2>{movie["#TITLE"]} ({movie["#YEAR"]})</h2>
              <br></br>
              <img className="imgSize" src={movie["#IMG_POSTER"]} alt={movie["#TITLE"]}></img>
               </div>
            ))}
          </div>
        ) : (
          query && <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;
