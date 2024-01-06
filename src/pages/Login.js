import { useState } from "react";
import styles from "../styles/form.module.css";
import commonStyles from "../styles/common.module.css";
import useLogin from "../hooks/useLogin.js";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext.js";

const Login = () => {
  const {user} = useAuthContext();
  const navigate = useNavigate();

  if(user){
    navigate("/");
  }
  const userStructure = {
    email: "",
    password: ""
  };

  const [newUser, setNewUser] = useState(userStructure);
  const {login, error} = useLogin();

  function handelChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  async function handelSubmit(e) {
    e.preventDefault();
    await login(newUser.email,newUser.password);
  }

  function handelClick(){
    navigate("/signup");
  }

  return (
        <section className={styles.contact_section}>
          <h2>Login</h2>
          <form className={styles.contact_form} onSubmit={handelSubmit}>
            <div className={styles.input_field}>
              <label htmlFor="email" className={styles.label}>
                Enter email
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  className={"font"}
                  value={newUser.email}
                  required
                  onChange={handelChange}
                />
              </label>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="password" className={styles.label}>
                Enter password
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  className={"font"}
                  value={newUser.password}
                  required
                  onChange={handelChange}
                />
              </label>
            </div>
            <div  className={commonStyles.card_button_big}>
            <button type="submit">
              Login
            </button>
            </div>
             {error && <p className={styles.error_msg}>{error}</p>}
          </form>
          <div className={styles.contact_section}>
            <p className={styles.buttom_msg}>Don't have a account click signup to create one.</p>
            <div  className={commonStyles.card_button}>
              <button type="submit" c onClick={handelClick}>
                   Signup
              </button>
            </div>
          </div>
        </section>
  );
};

export default Login;
