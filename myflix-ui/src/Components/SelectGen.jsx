import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGen } from "../Store";


export default function SelectGen({ gens, type }) {
    const dispatch =useDispatch();
    return (
        <Select className="flex" onChange={e=>{
            dispatch(fetchDataByGen({gen: e.target.value,  type}))
        }}>
            {gens.map((gen) => {
                return (<option value={gen.id} key={gen.id}> {gen.name} </option>);
            })}
        </Select>
    );
}
const Select = styled.select`
margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 1);
  color: white;
  `;