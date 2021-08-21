import React, {useCallback, useContext, useState} from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [, setMe] = useContext(AuthContext);
    const history = useHistory();

    const onSubmitForm = useCallback(async (e) => {
        try {
            e.preventDefault();
            // if(nickname.length < 3) throw new Error('닉네임은 3자 이상이어야 합니다.');
            // if(password.length < 6) throw new Error('비밀번호는 6자 이상이어야 합니다.');
            if(password !== passwordCheck) throw new Error('비밀번호가 다릅니다.');
            const result = await axios.post('/user/register', { nickname, email, password });
            setMe({
                nickname: result.data.nickname,
                sessionId: result.data.sessionId,
                userId: result.data.userId,
            })
            history.push('/');
            toast.success('회원가입 성공!');
        } catch(err) {
            console.error(err.response);
            toast.error(err.response.data.message);
        }
    }, [email, nickname, password, passwordCheck, setMe, history]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>회원가입</h1>
            <form onSubmit={onSubmitForm} style={{ display: 'flex', flexDirection: 'column', maxWidth: '60%', margin: '20px auto' }}>
                <CustomInput label='닉네임' value={nickname} setValue={setNickname} />
                <CustomInput label='이메일' value={email} setValue={setEmail} />
                <CustomInput label='비밀번호' value={password} setValue={setPassword} type='password' />
                <CustomInput label='비밀번호 확인' value={passwordCheck} setValue={setPasswordCheck} type='password' />
                <button type='submit' style={{ marginTop: 20, height: 30 }}>가입하기</button>
            </form>
        </div>
    )
}

export default RegisterPage;