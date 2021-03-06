import React, {useCallback, useContext, useState} from "react";
import axios from 'axios';
import './UploadForm.css';
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import {ImageContext} from "../context/ImageContext";

const UploadForm = () => {
    const {images, setImages, myImages, setMyImages} = useContext(ImageContext);
    const [file, setFile] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const defaultFileName = 'π· μ΄λ―Έμ§ νμΌμ μλ‘λ ν΄μ£ΌμΈμ.';
    const [fileName, setFileName] = useState(defaultFileName);
    const [percent, setPercent] = useState(0);
    const [isPublic, setIsPublic] = useState(true);
    const onChangeInput = useCallback((e) => {
        // console.log(e.target.files);
        const image = e.target.files[0];
        setFile(image);
        setFileName(image.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = (e) => setImgSrc(e.target.result);
    }, [])
    const onChangePublic = useCallback(() => {
        setIsPublic(!isPublic);
    }, [isPublic])
    const onSubmitForm = useCallback(async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('public', isPublic);
        try {
            const res = await axios.post('/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    setPercent(Math.round((100 * e.loaded) / e.total ));
                }
            })
            if(isPublic) setImages([...images, res.data]);
            else setMyImages([...myImages, res.data]);
            toast.success('μλ‘λ μ±κ³΅!');
            // console.log(res.data);
            setTimeout(() => {
                setPercent(0);
                setFileName(defaultFileName);
                setImgSrc(null);
            }, 2000);
        } catch(err) {
            toast.error('μλ‘λ μ€ν¨!');
            console.log(err);
            setPercent(0);
            setFileName(defaultFileName);
            setImgSrc(null);
        }
    }, [file, images, setImages, isPublic, myImages, setMyImages])

    return (
        <>
            <form onSubmit={onSubmitForm}>
                <img src={imgSrc} alt={imgSrc} className={`img-preview ${imgSrc && 'img-preview--show'}`} />
                <ProgressBar percent={percent}/>
                <div className='file-dropper'>
                    <label htmlFor='image'>{fileName}</label>
                    <input id='image' type='file' accept='image/*' onChange={onChangeInput} />
                </div>
                <div style={{ float: 'right', margin: 10 }}>
                    <input type='checkbox' id='public-check' value={!isPublic} onChange={onChangePublic}/>
                    <label htmlFor='public-check'>λΉκ³΅κ°</label>
                </div>
                <button type='submit' style={{ width: '100%', height: '35px' }}>μλ‘λ</button>
            </form>
        </>
    )
}

export default UploadForm;