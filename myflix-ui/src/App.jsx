import React from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import VideoPlayer from "./Components/VideoPlayer";
import Favourites from "./Pages/Favourites";
import LoginPage from "./Pages/LoginPage";
import MoviesPage from "./Pages/MoviesPage";
import Myflix from "./Pages/Myflix";
import SignupPage from "./Pages/SignupPage";
import TVShowsPage from "./Pages/TVShowsPage";


export default function App(){
 
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route  path="/VideoPlayer/:url" element={<VideoPlayer/>}/>
          <Route exact path="/loginPage" element={<LoginPage />} />
          <Route exact path="/" element={<Myflix />} />
          <Route exact path="/SignupPage" element={<SignupPage />} />
          <Route exact path="/VideoPlayer/" element={<VideoPlayer/>}/>
          <Route exact path="/MoviesPage" element={<MoviesPage/>}/>
          <Route exact path="/TVShowsPage" element={<TVShowsPage/>}/>
          <Route exact path="/Favourites" element={<Favourites/>}/>
          
          
          

        </Routes>
      </BrowserRouter></>
  );
}