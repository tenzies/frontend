import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {abstractTime, userBestTime, fetchTimes} from '../../../Utilities/Helpers/Time';
import Loader from '../../../Utilities/Assets/Loader';
import styled from 'styled-components'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// export default function PaginationRounded() {
//   return (
    
//   );
// }

import {useCallback, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function Leaderboard({open, setOpen}) {
  const [boardTimes, setBoardTimes] = useState(null);
  const [countTimes, setCountTimes] = useState(0);

  useEffect(() => {
    const getAllRecordsCount = async () => {
      const allRecords = await fetchTimes();
      setCountTimes(allRecords.length)
    }
    getAllRecordsCount()
  }, [])

  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
    setOffset((value - 1) * 5);
  };
  const handleOpen = async () => {
    setOpen(true)
    recordsHandler()
  };
  const handleClose = () => {
    setOpen(false)
    setLimit(3);
    setOffset(0);
  };
  
  const recordsHandler = useCallback (async () => {
    const records = await fetchTimes(limit, offset);
    setBoardTimes(records)
  }, [limit, offset])

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
              <div className='user-scores'>
                  Your best Time: <span className='time-record'>{abstractTime(userBestTime())}</span>
              </div>
            <div className='leaderboard-scores'>
              <div className='leaderboard-scores-header'>
              <span>#</span><span>name</span><span>time record</span>
              </div>
              {boardTimes ? boardTimes.map((e,i) => (                
                <div>
                <span>{i + 1 + offset}</span>
                <span>{e.username}</span>
                <span className='time-record'>{abstractTime(e.best_time)}</span>
                </div>
                )
                ):
                <Loader/>
                }
              </div>
              { (limit !== 5) && boardTimes ?
                <button 
                onClick={() => setLimit(5)}
                className='show-more'
                >
                Show more
                </button>
                :
                <Stack spacing={2} className='pagination-container'>
                    <Pagination
                      className='pagination'
                      count={Math.ceil(countTimes / 5)}
                      variant="outlined"
                      shape="rounded" 
                      size='small'
                      page={page}
                      onChange={handlePageChange} />
                 </Stack>
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
min-width: 300px;
max-width: 400px;
transform: translate(-50%, -50%);
.time-record{
  letter-spacing: 3px;
  margin-left: 5px;
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
  margin-bottom: 10px;
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
.show-more {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--third-color);
  width: fit-content;
  font-weight: bold;
  border: 0;
  border-radius: 5px;
  padding: 15px;
  margin-top: 10px;
  color: white;
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    background-color: var(--first-color);
  }
}
.pagination-container {
  margin-top: 10px;
  ul {
    justify-content: center;
  }
}
`