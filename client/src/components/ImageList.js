import React, {useContext} from "react";
import {ImageContext} from "../context/ImageContext";

const ImageList = () => {
    const [images] = useContext(ImageContext);
    const imgList = images.map((img) => <img key={img.key} src={`http://localhost:5000/uploads/${img.key}`} alt={img.key} style={{ width: '100%' }} />)
    return (
        <>
            <h2>업로드 사진</h2>
            {imgList}
        </>
    )
}

export default ImageList;