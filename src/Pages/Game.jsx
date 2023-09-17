import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import { generateOneSquare, generateSquares } from '../Utilities/Helpers/SquareGenerators';
import { UpdateHandler, useIsLoggedIn } from '../Utilities/Helpers/UserHandlers';
import { toMilliSeconds } from '../Utilities/Helpers/Time'
import { ToastContainer } from 'react-toastify';
import Background from "../Utilities/Assets/Background";
import Components from '../Components/Components';
import showToastify from '../Utilities/Helpers/Toastify';

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
  const [timeCount, setTimeCount] = useState({ milliseconds: 0, seconds: 0, minutes: 0 });
  const [rollCount, setRollCount] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [won, setWon] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false)

  // State update checking functions
  const isVisible = usePageVisibility();
  const isLoggedIn = useIsLoggedIn()
  useEffect(() => {
    isLoggedIn()
  }, [isLoggedIn])

  // Time handling callbacks
    const startTimer = useCallback(() => {
      const newTimerInterval = setInterval(() => {
        setTimeCount((oldTime) => ({
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
    
    // Check if the user held all the squares to same values or exceeded time
    useEffect(()=> {
      const allHeld = squares.every(square => square.isHeld)
      const sameValue = squares.every(square => square.value === squares[0].value)
      if(allHeld && sameValue && !hasUpdated) {
        stopTimer();
        setWon(true);
        const msTime = toMilliSeconds(timeCount);
        UpdateHandler(msTime);
        setHasUpdated(true)
      }
      if(timeCount.minutes === 60) {
        stopTimer();
        setTimeCount({ milliseconds: 0, seconds: 0, minutes: 0 });
        setRollCount(0);
        setSquares(generateSquares());
        setIsStarted(false);
        showToastify(408, 'Game refreshed: Maximum time exceeded');
      }
    }, [squares, stopTimer, timeCount, hasUpdated])

    // Check if user went away from screen
    useEffect(() => {
      if(won) {
        stopTimer();
      }
      else if (!isOpen && isVisible && isStarted && !timerInterval) startTimer();
      else if (isOpen || !isVisible ) stopTimer();
    }, [won, isVisible, isStarted, timerInterval, startTimer, stopTimer, isOpen]);

    // Checks if the user is loggedOut, or changes occured to the data in localStorage
    useEffect(() => {
      const handleStorageChange = (e) => {
        if (e.key === 'user_token') {
          isLoggedIn()
        }
      };
      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [won, timeCount, isLoggedIn, stopTimer])

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
        setHasUpdated={setHasUpdated}
        isStarted={isStarted}
        timeCount={timeCount}
        setTimeCount={setTimeCount}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
      <Background won={won}/>
      <ToastContainer/>
    </GameContainer>
  )
}

const GameContainer = styled.div`

`