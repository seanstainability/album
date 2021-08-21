import React, {useCallback, useContext} from "react";
import {ImageContext} from "../context/ImageContext";
import {AuthContext} from "../context/AuthContext";
import '../components/imageList.css';
import {Link} from "react-router-dom";

const ImageList = () => {
    const {images, myImages, isPublic, setIsPublic} = useContext(ImageContext);
    const [me] = useContext(AuthContext);
    const imgList = (isPublic ? images : myImages).map((img) => (
        <Link to={`/images/${img._id}`} key={img.key}>
            <img src={`http://localhost:5000/uploads/${img.key}`} alt={img.key} />
        </Link>
    ))
    const onClickPrivate = useCallback(() => {
        setIsPublic(!isPublic);
    }, [isPublic, setIsPublic])
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ display: 'inline-block' }}>업로드 사진({isPublic ? '공개' : '개인'})</h3>
                {me && <button onClick={onClickPrivate} style={{ height: 30 }}>{isPublic ? '개인' : '공개'} 사진 보기</button>}
            </div>
            <div className='img-container'>
                {imgList}
            </div>
        </>
    )
}

export default ImageList;