import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import mvideo from "../Assets/moneyVideo.mp4";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function VideoPlayer(props) {

  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const[loaded, setLoaded] =useState(false);

  let { url } = useParams();

  //console.log(url);
  //setMovieId(url);

  //console.log(cloudContent);
  //console.log(movieData.id);
  // console.log("urlid: ", urlids);

  useEffect(() => {
    //dispatch(getContentUrl(movieData.id));
    //getUrl(videoID);

    axios.get(`http://localhost:5000/api/cloudcontent/geturl/${url}`)
      .then((response) => {
        const data = response.data["url"];
        setVideoUrl(data);
        //console.log(data);
        //console.log("videourl", videoUrl);
        if(videoUrl != ""){
          setLoaded(true);
        }
        

      })
      .catch(() => {
        //console.log(url, "error getting url");
        setVideoUrl(mvideo);
        setLoaded(true);
      });


  },)


  return (
    
    (<Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
         
        </div>
        {loaded && < video controls width="100%" autoPlay muted>
          <source src={videoUrl} type="video/mp4" />
          
          Sorry, your browser doesn't support embedded videos.
        </video>}
      </div>
    </Container>
  ));
}

const Container = styled.div`
.player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;