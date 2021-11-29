import React, { Component, useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(()=>{
        axios.get('/api/hello')
        .then(res => console.log(res.data))
    }, []);


    return(
        <div> 
            LandingPage 랭딩랭딩
        </div>
    )
}

export default LandingPage;