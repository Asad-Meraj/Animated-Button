import axios from "axios";
import { BASE_URL } from '../constants/urls';

const request = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export default request;
