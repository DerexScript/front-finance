import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
});
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
