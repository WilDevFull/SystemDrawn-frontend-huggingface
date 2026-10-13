import axios from 'axios';

export const api =
  axios.create({
    baseURL:
      'https://system-drawn-backend-smoky.vercel.app',
    timeout: 15000,
  });