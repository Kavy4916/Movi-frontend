import styles from "../styles/moviePage.module.css";
import { useState } from "react";

//hl -> for styling
const MovieData = ({ movie }) => {
  const [display, setDisplay] = useState(false);

  function handelClick(){
    setDisplay((prev)=>{
      return !prev;
    })
  }

  var count = 1;
  return (
    <div className={styles.hl_container}>
    <div className={styles.hl_list}>
        <h3>{"Language :         "}</h3>
        {movie.language.map((cur) => {
          return (
            <div key={count++} className={styles.hl_list_item}>
              {cur}
            </div>
          );
        })}
      </div>
      <hr />
    <div className={styles.hl_list}>
        <h3>{"Gener :         "}</h3>
        {movie.gener.map((cur) => {
          return (
            <div key={count++} className={styles.hl_list_item}>
              {cur}
            </div>
          );
        })}
      </div>
      <hr />
    <div className={styles.hl_list}>
        <h3>{"Rattings : "}</h3>
        <div className={styles.hl_list_item}>IMDB  {movie.imdb}</div>
        <div className={styles.hl_list_item}>Rotten Tomato  {movie.rt}</div>
      </div>
      <hr />
      <div className={styles.hl_list}>
        <h3>{"Director : "}</h3>
        <div className={styles.hl_list_item}>{movie.director}</div>
      </div>
      <hr />
      <div className={styles.hl_list}>
        <h3>{"Writer : "}</h3>
        <div className={styles.hl_list_item}>{movie.writer}</div>
      </div>
      <hr />
      <div className={styles.hl_list} onClick={handelClick}>
        <h3>{"Stars"}</h3>
      </div>
      {display && movie.cast.map((cur) => {
          return (
            <div key={count++} className={styles.hl_cast_list}>
              {cur}
            </div>
          );
        })}
    </div>
  );
};

export default MovieData;
