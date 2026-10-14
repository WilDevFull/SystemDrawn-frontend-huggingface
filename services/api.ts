
import axios from 'axios';

export const api = axios.create({
 
  baseURL: 'http://localhost:3000',
  timeout: 90000, // 90 segundos (tempo ideal para a IA processar a imagem)
});