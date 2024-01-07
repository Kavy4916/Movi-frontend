import { useEffect, useState } from "react";
import styles from "../styles/moviePage.module.css"
import { useParams} from "react-router-dom";
import Loading from "../components/Loading.js";
import NoMatch from "./NoMatch.js";
import MovieData from "../components/MovieData.js";
import useAuthContext from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";


const MoviePage = ()=>{
      const { user } = useAuthContext();
      const params = useParams();
      const {id} = params;
      const [movie, setMovie] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [status, setStatus] = useState("Add to WL");
      const navigate = useNavigate();

      async function handelClick(e){
        if(!user){
          navigate("/");
        }

        const id = e.target.id;
        const data = {
          post_id: id
        }
        const response = await fetch("http://localhost:5000/api/user/addMovieToWL", {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if(!result.error){setStatus("Added")};
    }
    
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
      <div className={styles.container}>
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
        <MovieData
            movie={movie}
         />
         <h2 className={styles.movie_para_heading}>Storyline: </h2>
            <p className={styles.movie_para}>{movie.synopsis}</p>
          </div>
        </div>
        <div className={styles.youtube_section}>
        <iframe className={styles.youtube} src={`https://www.youtube.com/embed/${movie.youtubeUrl}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
       </div>
       <div className={styles.whatchlist_button} id={movie._id} onClick={handelClick}>{status}</div>
      </div>
    </>
  );
};

export default MoviePage;


