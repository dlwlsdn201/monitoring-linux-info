import dotenv from 'dotenv';

dotenv.config();
const SERVER_PORT = 8000;
// console.log('TEST:', process.env);
export const BASE_URL = `${process.env.BASE_URL}:${SERVER_PORT}`;
