import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerUser } from '../../../_actions/user_actions';

function RegisterPage() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler =(event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword){
            return alert('비밀번호가 올바르지 않습니다.');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        //Axios.post('/api/users/login', body)

        dispatch(registerUser(body))
            .then(response => {
            if (response.payload.success) { //이부분은 서버 인덱스에서 오는부분이다.
                alert('회원가입 성공');
                navigate("/login");
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
                <label>name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <br/>
                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <label>password Check</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br/>
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;