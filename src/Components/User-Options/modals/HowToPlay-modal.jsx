import styled from 'styled-components'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {useState} from 'react';
import Modal from '@mui/material/Modal';



export default function HowToPlay() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <HowOption onClick={handleOpen}><InfoRoundedIcon/><span>How to play</span></HowOption>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <HowToPlayContainer>
            <ArrowCircleLeftRoundedIcon className="back-button" onClick={handleClose}/>
            <div className="modal-title" id="modal-modal-title" variant="h6" component="h2">
              How to play?
            </div>
            <div className="modal-description">
              Refresh until all squares are the same. Click each square to freeze it at its current value between refreshes.
            </div>
          </HowToPlayContainer>
      </Modal>
    </>
  );
}

const HowOption = styled.div`
display: flex;
align-items: center;
gap: 10px;
padding: 10px;
border-radius: 10px;
border: 2px solid var(--first-color);
outline: 0;
transition: var(--transition-time);
svg {
  color: var(--first-color);
}
span {
  color: var(--first-color);
  font-weight: bold;
}
&:hover {
  background-color: var(--first-color);
  color: white;
  cursor: pointer;
  span {
    color: white;
  }
  svg {
    color: white;
  }
}
`

const HowToPlayContainer = styled.div`
position: absolute;
left: 50%;
top: 50%;
background-color: white;
padding: 20px;
border-radius: 10px;
min-width: 300px;
max-width: 350px;
transform: translate(-50%, -50%);
display: flex;
flex-flow: column;
gap: 20px;
.modal-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
}
.modal-description {
  text-align: center;
  font-size: 18px;
  line-height: 24px;
}
&:focus-visible {
  border: 0;
  outline: 0;
}
.back-button {
  cursor: pointer;
  color: var(--fourth-color);
  position: absolute;
  font-size: 24px;
  left: 20px;
  top: 20px;
  &:hover {
    filter: invert(40%);
  }
}
`