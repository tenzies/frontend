import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import { generateOneSquare, generateSquares } from '../Utilities/Helpers/SquareGenerators';
import GameButton from '../Components/Game-Components/GameButton';
import Background from "../Utilities/Assets/Background";
import Components from '../Components/Components';

const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

export default function Game() {
  const [squares, setSquares] = useState(generateSquares());
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState({ milliseconds: 0, seconds: 0, minutes: 0 });
  const [rollCount, setRollCount] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [won, setWon] = useState(false);
  
  // Time handling callbacks

    const startTimer = useCallback(() => {
      const newTimerInterval = setInterval(() => {
        setStartTime((oldTime) => ({
          milliseconds: oldTime.milliseconds === 100 ? 0 : oldTime.milliseconds + 1,
          seconds: oldTime.milliseconds === 100 ? oldTime.seconds + 1 : oldTime.seconds === 60 ? 0 : oldTime.seconds,
          minutes: oldTime.seconds === 60 ? oldTime.minutes + 1 : oldTime.minutes === 60 ? 0 : oldTime.minutes,
        }));
      }, 10);
      setTimerInterval(newTimerInterval)
    }, []);

    const stopTimer = useCallback(() => {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }, [timerInterval]);

  // Square Handling functions

    function rollSquare() {
      if (won) {
        setSquares(generateSquares())
        setWon(false)
      } else {
        setSquares(oldSquare => oldSquare.map(die => die.isHeld ? die : generateOneSquare()))
      }
    }

    function holdSquare(id) {
      const newDice = squares.map(die => die.id === id ? {...die, isHeld: !die.isHeld }: die)
      setSquares(newDice)
    }

  // State update checking functions

    const isVisible = usePageVisibility();
  
    // Check if user won, or went away from screen
    useEffect(() => {
      if (isOpen) stopTimer()
      else if(isOpen) startTimer();
      if (won) stopTimer();
      else if (!isOpen && isVisible && isStarted && !timerInterval) startTimer();
      else if (isOpen && !isVisible && timerInterval) stopTimer();
    }, [won, isVisible, isStarted, timerInterval, startTimer, stopTimer, isOpen, startTime]);

    // Check if the user held all the squares to same values
    useEffect(()=> {
      const allHeld = squares.every(die => die.isHeld)
      const sameValue = squares.every(die => die.value === squares[0].value)
      if(allHeld && sameValue) {
        setWon(true)
      }
    }, [squares])
    
  return (
    <GameContainer>
      <Components
        squares={squares}
        setSquares={setSquares}
        holdSquare={holdSquare}
        won={won}
        setWon={setWon}
        rollSquare={rollSquare}
        rollCount={rollCount}
        setRollCount={setRollCount}
        setIsStarted={setIsStarted}
        isStarted={isStarted}
        startTime={startTime}
        setStartTime={setStartTime}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
      <Background won={won}/>
    </GameContainer>
  )
}

const GameContainer = styled.div`

`