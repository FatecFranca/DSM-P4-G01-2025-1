import axios from 'axios';

const API_URL = 'https://pi-backend-4.onrender.com'; 
// const API_URL = 'https://192.168.100.164:9000'; 



export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/login/signin`, { email, password });
  return response.data;
}

export async function signup(user: string, email: string, password: string, confirmedPassword: string) {
  const response = await axios.post(`${API_URL}/login/signup`, {
    user,
    email,
    password,
    confirmedPassword
  });
  return response.data;
}
