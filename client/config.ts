import dotenv from 'dotenv';

dotenv.config();
const SERVER_PORT = 8000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';
export const BASE_API_URL = `${BASE_URL}:${SERVER_PORT}`;
