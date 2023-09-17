import {useEffect, useState} from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import {abstractTime, userBestTime} from '../../../../Utilities/Helpers/Time';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styled  from 'styled-components'

const StyledTableCell = muiStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: '600'
  },
}));

const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
  height: '60px',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ScoresTable(props) {
  const [userTime, setUserTime] = useState(0);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    props.setOffset((value - 1) * 5);
  };

  useEffect(() => {
    let time = 0;
    const getUserTime = async () => {
      time = await userBestTime();
      setUserTime(time);
    }
    getUserTime()
  }, [userTime])

  return (
    <TableStyle>
      <TableContainer>
        <Table sx={{ maxWidth: '100%', margin: '20px 0', borderRadius: '5px' }} aria-label="customized table">
          <TableHead>
            <TableRow className='head-row'>
              <StyledTableCell align="center" maxWidth={'30px'}>#</StyledTableCell>
              <StyledTableCell align="center" maxWidth={'150px'}>Name</StyledTableCell>
              <StyledTableCell align="center" maxWidth={'150px'}>Time Record&nbsp;(s)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.boardTimes.map((e, idx) => (
              <StyledTableRow
                key={idx}
                className={e.best_time === userTime ? 'user-row' : ''}
                >
                <StyledTableCell align="center">{props.rankLogoGenerator(idx + props.offset + 1)}</StyledTableCell>
                <StyledTableCell align="center">{e.username}</StyledTableCell>
                <StyledTableCell align="center">{abstractTime(e.best_time)}</StyledTableCell>
              </StyledTableRow>
            ))}
            
          </TableBody>
        </Table>
        { (props.limit !== 5) && props.boardTimes ?
                  <button 
                  onClick={() => props.setLimit(5)}
                  className='show-more'
                  >
                  Show more
                  </button>
                  :
                  <Stack spacing={2} className='pagination-container'>
                      <Pagination
                        className='pagination'
                        count={Math.ceil(props.countTimes / 5)}
                        shape="rounded"
                        color="primary"
                        size='small'
                        page={page}
                        onChange={handlePageChange} />
                  </Stack>
            }
      </TableContainer>
    </TableStyle>
  );
}

const TableStyle = styled.div`
.head-row {
  background-color: var(--second-color);
  height: 60px;
}
.user-row {
  background-color: var(--green-color) !important;
  td {
    color: white;
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
    // li {
    //   button {
    //     background-color: var(--second-color);
    //     color: white;
    //   }
    // }
  }
}
`