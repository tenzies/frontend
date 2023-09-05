import TimeCounter from "./TimeCounter"
import RollCounter from "./RollCounter"
import styled from 'styled-components'

export default function Counters(props) {
  return (
    <CountersContainer>
      <TimeCounter
        won={props.won}
        timeCount={props.timeCount}
        isStarted={props.isStarted}
      />
      <RollCounter rollCount={props.rollCount}/>
    </CountersContainer>
  )
}

const CountersContainer = styled.div`
display: flex;
flex-flow: column;
gap: 5px;
position: absolute;
bottom: 30px;
left: 30px;
@media (max-width: 575px) {
  position: fixed;
  left: 10px;
  bottom: 15px;
}
`