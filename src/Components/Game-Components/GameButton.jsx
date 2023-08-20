import styled from "styled-components"

export default function GameButton(props) {
  function buttonHandler() {
    const {rollSquare, setRollCount, setIsStarted, won, setWon, isStarted, setStartTime, startTimer} = props
    rollSquare();
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
    <Button onClick={buttonHandler}>Roll</Button>
  )
}

const Button = styled.button`
padding: 12.5px 20px;
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
`