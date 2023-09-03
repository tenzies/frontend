import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import showToastify from './Toastify';

const url = process.env.REACT_APP_SERVER_URL;

export function SignupHandler(formData, setIsLoading) {
  const navigate = useNavigate();
  return async function signup() {
    setIsLoading(true);
    const { data } = await axios.post(url + '/api/signup', formData);
    showToastify(data.status, data.msg);
    if(data.status === 201) {
    setTimeout(() => {
      navigate('/login');
      setIsLoading(false);
    }, 2000)}
    else {
      setIsLoading(false);
    }
  }
}

export function LoginHandler(formData, setIsLoading) {
  const navigate = useNavigate();
  return async function login() {
    setIsLoading(true)
    const {data} = await axios.post(url + '/api/login', formData);
    showToastify(data.status, data.msg);
    if(data.status === 200) {
      setTimeout(() => {
        localStorage.setItem('user_data', JSON.stringify(data.body));
        setIsLoading(false)
        navigate('/');
      }, 2000)}
    else {
      setIsLoading(false);
    }
  }
}

export function LogoutHandler() {
  const navigate = useNavigate();
  return function logout() {
    localStorage.removeItem('user_data');
    navigate('/login');
  }
}

export async function UpdateHandler(current_time) {
  const { username } = JSON.parse(localStorage.getItem('user_data'));
  const { data } = await axios.put(url + '/api/update', { username, current_time });
  if(data.status === 204) {
    showToastify(data.status, data.msg);
    localStorage.setItem('user_data', JSON.stringify(data.body));
  }
  return data
}

export async function GetTimeRecords(limit, offset) {
  try {
    const { data } = await axios.post('/api/time-records',{
      limit: limit,
      offset: offset
    });
    return data;
  }
  catch (e) {
    console.log('Failed to get time records Error: ', e)
  }
}
export function useIsLoggedIn() {
  const navigate = useNavigate()
  return function checkLogin() {
    const isLoggedIn = localStorage.getItem('user_data');
    if(!isLoggedIn) {
      navigate('/login')
    }
  }
}