import styles from "../styles/home.module.css";
import Box from "../components/Box.js";
import Loading from "../components/Loading.js";
import { useEffect, useState } from "react";
import useAllMovieContext from "../hooks/useAllMovieContext.js";
import ErrorPage from "./ErrorPage.js";

const Movie = () => {
  const { allMovie, dispatch } = useAllMovieContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovie = async () => {
      const res = await fetch("http://localhost:5000/api/movie/getAll");
      const result = await res.json();
      setLoading(false);
      if (!result.error) {
        dispatch({ type: "SET_ALLMOVIE", payload: result.allMovie });
      } else {
        return <ErrorPage errorMessage={result.errorMessage} />;
      }
    };

    fetchAllMovie();
  },[]);

  if (loading) {
    return <Loading />;
  }

  return (
      <section className={styles.movie_Section}>
          <h1>Movies & Series</h1>
          <div className={styles.card_section}>
            {allMovie.map((cur) => {
              return (
                <Box
                  key={cur._id}
                  id={cur._id}
                  title={cur.title.substring(0, 17)}
                  synopsis={cur.synopsis.substring(0, 78) + " ..."}
                  url={cur.url}
                ></Box>
              );
            })}
          </div>
        
      </section>
  );
};

export default Movie;
