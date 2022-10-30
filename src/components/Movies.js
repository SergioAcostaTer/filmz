import { useState, useEffect } from "react";
import Movie from "./Movie";
import getTrendMoviesPics from "../services/getTrendMoviesPics";

const Movies = () => {
  const [mainMovies, setMainMovies] = useState([]);

  useEffect(() => {
    async function fetchData(){
      if (!localStorage.trend) {
        console.log(JSON.parse(localStorage.trend) === [])
        const movies = await getTrendMoviesPics("day")
        setMainMovies(movies)
        localStorage.trend = JSON.stringify(movies);
      }
      if (localStorage.trend) {
        // console.log(localStorage.trend)
        setMainMovies(JSON.parse(localStorage.trend));
      }
    }
    fetchData()
  }, []); //eslint-disable-line

  return (
    <div className="movie-container">
      {mainMovies?.slice(0, 50).map((e) => (
        <Movie
          key={e.image}
          rate={e.vote_average ? Math.round(e.vote_average * 100) / 100 : "?"}
          id={e.id}
          image={`https://image.tmdb.org/t/p/original${e.poster_path}`}
          alt={e.original_title}
        ></Movie>
      ))}
    </div>
  );
};

export default Movies;
