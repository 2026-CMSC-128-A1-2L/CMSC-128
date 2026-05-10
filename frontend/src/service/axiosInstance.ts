// src/services/axiosInstance.ts
import axios from 'axios';
import { API_URL } from './constant';

export const api = axios.create({
  baseURL: '',
  withCredentials: true,
});
