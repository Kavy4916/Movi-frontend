import styles from "../styles/common.module.css";
import { Link } from "react-router-dom";

const NoMatch = () => {
    return(
        <section className={styles.container}>
            <div className={styles.error_page}>
            <h1>404</h1>
            <h2>Not Found</h2>
            <p>Cound not find requested resource.</p>
            <Link to="/">
                <button className={"font"}>Go To Home</button>
            </Link>
            </div>
        </section>
    );
}

export default NoMatch;