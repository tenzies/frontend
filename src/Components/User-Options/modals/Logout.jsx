import styled from 'styled-components'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function Logout() {
  return (
    <LogoutContainer>
      <LogoutRoundedIcon/><span>Logout</span>
    </LogoutContainer>
  )
}

const LogoutContainer = styled.div`
display: flex;
align-items: center;
padding: 10px;
border-radius: 10px;
border: 2px solid #FD3B3B;
gap: 10px;
color: #FD3B3B;
transition: var(--transition-time);
span {
  font-weight: bold;
}
&:hover {
  cursor: pointer;
  background-color: #FD3B3B;
  color: white;
}
`