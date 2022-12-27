import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';

const baseURL = 'http://localhost:8000'

let tokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;

const axiosInstance = axios.create({
  baseURL,
  headers:{Authorization: `Bearer ${tokens.access}`}
});