import HowToPlay from "./modals/HowToPlay-modal"
import Leaderboard from "./modals/Leaderboard/modal"
import Logout from './modals/Logout'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import styled from 'styled-components'

import {useState} from 'react';
import Modal from '@mui/material/Modal';

export default function Options({toggleModal}) {
  const [open, setOpen] = useState(false);
  const [openLeaderboard, setOpenLeaderboard] = useState(false);
  const [openHowToPlay, setOpenHowToPlay] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    toggleModal();
  }
  const handleClose = () => {
    setOpen(false);
    toggleModal();
  };

  return (
    <MainModal>
      <MoreVertRoundedIcon className='vert-icon' onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <OptionsContainer>
            <ArrowCircleLeftRoundedIcon className='back-button' onClick={handleClose}/>
            <h3>Options</h3>
            <HowToPlay open={openHowToPlay} setOpen={setOpenHowToPlay}/>
            <Leaderboard open={openLeaderboard} setOpen={setOpenLeaderboard}/>
            <Logout/>
          </OptionsContainer>
      </Modal>
    </MainModal>
  );
}

const MainModal = styled.div`
.vert-icon {
  color: var(--fourth-color);
  position: absolute;
  font-size: 30px;
  right: 30px;
  top: 30px;
  &:hover {
    cursor: pointer;
    filter: invert(50%);
  }
  @media (max-width: 575px) {
    right: 10px;
    top: 20px;
  }
}
`
const OptionsContainer = styled.div`
position: absolute;
background-color: #ffffff;
min-width: 300px !important;
display: flex;
flex-flow: column;
gap: 10px;
padding: 20px;
border-radius: 10px;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
h3 {
  position: relative;
  align-self: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}
.back-button {
  cursor: pointer;
  color: var(--third-color);
  position: absolute;
  font-size: 24px;
  left: 20px;
  top: 20px;
  &:hover {
    filter: invert(40%);
  }
}
&:focus-visible {
  border: 0;
  outline: 0;
}
`
