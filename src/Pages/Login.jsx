import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Background from "../Utilities/Assets/Background";
import styled from "styled-components";

export default function Login() {
    return (
        <>
        <LoginContainer>
            <h2>Login</h2>
            <div className='input-container'>
              <div className='label-container'>
                <PersonRoundedIcon className='icon left'/>
                <span>Username</span>
              </div>
              <input type='text'/>
            </div>
            <div className='input-container'>
            <div className='label-container'>
                <KeyRoundedIcon className='icon left'/>
                <span>Password</span>
              </div>
              <input  type='password'/>
            </div>
            <button>Login</button>
            <hr/>
            <p>Don't have an account? <Link to="/signup">Create one</Link></p>
        </LoginContainer>
        <Background/>
        </>
    )
}

const LoginContainer = styled.form`
display: flex;
flex-flow: column;
align-items: center;
gap: 20px;
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
  margin-bottom: 5px;
}
.input-container {
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 5px;
  position: relative;
  .label-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  input {
    border: 0;
    border-radius: 5px;
    padding: 10px;
    height: 35px;
    &:focus {
      border: 2px solid var(--third-color);
      outline: 0;
    }
  }
}
button {
  padding: 12.5px 20px;
  margin: 10px 0;
  background-color: var(--third-color);
  border: 0;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    background-color: var(--second-color);
  }
  &:active {
    transform: scale(95%);
  }
}
hr {
  width: 100%;
  border: 1px solid var(--second-color);
  margin-top: 10px;
}
p {
  color: var(--fourth-color);
  a {
    color: var(--third-color);
    text-decoration: none;
    font-weight: bold;
  }
}
`