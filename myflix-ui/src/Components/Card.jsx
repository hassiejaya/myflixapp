import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import video from "../Assets/moneyVideo.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/Firebase-config";
import { async } from "@firebase/util";
import { removeFavouriteMovies, getContentUrl } from "../Store";
import { useDispatch, useSelector } from "react-redux";


function Card({ movieData, isLiked = false }) {
  const dispatch = useDispatch();
  const [isHowering, setIsHowering] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [videoID, setVideoID] = useState(movieData.id);
  const [videoSRC, setVideoSRC] = useState(video);
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/LoginPage")
  });

useEffect(()=>{
  axios.get(`http://localhost:5000/api/cloudcontent/geturl/${movieData.id}`)
  .then((response) => {
    const data = response.data["url"];
    setVideoSRC(data);
  })
})


  const addToList = async () => {
    try {

      await axios.post("http://localhost:5000/api/user/add", { email, data: movieData });


    } catch (error) {
      console.log(error);
    }
  }


  return <Container
    onMouseEnter={() => {
      setIsHowering(true);
    }}
    onMouseLeave={() => setIsHowering(false)}
  >
    <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="MovieCard" />
    {
      isHowering && (
        <div className="hover">
          <div className="image-video-container">
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="MovieCard" onClick={() => navigate(`/VideoPlayer/${movieData.id}`)} />
            <video src={videoSRC} autoPlay loop muted onClick={() => navigate("/VideoPlayer")} />
          </div>
          <div className="infor-container flex column">
            <h3 className="name" onClick={() => navigate(`/VideoPlayer/${movieData.id}`)}>{movieData.name}</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="Play" onClick={() => navigate(`/VideoPlayer/${movieData.id}`)} />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {

                  isLiked ? (
                    <BsCheck title="Remove from Favourites" onClick={() => dispatch(removeFavouriteMovies({ movieId: movieData.id, email }))} />
                  ) : (
                    <AiOutlinePlus title="Add to Favourites" onClick={addToList} />
                  )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => {
                  <li key={genre}>{genre}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
      )
    }
  </Container>;
}

export default Card;

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -200px;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
