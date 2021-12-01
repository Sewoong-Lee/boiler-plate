import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function a(state={}, action){
    console.log('유저 리덕스');
    switch (action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload};
        case REGISTER_USER:
            console.log('유저 리덕스 케이스 레지스터');
            return {...state, registerSuccess: action.payload};
        case AUTH_USER:
            return {...state, userData: action.payload};
        default:
            return state;
    }
}