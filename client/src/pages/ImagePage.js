import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {ImageContext} from "../context/ImageContext";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {toast} from "react-toastify";

const ImagePage = () => {
    const history = useHistory();
    const { imgId } = useParams();
    const { images, myImages, setImages, setMyImages } = useContext(ImageContext);
    const [me] = useContext(AuthContext);
    const [liked, setLiked] = useState(false);
    const image = images.find((img) => img._id === imgId) || myImages.find((img) => img._id === imgId);
    useEffect(() => {
        if(me && image && image.likes.includes(me.userId)) {
            setLiked(true);
        }
    }, [me, image])
    const updateImage = (images, image) => {
        return [...images.filter((img) => img._id !== imgId), image]
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    const onDeleteImage = useCallback(async () => {
        try {
            if(!window.confirm('정말 해당 이미지를 삭제하시겠습니까?')) return;
            const result = await axios.delete(`/${imgId}`);
            toast.success(result.data.message);
            setImages(images.filter((img) => img._id !== imgId));
            setMyImages(myImages.filter((img) => img._id !== imgId));
            history.push('/');
        } catch(err) {
            toast.error(err.message);
        }
    }, [])
    const onSubmit = useCallback(async () => {
        const result = await axios.patch(`/${imgId}/${liked ? 'unlike' : 'like'}`);
        if(result.data.public) setImages(updateImage(images, result.data))
        else setMyImages(updateImage(myImages, result.data));
        setLiked(!liked);
    }, [images, imgId, liked, myImages, setImages, setMyImages])
    if(!image) return <h3>Loading...</h3>;
    return (
        <>
            <div style={{ marginTop: 20, marginBottom: 5 }}>
                <span>👍🏻 {image.likes.length}</span>
                {me && image.user._id === me.userId && (
                    <button style={{ float: 'right', marginLeft: 5 }} onClick={onDeleteImage}>삭제</button>
                )}
                {liked ?
                    (<button style={{ float: 'right' }} onClick={onSubmit}>좋아요 취소</button>)
                    :
                    (<button style={{ float: 'right' }} onClick={onSubmit}>좋아요</button>)
                }
            </div>
            <div>
                <img src={`http://localhost:5000/uploads/${image.key}`} alt={image.key} style={{ width: '100%' }}/>
            </div>
        </>
    )
}

export default ImagePage;