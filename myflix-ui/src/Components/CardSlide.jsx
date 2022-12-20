import React, { useRef, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function CardSlide({ data, title }) {
  const listRef = useRef();
  const [showControl, setShowControl] = useState(false);
  const [sliderPos, setSliderPos] = useState(1);
  
  const handleDir = (direction) => {

    
    let dist = listRef.current.getBoundingClientRect().x - 70;

    if (direction === "left" && sliderPos > 0) {
      listRef.current.style.transform = `translateX(${230 + dist}px)`;
     // setSliderPos(sliderPos-1);
      
    }
    if (direction === "right" && sliderPos < 4) {

      if (direction === "right" && sliderPos < 4) {
        listRef.current.style.transform = `translateX(${-230 + dist}px)`;
       // setSliderPos(sliderPos+1);
       
      }

    }



  };
  return (
    <Container className="flex column"
      onMouseEnter={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
    >
      <h1> {title} </h1>
      <div className="wrapper">
        <div className={`slider-action left ${!showControl ? "none" : ""} flex j-center a-center`}>
          <AiOutlineLeft onClick={() => handleDir("left")} />
        </div>
        <div className="flex slider" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />
          })}
        </div>
        <div className={`slider-action right ${!showControl ? "none" : ""} flex j-center a-center`}>
          <AiOutlineRight onClick={() => { handleDir("right") }} />
        </div>
      </div>

    </Container>
  );
};

const Container = styled.div`
gap: 0.5rem;
position: relative;
padding: 0.5rem 0;
h1 {
  margin-left: 50px;
}
.wrapper {
  .slider {
    width: max-content;
    gap: 1rem;
    transform: translateX(0px);
    transition: 0.3s ease-in-out;
    margin-left: 50px;
  }
  .slider-action {
    cursor: pointer;
    position: absolute;
    z-index: 99;
    height: 100%;
    top: 0;
    bottom: 0;
    width: 50px;
    transition: 0.3s ease-in-out;
    svg {
      font-size: 2rem;
    }
  }
  .none {
    display: none;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}`;

