import styles from "../styles/common.module.css";
import { Link } from "react-router-dom";


const Box = (movie)=>{
    const {id, title, synopsis, url} = movie;
    return(
        <>
            <div className={styles.card}>
            <div className={styles.card_image}>
            <img src={url} alt={title} width={260} height={200}/>
            </div>
            <div className={styles.card_data}>
            <h2>{title}</h2>
            <p>{synopsis}</p>
            </div>
            <Link to={`/movie/${id}`}>
                <div className={styles.card_button}><button>Read more</button></div>
            </Link>
            </div>
        </>
    );
}

export default Box;