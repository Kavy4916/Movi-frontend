import styles from "../styles/home.module.css";
import Box from "../components/Box.js";
import Loading from "../components/Loading.js";
import { useEffect, useState } from "react";
import commonStyles from "../styles/common.module.css";
import useAuthContext from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const Creation = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const [allMovie, setAllMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(null);

  function handelClick(e){
    navigate("/create");
  }

  useEffect(() => {
    const fetchAllMovie = async () => {
      const res = await fetch("https://movi-backend-leot.onrender.com/api/movie/myCreation",{
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      setLoading(false);
      setEmpty(result.empty);
      setAllMovie(result.allMovie);
    };

    fetchAllMovie();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    { !empty &&
      (<section className={styles.movie_Section}>
          <h1>Your Posts</h1>
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
      </section>)}
      {empty && (<div className={commonStyles.center}> 
           <h2>You have not created any post.</h2><h2>Click create to create your first post</h2>
           <button onClick={handelClick}>Create</button>
        </div>)}
      </>
  );
};

export default Creation;
