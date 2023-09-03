import styled from "styled-components"

export default function Loader() {
  return (
    <LoaderContainer>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoaderContainer>
  )
}

const LoaderContainer = styled.div`
position: relative;
width: 35px;
height: 35px;
& div {
  box-sizing: border-box;
  display: block;
  position: relative;
  width: 27px;
  height: 27px;
  margin: 5px;
  border: 5px solid #fff;
  border-radius: 50%;
  animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
& div:nth-child(1) {
  animation-delay: -0.45s;
}
& div:nth-child(2) {
  animation-delay: -0.3s;
}
& div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`