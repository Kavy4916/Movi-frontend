import { useState } from "react";
import useAuthContext from "./useAuthContext.js"


const useSignup = () => {

    const {dispatch} = useAuthContext();
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(null);

    const signup = async (email, first_name, last_name, dob, password, verified, otp) => {
    setLoading(true);
    setError(null);
    console.log(otp);

    const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({email, first_name, last_name, dob, password, verified, otp})
      })
      const json = await response.json();

      if(!response.ok){
        setLoading(false);
      }
      if(json.error){
        setError(json.errorMessage);
      }

      if(response.ok){
        setLoading(false);
        if(json.verified){
        //save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        //update the auth context
        dispatch({type: "LOGIN", payload: json});
        return {verified: true}
        }
        else{
          return json.otp;
        }
      }
}
return {signup, loading, error};
}

export default useSignup;