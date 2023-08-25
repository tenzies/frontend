import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import styled from 'styled-components'

import {useState} from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function Leaderboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <LeaderboardOption onClick={handleOpen}><LeaderboardIcon/><span>Leaderboard</span></LeaderboardOption>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <LeaderboardContainer>
          <ArrowCircleLeftRoundedIcon className='back-button' onClick={handleClose}/>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div className='modal-title'>
              <EmojiEventsIcon/> <span>Leaderboard</span>
              </div>
            </Typography> 
            <div className='leaderboard-grid'>
              <div className='user-scores'>
                <div>
                  {/* <span>Your best Time: {abstractTime(bestTime)}</span> */}
                </div>
              </div>
            </div>
            {/* <div className='leaderboard-scores'>
              <div className='leaderboard-scores-header'>
              <span>#</span><span>name</span><span>time record</span>
              </div>
              {leaderboardTimes && leaderboardTimes.map((e,i) => (                
                <div>
                <span>{i + 1}</span>
                <span>{e.username}</span>
                <span>{abstractTime(e.best_time)}</span>
                </div>
                )
                )}
              </div> */}
              </LeaderboardContainer>
      </Modal>
    </>
  );
}

const LeaderboardOption = styled.div`
display: flex;
align-items: center;
gap: 10px;
padding: 10px;
border-radius: 10px;
border: 2px solid var(--second-color);
transition: var(--transition-time);
svg {
  color: var(--second-color);
}
span {
  color: var(--second-color);
  font-weight: bold;
}
&:hover {
  background-color: var(--second-color);
  color: white;
  cursor: pointer;
  span {
    color: white;
  }
  svg {
    color: white;
  }
}

.info-button {
  color: var(--second-color);
  right: 15px;
  top: 15px;
  cursor: pointer;
}
`

const LeaderboardContainer = styled.div`
position: absolute;
left: 50%;
top: 50%;
background-color: white;
padding: 20px;
border-radius: 10px;
min-width: 300px;
max-width: 400px;
transform: translate(-50%, -50%);
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
&:focus-visible {
  border: 0;
  outline: 0;
}
.modal-title {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  svg {
    color: yellow;
    filter: invert(10%);
  }
}

.leaderboard-scores {
  margin-top: 25px;
  display: flex;
  flex-flow: column;
  gap: 10px;
  & div {
    display: flex;
    padding: 10px;
    gap: 50px;
    background-color: var(--fourth-color);
    color: white;
    font-weight: 600;
    justify-content: start;
    &:first-child {
      background-color: var(--second-color);
    }
    span {
      min-width: 50px;
      display: block;
    }
  }
}
`
