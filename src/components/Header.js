import styles from "../styles/navbar.module.css";
import Nav from "./Nav.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [display, setDisplay] = useState(false);

  function handelNavClick() {
    setDisplay((prev) => {
      return !prev;
    });
  }

  const navigate = useNavigate();
  const {user, dispatch} = useAuthContext();
  

  function handelClick(){
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"})
        navigate("/");
        handelNavClick();
  }

  return (
    <>
    <header className={styles.main_header}>
      <div className={styles.navbar_brand}>
        <Link to="/">
          <div className={styles.logo}>MOVI</div>
        </Link>
      </div>
      <nav className={styles.navbar}>
        <button className={styles.navbar_icon} onClick={handelNavClick}>
          <img alt="nav" src="navigation-bar.png" />
        </button>
        <Nav />
      </nav>
    </header>
    {display && (<div className={styles.sidebarList}>
            <Link  onClick={handelNavClick} className={styles.navbarItem} to="/">
              Home
            </Link>
            <Link onClick={handelNavClick} className={styles.navbarItem} to="/about">
              About
            </Link>
          {!user && (
            <>
                <Link onClick={handelNavClick} className={styles.navbarItem} to="/login">
                  Login
                </Link>
            </>
          )}
          {user && 
          (<>
                <Link onClick={handelNavClick} className={styles.navbarItem} to="/myCreation">
                  Creations
                </Link>
                <Link onClick={handelNavClick} className={styles.navbarItem} to="/create">
                  Create
                </Link>
          <button className={styles.navbarItem}
              type="button"
              onClick={handelClick}>
              Log out
          </button>
          </>
          )}
      </div>)}
    </>
  );
};

export default Header;
