import styles from "../styles/form.module.css"
import commonStyles from "../styles/common.module.css"
import { useState } from "react";
import Loading from "../components/Loading.js";
import useAllMovieContext from "../hooks/useAllMovieContext.js";
import useAuthContext from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const CreateMoviePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { dispatch } = useAllMovieContext();

  const movieStructure = {
    title: "",
    type: "",
    synopsis: "",
    year: "",
  };

  const [movie, setMovie] = useState(movieStructure);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function handelChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  }

  const handelSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    const res = await fetch("https://movi-backend-leot.onrender.com/api/movie/create", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoading(false);
    if (!data.error) {
      setStatus("success");
      setMovie(movieStructure);
      dispatch({ type: "CREATE_MOVIE", payload: data.movie });
    } else {
      setStatus("failed");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
        <section className={styles.contact_section}>
          <h2>
            Share what you<span> Love </span>to watch
          </h2>
          <form className={styles.contact_form} onSubmit={handelSubmit}>
            {status === "failed" && (
              <p className={styles.error_msg}>
                There was an error in submitting your post.
              </p>
            )}
            {status === "success" && (
              <p className={styles.success_msg}>
                Your post is submitted successfully!
              </p>
            )}
            <div className={styles.input_field}>
              <label htmlFor="title" className={styles.label}>
                Enter title
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title"
                  className={"font"}
                  value={movie.title}
                  required
                  onChange={handelChange}
                />
              </label>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="type" className={styles.label}>
                Enter type
                <input
                  type="text"
                  name="type"
                  id="type"
                  placeholder="Enter type"
                  className={"font"}
                  value={movie.type}
                  required
                  onChange={handelChange}
                />
              </label>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="year" className={styles.label}>
                Enter year
                <input
                  type="number"
                  name="year"
                  id="year"
                  placeholder="Enter year"
                  className={"font"}
                  value={movie.year}
                  required
                  onChange={handelChange}
                />
              </label>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="synopsis" className={styles.label}>
                Enter Discription
                <textarea
                  name="synopsis"
                  id="synopsis"
                  placeholder="Enter Description"
                  className={"font"}
                  value={movie.synopsis}
                  required
                  rows={5}
                  onChange={handelChange}
                />
              </label>
            </div>
            <div className={commonStyles.card_button_big}>
              <button type="submit">
                Create
              </button>
            </div>
          </form>
        </section>
  );
};

export default CreateMoviePage;
