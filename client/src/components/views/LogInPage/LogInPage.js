import axios, { Axios } from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';

function LogInPage(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler =(event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
            if (response.payload.loginSuccess) {
                console.log(props.history)
                navigate(process.env.PUBLIC_URL + "/");
            } else {
                alert('Error')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <br/>
                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <br/>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LogInPage;