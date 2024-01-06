import { useState } from "react";
import useAuthContext from "./useAuthContext.js"
import { useNavigate } from "react-router-dom";


const useSignup = () => {
    const navigate = useNavigate();
    const {dispatch} = useAuthContext();
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(null);

    const signup = async (email, first_name, last_name, dob, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("https://movi-backend-leot.onrender.com/api/user/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({email, first_name, last_name, dob, password})
      })
      const json = await response.json();

      if(!response.ok){
        setLoading(false);
      }
      if(json.error){
        setError(json.errorMessage);
      }

      if(response.ok){
        //save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        //update the auth context
        dispatch({type: "LOGIN", payload: json});

        setLoading(false);
        navigate("/");
      }
}
return {signup, loading, error};
}

export default useSignup;