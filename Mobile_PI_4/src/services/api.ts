import axios from 'axios';

export const api = axios.create({
  baseURL: 'https:192.168.100.164:3000', // coloque sua URL base da API aqui
  timeout: 5000,
});
