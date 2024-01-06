import { useEffect, useState } from "react";
import styles from "../styles/common.module.css"
import { useParams} from "react-router-dom";
import Loading from "../components/Loading.js";
import NoMatch from "./NoMatch.js";
import HorizontalList from "../components/HorizontalList.js";


const MoviePage = ()=>{
      const params = useParams();
      const {id} = params;
      const [movie, setMovie] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(()=>{
          const fetchMovie = async () => {
          const res = await fetch(`https://movi-backend-leot.onrender.com/api/movie/getOne/${id}`);
          const result = await res.json();
            setMovie(result.movie);
            setLoading(false);
            setError(result.error);
        }
        fetchMovie();
      },[]);



      if (loading) {
        return <Loading />;
      }
    
      if(error) {
        return <NoMatch />;
      }
  return (
    <>
      <div className={styles.container+" font"}>
        <h1 className={styles.movie_title}>{movie.title}</h1>
        <div>
            <img
             className={styles.movie_image}
              src={movie.url}
              alt={movie.title}
            />
          <div>
        <h2 className={styles.movie_type}>
          {movie.type} / {movie.year} ({movie.userAge})
        </h2>
        <HorizontalList
            movie={movie}
         />
            <p className={styles.movie_para}>{movie.synopsis}</p>
          </div>
        </div>
        <div className={styles.youtube_section}>
        <iframe className={styles.youtube} src={`https://www.youtube.com/embed/${movie.youtubeUrl}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
       </div>
      </div>
    </>
  );
};

export default MoviePage;


