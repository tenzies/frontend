import Confetti from 'react-confetti';
import styled from 'styled-components';

export default function Background({won}) {
  return (
    <>
      {won && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      <Area>
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </Area >
    </>
      
  )
}

const Area = styled.div`
    background: #333333;  
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);  
    width: 100vw;
    height:100vh;
    .circles{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li{
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: var(--second-color);
        animation: animate 25s linear infinite;
        bottom: -150px;
        &:nth-child(1){
          left: 25%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
          border-radius: 8px;
        }
        &:nth-child(2){
            left: 10%;
            width: 20px;
            height: 20px;
            animation-delay: 2s;
            animation-duration: 12s;
            border-radius: 2px;
        }
        
        &:nth-child(3){
            left: 70%;
            width: 20px;
            height: 20px;
            animation-delay: 4s;
            border-radius: 2px;
        }
        
        &:nth-child(4){
            left: 40%;
            width: 60px;
            height: 60px;
            animation-delay: 0s;
            animation-duration: 18s;
            border-radius: 6px;
        }
        
        &:nth-child(5){
            left: 65%;
            width: 20px;
            height: 20px;
            animation-delay: 0s;
            border-radius: 2px;
        }
        
        &:nth-child(6){
            left: 75%;
            width: 110px;
            height: 110px;
            animation-delay: 3s;
            border-radius: 11px;
        }
        
        &:nth-child(7){
            left: 35%;
            width: 150px;
            height: 150px;
            animation-delay: 7s;
            border-radius: 15px;
        }
        
        &:nth-child(8){
            left: 50%;
            width: 25px;
            height: 25px;
            animation-delay: 15s;
            animation-duration: 45s;
            border-radius: 2.5px;
        }
        
        &:nth-child(9){
            left: 20%;
            width: 15px;
            height: 15px;
            animation-delay: 2s;
            animation-duration: 35s;
            border-radius: 1.5px;
        }
        
        &:nth-child(10){
            left: 85%;
            width: 150px;
            height: 150px;
            animation-delay: 0s;
            animation-duration: 11s;
            border-radius: 15px;
        }
        &:nth-child(11){
            left: 5%;
            width: 150px;
            height: 150px;
            animation-delay: 0s;
            animation-duration: 15s;
            border-radius: 15px;
        }
        &:nth-child(12){
            left: 20%;
            width: 60px;
            height: 60px;
            animation-delay: 0.5s;
            animation-duration: 11s;
            border-radius: 15px;
        }
      }
    }

@keyframes animate {
    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 0.5;
    }
    100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
    }
}
`