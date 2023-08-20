import styled from 'styled-components';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

export default function TimeCounter({startTime}) {
  const milliseconds = startTime.milliseconds.toString().padStart(2, '0');
  const seconds = startTime.seconds.toString().padStart(2, '0');
  const minutes = startTime.minutes.toString().padStart(2, '0');
  return (
        <TimerContainer>
          <AccessTimeRoundedIcon/>
          <span className="minutes">{minutes}</span>
          :<span className="seconds">{seconds}</span>
          .<span className="milliseconds">{milliseconds}</span>
        </TimerContainer>
  )
}

const TimerContainer = styled.div`
display: flex;
align-items: center;
gap: 5px;
color: white;
letter-spacing: 1.5px;
& svg {
  color: var(--third-color);
}
`