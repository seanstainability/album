import React, {useContext} from "react";
import UploadForm from "../components/UploadForm";
import ImageList from "../components/ImageList";
import {AuthContext} from "../context/AuthContext";

const MainPage = () => {
    const [me] = useContext(AuthContext);
    return (
        <>
            <h1>사진첩</h1>
            {me && (<UploadForm/>)}
            <ImageList/>
        </>
    )
}

export default MainPage;