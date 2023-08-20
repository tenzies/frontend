import TimeCounter from "./TimeCounter"
import RollCounter from "./RollCounter"
import styled from 'styled-components'

export default function Counters(props) {
  return (
    <CountersContainer>
      <TimeCounter
        won={props.won}
        startTime={props.startTime}
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
left: 30px;
bottom: 30px;
`