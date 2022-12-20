import React, { useEffect } from "react";
import { useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import backgroundImage from "../Assets/home.jpg";
import moneyLogo from "../Assets/homeTitle.png";
import {FaPlay} from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGens, fetchMovies } from "../Store";
import Slide from "../Components/Slide";

export default function Myflix(){ 
    const [isScralled, setIsScralled] = useState(false);

    const navigate = useNavigate();
    const genresLoaded = useSelector((state) => state.Myflix.genresLoaded);
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.Myflix.movies);
    const gens = useSelector((state) => state.Myflix.genres);

    useEffect(()=> {
        dispatch(getGens());
    },[])

    useEffect(() => {
        if (genresLoaded) {
          dispatch(fetchMovies({ gens, type: "all" }));
        }
      }, [genresLoaded]);

    window.onscroll = () => {
        
        setIsScralled(window.pageYOffset < 100 ? false : true);
        
        return () => (window.onscroll = null);
    }
   // console.log(movies);
  return (<Container> 
        <NavigationBar isScralled = {isScralled}/>
        <div className="hero">
            <img src={backgroundImage} alt="background" className="background-image"/>
            <div className="container">
                <div className="logo">
                    <img src={moneyLogo} alt="content-logo"/>
                    <div className="buttons flex">
                        <button 
                        onClick = { ()=> navigate("/VideoPlayer")}
                        className = "flex j-center a-center"> 
                        <FaPlay/>
                        Play    
                        </button>
                        <button className="flex j-center a-center">
                            <AiOutlineInfoCircle/> Learn More
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <Slide movies = {movies} />
  </Container>)
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(87%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 60%;
          height: 60%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;