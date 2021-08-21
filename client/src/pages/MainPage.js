import React from "react";
import UploadForm from "../components/UploadForm";
import ImageList from "../components/ImageList";

const MainPage = () => {
    return (
        <>
            <h1>사진첩</h1>
            <UploadForm/>
            <ImageList/>
        </>
    )
}

export default MainPage;