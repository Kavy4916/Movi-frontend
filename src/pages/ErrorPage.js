import styles from "../styles/common.module.css";
import { Link } from "react-router-dom";

const ErrorPage = ({errorMessage}) => {
    return(
        <section className={styles.container}>
            <div className={styles.error_page}>
            <h1>{errorMessage}</h1>
            <p>Sorry for the inconvence</p>
            <Link to="/">
                <button className={"font"}>Go To Home</button>
            </Link>
            </div>
        </section>
    );
}

export default ErrorPage;