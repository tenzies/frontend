import styled from "styled-components";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {useState} from 'react';

export default function GameButton(props) {
  const [isClicked, setIsClicked] = useState(false);

  function buttonHandler() {
    const {rollSquare, setRollCount, setIsStarted, won, setWon, isStarted, setStartTime, startTimer} = props
    rollSquare();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 250); 
    if (won) {
      setRollCount(0);
      setIsStarted(false);
      setWon(false);
      setStartTime({ milliseconds: 0, seconds: 0, minutes: 0 });
    } else {
      setRollCount((prevRollCount) => prevRollCount + 1);
      if (!isStarted) {
        setIsStarted(true);
        startTimer();
      }
    }
  }
  return (
    <Button 
      className={isClicked ? 'clicked-button' : ''}
      onClick={buttonHandler}
      >
      <RefreshRoundedIcon
        className={isClicked ? 'rotate-animation' : ''}
        />Refresh
    </Button>
  )
}

const Button = styled.button`
display: flex;
align-items: center;
gap: 5px;
padding: 12.5px 18px;
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
&.clicked-button {
  transform: scale(98%);
  box-shadow: inset 5px 5px 10px -3px rgba(0, 0, 0, 0.7);
}
.rotate-animation {
  animation: rotate 0.25s linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  },
  100% {
    transform: rotate(360deg);
  }
}
`