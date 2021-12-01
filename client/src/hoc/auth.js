import { Axios } from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';

export default function authCheck(SpecificComponent, option, adminRoute = null) {
    //SpecificComponent: 감싼 페이지  , option:(null(아무나),true(로그인만),false(로그인하면불가)) adminRoute: true면 어드민만 들어감
    function AuthenticationCheck(props){
        let navigate = useNavigate();
        const dispatch = useDispatch();
        //백엔드에 리퀘스트를 날려서 그 유저의 현재 상태를 가져옴
        useEffect(()=> {
            dispatch(auth())
            .then(response => {
            console.log(response);
        })
           
        },[])

    }

    return AuthenticationCheck
}
