
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGens, fetchMovies, getFavouriteMovies } from "../Store";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../utils/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import NavigationBar from "../Components/NavigationBar";
import Slide from "../Components/Slide";
import NA from "../Components/NA";
import SelectGen from "../Components/SelectGen";

import Card from "../Components/Card";


export default function Favourites(){
    const [isScralled, setIsScralled] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.Myflix.movies);
    //console.log(movies);


    const [email, setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/LoginPage")
    });

    useEffect(() => {
        if(email){
            dispatch(getFavouriteMovies(email));
        }
    }, [email])



    window.onscroll = () => {
        setIsScralled(window.pageYOffset < 100 ? false : true);
        return () => (window.onscroll = null);
    }

    
    return (<Container>
         <NavigationBar isScralled={isScralled}/>
         <div className="content flex column">
            <h1> Favourites </h1>
            <div className="grid flex">
            {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
            </div>
         </div>
         </Container>)
    
}

const Container = styled.div`
.content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
  `;