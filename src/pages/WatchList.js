import styles from "../styles/home.module.css";
import Box from "../components/Box.js";
import Loading from "../components/Loading.js";
import { useEffect, useState } from "react";
import commonStyles from "../styles/common.module.css";
import useAuthContext from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
    const {user} = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [allMovie, setAllMovie] = useState(null);
    const [empty, setEmpty] = useState(false);
    const navigate = useNavigate();
  
    function handelClick(){
        navigate("/");
    }

    useEffect(() => {
      const fetchAllMovie = async () => {
        const response = await fetch("http://localhost:5000/api/user/getWatchList", {
          method: "GET",
          headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          }
        })

        const result = await response.json();
        setLoading(false);
        if (!result.error) {
            setEmpty(result.empty);
            setAllMovie(result.allMovie);
            console.log(allMovie);
        }
        else if(empty){
        return <div className={commonStyles.center}>
            <h2>Your Watch-List is Empty!</h2>
            <button onClick={handelClick}>Home</button>
          </div>;
        } 
        else {
          return <div className={commonStyles.center}>
            <h2>Failed to load, please try later.</h2>
            <button onClick={handelClick}>Home</button>
          </div>;
        }
      };
  
      fetchAllMovie();
    },[]);
  
    if (loading) {
      return <Loading />;
    }
  
    return (
        <section className={styles.movie_Section}>
            <h1>Your Watch-List</h1>
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
  
  export default WatchList;
  