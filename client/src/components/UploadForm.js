import React, {useCallback, useState} from "react";
import axios from 'axios';
import './UploadForm.css';
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const defaultFileName = '📷 이미지 파일을 업로드 해주세요.';
    const [fileName, setFileName] = useState(defaultFileName);
    const [percent, setPercent] = useState(0);
    const onChangeInput = useCallback((e) => {
        console.log(e.target.files);
        const image = e.target.files[0];
        setFile(image);
        setFileName(image.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = (e) => setImgSrc(e.target.result);
    }, [])
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file)
        try {
            const res = axios.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    setPercent(Math.round((100 * e.loaded) / e.total ));
                }
            })
            toast.success('업로드 성공!');
            console.log(res);
            setTimeout(() => {
                setPercent(0);
                setFileName(defaultFileName);
                setImgSrc(null);
            }, 2000);
        } catch(err) {
            toast.error('업로드 실패!');
            console.log(err);
            setPercent(0);
            setFileName(defaultFileName);
            setImgSrc(null);
        }
    }, [file])

    return (
        <>
            <form onSubmit={onSubmitForm}>
                <img src={imgSrc} alt={imgSrc} className={`img-preview ${imgSrc && 'img-preview--show'}`} />
                <ProgressBar percent={percent}/>
                <div className='file-dropper'>
                    <label htmlFor='image'>{fileName}</label>
                    <input id='image' type='file' accept='image/*' onChange={onChangeInput} />
                </div>
                <button type='submit' style={{ width: '100%', height: '35px' }}>업로드</button>
            </form>
        </>
    )
}

export default UploadForm;