import styled from 'styled-components'
import Counters from './Game-Components/Counters/Counters'
import Square from './Game-Components/Square'
import GameButton from './Game-Components/GameButton'
import { useState } from 'react';
import Options from './User-Options/Options';
import { TryRounded } from '@mui/icons-material';
// import { useEffect, useState, useCallback } from 'react';

export default function Components (props) {

  const toggleModal = () => {
    props.setIsOpen(!props.isOpen)
  }
  return (
    <ComponentsContainer>
      <h2>{props.won ? "You Won!" : "Tenzis"}</h2>
      
      <Options isOpen={props.isOpen} onClick={toggleModal} toggleModal={toggleModal}/>
      <SquaresContainer>
        {props.squares.map(e => <Square {...e} {...props} />)}
      </SquaresContainer>
      <Counters 
        startTime={props.startTime}
        rollCount={props.rollCount}
        />
      <GameButton {...props}/>
    </ComponentsContainer>
  )
}

const ComponentsContainer = styled.div`
display: flex;
flex-flow: column;
align-items: center;
gap: 10px;
position: absolute;
max-width: 500px;
min-width: 350px;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
background-color: #99999920;
color: var(--fourth-color);
padding: 30px;
z-index: 1;
border: 2px solid var(--fourth-color);
border-radius: 15px;
h2 {
  color: var(--third-color);
  font-size: 35px;
}
`
const SquaresContainer = styled.div`
display: grid;
grid-template-columns: repeat(5, auto);
grid-template-rows: repeat(2, auto);
gap: 20px;
padding: 20px;
align-content: center;
align-items: stretch;
justify-content: center;
margin-bottom: 10px;
`