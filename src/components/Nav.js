import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const Nav = () => {

  const navigate = useNavigate();
  const {user, dispatch} = useAuthContext();
  

  function handelClick(){
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"})
        navigate("/");
  }


  return (
    <div className={styles.navbarList}>
          <div className={styles.navbarItem}>
            <Link className={styles.navbarLink} to="/">
              Home
            </Link>
          </div>
          {!user && (
            <>
              <div className={styles.navbarItem}>
                <Link className={styles.navbarLink} to="/login">
                  Login
                </Link>
              </div>
            </>
          )}
          {user && 
          (<>
            <div className={styles.navbarItem}>
            <Link className={styles.navbarLink} to="/watchList">
              WatchList
            </Link>
          </div>      
              <div className={styles.navbarItem}>
                <Link className={styles.navbarLink} to="/myCreation">
                  Creations
                </Link>
              </div>
              <div className={styles.navbarItem}>
                <Link className={styles.navbarLink} to="/create">
                  Create
                </Link>
              </div>
          <button className={styles.navbarItem}
              type="button"
              onClick={handelClick}>
              Log-Out
          </button>
          </>
          )}
      </div>
  );
};

export default Nav;
