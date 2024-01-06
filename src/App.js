// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header.js";
import Home from "./pages/Home.js"
import About from "./pages/About.js";
import NoMatch from "./pages/NoMatch.js";
import MoviePage from './pages/MoviePage.js';
import CreateMoviePage from './pages/CreateMoviePage.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Creation from './pages/Creation.js';





const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
             <Route  index element={<Home />}/>
             <Route path='login' element={<Login />}/>
             <Route path="about" element={<About />} />
             <Route path="create" element={<CreateMoviePage />}/>
             <Route path="myCreation" element={<Creation />} />
             <Route path="movie/:id" element={<MoviePage />}/>
             <Route path="signup" element={<Signup />}/>
             <Route path="*" element={<NoMatch />} />
        </Routes>
    </Router>
  );
};

export default App;
