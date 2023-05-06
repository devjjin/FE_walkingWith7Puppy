import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const api = axios.create({
  baseURL: `${API_URL}`,
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const user = axios.create({
  baseURL: `${API_URL}`,
});
