import { getUserLocalStorage } from './../context/AuthProvider/util';
import axios, { AxiosRequestConfig } from 'axios';

export const Api = axios.create({
  baseURL: 'https://api.finanies.tk/api/v1/',
  withCredentials: false,
});

Api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers !== undefined && (config.headers.Authorization = `Bearer ${getUserLocalStorage()?.token}`);
    return config;
  },
  error => Promise.reject(error),
);

/*
export const Api = async () => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json; charset=utf-8');
  const formData = { user: user, password: password };
  const reqConfig = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(formData),
  };
  const res = await fetch('http://localhost:8000/api/user/auth', reqConfig);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
  }
};
*/
