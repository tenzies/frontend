import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {abstractTime, userBestTime, fetchTimes} from '../../../../Utilities/Helpers/Time';
import Loader from '../../../../Utilities/Assets/Loader';
import styled from 'styled-components'
import rankLogoGenerator from '../../../../Utilities/Helpers/RankGenerator';
import {useCallback, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ScoresTable from './table'


export default function Leaderboard({open, setOpen}) {
  const [boardTimes, setBoardTimes] = useState(null);
  const [countTimes, setCountTimes] = useState(0);
  const [bestTime, setBestTime] = useState(null)
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getAllRecordsCount = async () => {
      const allRecords = await fetchTimes();
      setCountTimes(allRecords.length)
    }
    const getUserBestTime =  async () => {
      const best_time = await userBestTime();
      setBestTime(abstractTime(best_time))
    }
    getAllRecordsCount();
    getUserBestTime();
  }, [bestTime])

  const recordsHandler = useCallback (async () => {
    const records = await fetchTimes(limit, offset);
    setBoardTimes(records)
  }, [limit, offset])
  
  const handleOpen = async () => {
    setOpen(true)
    recordsHandler()
  };
  const handleClose = () => {
    setOpen(false)
    setLimit(3);
    setOffset(0);
  };
  
  useEffect(() => {
    if(open) {
      recordsHandler()
    }
  }, [limit, offset, recordsHandler, open])

  
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
              <div className='user-score'>
                  Your best Time:
                  <span className='time-record'>{bestTime}</span>
              </div>
            {boardTimes ? 
              <ScoresTable
                boardTimes={boardTimes}
                rankLogoGenerator={rankLogoGenerator}
                offset={offset}
                setOffset={setOffset}
                limit={limit}
                setLimit={setLimit}
                countTimes={countTimes}
              />
              :
              <div className='loader'>
                <Loader />
              </div>
              }
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
width: 400px;
@media (max-width: 575px) {
  width: 320px;
}
transform: translate(-50%, -50%);
.modal-title {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
  svg {
    color: yellow;
    filter: invert(10%);
  }
}
.user-score {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  .time-record {
    color: var(--green-color);
    margin-left: 7px;
  }
}
.time-record {
  letter-spacing: 2px;
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
.loader {
  margin-top: 15px; 
  background-color: var(--fourth-color);
  opacity: 0.4;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
}
`
