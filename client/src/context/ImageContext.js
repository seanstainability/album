import React, {createContext, useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "./AuthContext";

export const ImageContext = createContext();

export const ImageProvider = (props) => {
    const [images, setImages] = useState([]);
    const [myImages, setMyImages] = useState([]);
    const [isPublic, setIsPublic] = useState(true);
    const [me] = useContext(AuthContext);
    useEffect(() => { // 공개 이미지
        axios.get('/images')
            .then((result) => {
                setImages(result.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])
    useEffect(() => { // 개인 이미지
        if(me) {
            setTimeout(() => {
                    axios.get('/user/me/images')
                        .then((result) => setMyImages(result.data))
                        .catch((err) => {
                            console.error(err);
                        });
            }, 0)
        } else {
            setMyImages([]);
            setIsPublic(true);
        }
    }, [me])
    return (
        <ImageContext.Provider value={{images, setImages, myImages, setMyImages, isPublic, setIsPublic}}>
            {props.children}
        </ImageContext.Provider>
    );
};