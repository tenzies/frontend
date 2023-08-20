import styled from 'styled-components'

export default function Square(props) {
  function squareHandler() {
    const {id, holdSquare, isStarted, setIsStarted, startTimer} = props
    holdSquare(id)
    if(!isStarted) {
      setIsStarted(true)
      startTimer()
    }
  }
  return(
    <SquareContainer
      className={props.isHeld ? 'held' : ""}
      key={props.id}
      onClick={squareHandler}
    >
      {props.value}
    </SquareContainer>
  )
}

const SquareContainer = styled.div`
  background-color: white;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--first-color);
  &:hover {
    cursor: pointer;
  }
  &.held {
    background-color: #59E391 !important;
    background-color: #59E391 !important;
    color: white;
  }
}
`