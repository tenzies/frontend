import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignupHandler } from '../Utilities/Helpers/UserHandlers';
import isAcceptedCredentials from '../Utilities/Helpers/Validation';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Background from "../Utilities/Assets/Background";
import styled from "styled-components";
import Loader from '../Utilities/Assets/Loader';


export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  
  const signup = SignupHandler(formData, setIsLoading);

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = isAcceptedCredentials(formData)
    if(isValid) signup();
  }
  const changeHandler = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
    return (
        <>
        <SignupContainer>
            <h2>Create an account</h2>
            <div className='input-container'>
              <div className='label-container'>
                <PersonRoundedIcon className='icon left'/>
                <span>Username</span>
              </div>
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={changeHandler}
                />
            </div>
            <div className='input-container'>
            <div className='label-container'>
                <KeyRoundedIcon className='icon left'/>
                <span>Password</span>
              </div>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={changeHandler}
                />
            </div>
            <div className='input-container'>
            <div className='label-container'>
                <KeyRoundedIcon className='icon left'/>
                <span>Confirm Password</span>
              </div>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={changeHandler}
                />
            </div>
            <button onClick={submitHandler}>{isLoading ? <Loader/> : "Signup"}</button>
            <hr/>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </SignupContainer>
        <ToastContainer/>
        <Background/>
        </>
    )
}

const SignupContainer = styled.form`
display: flex;
flex-flow: column;
align-items: center;
gap: 20px;
position: absolute;
width: 400px;
@media (max-width: 575px) {
  width: 320px;
}
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
    background-color: #eee;
    transition: var(--transition-time);
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  min-height: 50px;
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