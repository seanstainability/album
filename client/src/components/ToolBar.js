import React, {useCallback, useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {toast} from "react-toastify";
import axios from "axios";

const ToolBar = () => {
    const [me, setMe] = useContext(AuthContext);
    const onLogOut = useCallback(async () => {
        try {
            await axios.patch('/user/logout');
            setMe('');
        } catch(err) {
            console.error(err);
            toast.error(err.message);
        }
    }, [setMe]);
    return (
        <div style={{ marginTop: 20 }}>
            <Link to='/'><span>홈</span></Link>
            {me ? (
                <>
                    <span onClick={onLogOut} style={{ float: 'right', cursor: 'pointer' }}>로그아웃</span>
                    <span style={{ float: 'right', marginRight: '10px', fontWeight: 'bold' }}>{me.nickname}</span>
                </>
            ) : (
                <>
                    <Link to='/auth/register'><span style={{ float: 'right' }}>회원가입</span></Link>
                    <Link to='/auth/login'><span style={{ float: 'right', marginRight: '10px' }}>로그인</span></Link>
                </>
            )}

        </div>
    )
}

export default ToolBar;