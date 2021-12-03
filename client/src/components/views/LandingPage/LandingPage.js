import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import NavBar from '../NavBar/NavBar'
function LandingPage() {
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get('/api/hello')
        .then(res => console.log(res.data))
    }, []);

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
        .then(response => {
            if (response.data.success) { //이부분은 서버 인덱스에서 오는부분이다.
                alert('로그아웃');
                navigate("/login");
            } else {
                alert('Error')
            }
        })
    }

    return(
        <div>
            <NavBar />
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage;