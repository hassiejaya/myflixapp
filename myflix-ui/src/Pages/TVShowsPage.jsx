
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGens, fetchMovies } from "../Store";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../utils/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import NavigationBar from "../Components/NavigationBar";
import Slide from "../Components/Slide";
import NA from "../Components/NA";
import SelectGen from "../Components/SelectGen";

export default function TVShowsPage() {
    const [isScralled, setIsScralled] = useState(false);

    const navigate = useNavigate();
    const genresLoaded = useSelector((state) => state.Myflix.genresLoaded);
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.Myflix.movies);
    const gens = useSelector((state) => state.Myflix.genres);

    useEffect(() => {
        dispatch(getGens());
    }, [])

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({gens, type: "tv" }));
        }
    }, [genresLoaded]);

    window.onscroll = () => {
        setIsScralled(window.pageYOffset < 100 ? false : true);
        return () => (window.onscroll = null);
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        //if (currentUser) navigate("/");
      });

    return (
        <Container> 
            <div className="navbar">
                <NavigationBar isScralled={isScralled}/>   
            </div>
            
            <div className="data">
            <SelectGen gens={gens} type="tv"/>
                {
                    movies.length ? <Slide movies={movies} /> :
                    <NA/>                
                }
            </div>
         </Container>
    )
}

const Container = styled.div`
.data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

