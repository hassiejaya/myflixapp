
import styled from "styled-components";
import logo from "../Assets/logo.png";
import {Link, useNavigate} from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { firebaseAuth } from "../utils/Firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";


export default function NavigationBar( {isScralled} ){
    const [searchShow, setSearchShow] = useState(false);
    const [howerInput, setHowerInput] = useState(false);
    const navigate = useNavigate();

    const links = [
         {name: "Home", link: "/"},
         {name: "TV Shows", link: "/TVShowsPage"},
         {name: "Movies", link: "/MoviesPage"},
         {name: "Favourites", link: "/Favourites"},
        ]

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/LoginPage");
        });

    return <Container> 
        <nav className= {`${isScralled ? "scrolled" : ""} flex` }> 
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logos" />
          </div>
          <ul className="links flex">
            {
                links.map(({name, link}) => {
                    return (
                        <li key={name}>
                            <Link to={link}>{name}</Link>
                        </li>
                    )
                })
            }
          </ul>
         </div>
         <div className="right flex a-center">
          <div className={`search ${searchShow ? "show-search" : ""}`}>
            <button
              onFocus={() => setSearchShow(true)}
              onBlur={() => {
                if (!howerInput) {
                  setSearchShow(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setHowerInput(true)}
              onMouseLeave={() => setHowerInput(false)}
              onBlur={() => {
                setSearchShow(false);
                setHowerInput(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
         </nav>
        </Container>
}

const Container = styled.div`
  .scrolled {
    background-image: linear-gradient( rgba(0,0,0,1),rgba(0,0,0,0.75),rgba(0,0,0,0.6), rgba(0,0,0,0));
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
