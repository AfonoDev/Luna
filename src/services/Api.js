import axios from 'axios';

export const Api = axios.create({
    baseURL:"https://api.binance.com",
});
export const ApiDolar = axios.create({
    baseURL:"https://economia.awesomeapi.com.br/json",
});