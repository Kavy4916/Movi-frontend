import { AllMovieContext } from "../context/AllMovieContext.js";
import { useContext } from "react";


const useAllMovieContext = () => {
    const context = useContext(AllMovieContext);
if(!context){
    throw Error("useAllMovieContext must be used inside an AllMovieContextProvider");
}

    return context;
}

export default useAllMovieContext;