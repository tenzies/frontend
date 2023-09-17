import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import showToastify from './Toastify';

const url = process.env.REACT_APP_SERVER_URL;

export function SignupHandler(formData, setIsLoading) {
  const navigate = useNavigate();
  return async function signup() {
    setIsLoading(true); 
    const {username, password} = formData;
    const encodedData = btoa(`${username}:${password}`);
    const { data } = await axios({
      'method': 'POST',
      'url': url + '/api/signup',
      'headers': {
        'Authorization': `Basic ${encodedData}`
      }
    });
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
    const {username, password} = formData;
    const encodedData = btoa(`${username}:${password}`);
    const { data } = await axios({
      method: 'POST',
      url: url + '/api/login',
      headers: {
        Authorization: `Basic ${encodedData}`
      }
    });
    showToastify(data.status, data.msg);
    if(data.status === 200) {
      setTimeout(() => {
        Cookies.set('user_token', data.token);
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
    Cookies.remove('user_token');
    navigate('/login');
  }
}

export async function UpdateHandler(current_time) {
  const token = Cookies.get('user_token');
  const { data } = await axios({
    method: 'PUT',
    url: url + '/api/update',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      current_time: current_time
    }
  });
  if(data.status === 204) {
    Cookies.set('user_token', data.token);
    showToastify(data.status, data.msg);
  }
  return data
}

export async function fetchUserData() {
  if(Cookies.get('user_token')) {
    const token = Cookies.get('user_token');
    const { data } = await axios({
      url: url + '/api/user-data',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  }
  else {
    return false
  }
}

export function useIsLoggedIn() {
  const navigate = useNavigate()
  return function checkLogin() {
    const isLoggedIn = Cookies.get('user_token');
    if(!isLoggedIn) {
      navigate('/login')
    }
  }
}