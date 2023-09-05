import styled from 'styled-components'
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';

export default function RollCounter({rollCount}) {
  return (
    <RollsContaniner>
      <CasinoRoundedIcon/>{rollCount.toString().padStart(2, '0')}
    </RollsContaniner>
  )
}

const RollsContaniner = styled.div`
color: white;
display: flex;
align-items: center;
gap: 5px;
letter-spacing: 1.5px;
& svg {
  color: var(--third-color);
}
@media (max-width: 575px) {
  letter-spacing: 1px;
  font-size: 12px;
  & svg {
    font-size: 12px;
  }
}
`