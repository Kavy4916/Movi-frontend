import { useState } from "react";
import styles from "../styles/form.module.css";
import commonStyles from "../styles/common.module.css"
import useSignup from "../hooks/useSignup.js";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext.js";

const Signup = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();

  if(user){
    navigate("/");
  }

  const userStructure = {
    email: "",
    first_name: "",
    last_name: "",
    dob: "",
    password: "",
    verified: false,
    otp: null
  };

  const [newUser, setNewUser] = useState(userStructure);
  const [otpSent, setOtpSent] = useState(false);
  var otp = null;
  var {signup, error} = useSignup();

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
    if(!otp){
      console.log(otp);
      setOtpSent(true);
      const result = await signup(newUser.email, newUser.first_name, newUser.last_name, newUser.dob, newUser.password, newUser.otp);
      otp = result;
    }
    else{
      console.log(otp);
      if(otp === newUser.otp)
      {
        console.log(otp);
        setNewUser((prev)=>{
          return {...prev, verified: true}
        })
        const result = await signup(newUser.email, newUser.first_name, newUser.last_name, newUser.dob, newUser.password, newUser.otp);
        if(result.verified)
        {
          navigate("/");
        }
        else{error = "Something went wrong!"};
      }
    }
  }

  function handelClick(){
    navigate("/login");
  }

  return (
    <>
      <div className={styles.container}>
        <section className={styles.contact_section}>
          <h2>Sign up</h2>

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
              <label htmlFor="first_name" className={styles.label}>
                Enter first name
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="Enter first name"
                  className={"font"}
                  value={newUser.first_name}
                  required
                  onChange={handelChange}
                />
              </label>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="last_name" className={styles.label}>
                Enter last name
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Enter last name"
                  className={"font"}
                  value={newUser.last_name}
                  required
                  onChange={handelChange}
                />
              </label>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="dob" className={styles.label}>
                Enter DOB
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Enter DOB"
                  className={"font"}
                  value={newUser.dob}
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
            { otpSent && (<div className={styles.input_field}>
              <label htmlFor="otp" className={styles.label}>
                Enter OTP
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  className={"font"}
                  value={newUser.otp}
                  onChange={handelChange}
                />
              </label>
            </div>
            )}
            <div className={commonStyles.card_button_big}>
            <button type="submit">
              {otpSent?  "Verify":"Send OTP"}
            </button>
            </div>
             {error && <p className={styles.error_msg}>{error}</p>}
             {error && <p className={styles.error_msg}>{error}</p>}
          </form>
          <div className={styles.contact_section}>
            <p className={styles.buttom_msg}>Already have a account then click login</p>
            <div className={commonStyles.card_button}>
            <button type="submit" onClick={handelClick}>
              Login
            </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
