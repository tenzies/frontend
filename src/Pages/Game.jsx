import styled from 'styled-components'

export default function Game() {
  return (
    <GameContainer>
      <h2>Tenzies</h2>
      <button>Roll</button>
    </GameContainer>
  )
}

const GameContainer = styled.div`
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
`