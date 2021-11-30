import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
}from './types';

export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)
    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    console.log('유저 엑션 레지스터');
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)
    console.log(request);
    return{
        type: REGISTER_USER,
        payload: request
    }
}