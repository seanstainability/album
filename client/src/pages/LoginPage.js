import React, {useCallback, useContext, useState} from "react";
import CustomInput from "../components/CustomInput";
import {toast} from "react-toastify";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setMe] = useContext(AuthContext);
    const history = useHistory();

    const onLogIn = useCallback(async (e) => {
        try {
            e.preventDefault();
            const result = await axios.patch('/user/login', { email, password });
            setMe({
                nickname: result.data.nickname,
                sessionId: result.data.sessionId,
                userId: result.data.userId,
            })
            history.push('/');
            toast.success('로그인 성공!');
        } catch(err) {
            console.error(err.response);
            toast.error(err.response.data.message);
        }
    }, [email, history, password, setMe]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>로그인</h1>
            <form onSubmit={onLogIn} style={{ display: 'flex', flexDirection: 'column', maxWidth: '60%', margin: '20px auto' }}>
                <CustomInput label='이메일' value={email} setValue={setEmail} />
                <CustomInput label='비밀번호' value={password} setValue={setPassword} type='password' />
                <button type='submit' style={{ marginTop: 20, height: 30 }}>입장하기</button>
            </form>
        </div>
    )
}

export default LoginPage;