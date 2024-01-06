import {  createContext, useReducer } from "react";

const AllMovieContext = createContext();

const allMovieReducer = (state, action) =>{
    switch(action.type){
        case "SET_ALLMOVIE":
            return {
                allMovie: action.payload
            };
        case   "CREATE_MOVIE":
            return {
                allMovie: [action.payload, ...state.allMovie]
            };
        default:
            return state;    
    }
}



const AllMovieContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(allMovieReducer,{
        workouts: null
    });

    return(
        <AllMovieContext.Provider value={{...state,dispatch}}>
          {children}
        </AllMovieContext.Provider>
    )
}

export {AllMovieContext ,AllMovieContextProvider, allMovieReducer };