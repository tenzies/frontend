import axios from 'axios';
import { fetchUserData } from './UserHandlers';

export const abstractTime = (str) => {
  const record = parseInt(str);
  let minutes, seconds, milliseconds;
  if(record === 0 || isNaN(record) || record >= Number.MAX_SAFE_INTEGER) {
    minutes = seconds = milliseconds = '--';
  } else {
    const time = new Date(record)
    minutes = time.getMinutes().toString().padStart(2, '0');
    seconds = time.getSeconds().toString().padStart(2, '0');
    milliseconds = (time.getMilliseconds() / 10).toString().padStart(2, '0');
  }
  return `${minutes}:${seconds}.${milliseconds}`
};

export const toMilliSeconds = ({minutes, seconds, milliseconds}) => {
  // Milliseconds are inside the object as percentage of a second
  const msTime = minutes * 60000 + seconds * 1000 + milliseconds * 10;
  return msTime;
}

export const userBestTime = async () => {
  const result = await fetchUserData();
  return result.best_time;
};

export async function getTimeRecords(limit, offset) {
  try {
    const url = process.env.REACT_APP_SERVER_URL;
    const { data } = await axios.post(url + '/api/time-records',{
      limit: limit,
      offset: offset
    });
    return data;
  }
  catch (e) {
    console.log('Failed to get time records Error: ', e)
  }
}