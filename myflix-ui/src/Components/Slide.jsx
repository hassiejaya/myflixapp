import React from "react";
import styled from "styled-components";
import CardSlide from "./CardSlide";

export default function Slide( {movies}){

    const getMoviesFromRange=(from,to) => {
        return movies.slice(from,to);
    }

    return(
        <Container>
            <div>
        <CardSlide title= "Trending" data = {getMoviesFromRange(0,10)} />
        <CardSlide title= "New to Myflix" data = {getMoviesFromRange(10,20)} />
        <CardSlide title= "Block Buster" data = {getMoviesFromRange(20,30)} />
        <CardSlide title= "Comedy" data = {getMoviesFromRange(30,40)} />
        <CardSlide title= "Popuar on Myflix" data = {getMoviesFromRange(40,50)} />
        <CardSlide title= "Award Winning Titles" data = {getMoviesFromRange(50,60)} />
     </div></Container>
    );
}

const Container = styled.div``;