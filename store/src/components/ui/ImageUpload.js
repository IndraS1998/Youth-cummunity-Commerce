import React, {useRef,useState,useEffect,useContext} from 'react';

import './ImageUpload.css';
import {ProductContext} from "../../context";
import {CartButton} from "../Button";

const ImageUpload = props =>{
    const filePickerRef = useRef();
    const [previewUrl,setPreviewUrl] = useState();
    const [isValid,setIsValid] = useState(false);
    const message = useContext(ProductContext);

    useEffect(()=>{
        if(!message.file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () =>{
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(message.file);
    },[message.file]);

    const onSelectImage= () =>{
        filePickerRef.current.click();
    };

    const onPickImage= event =>{
        let pickedFile;
        if(event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            message.setFile(pickedFile);
            setIsValid(true);
        }else{
            return;
        }

    };

    return(
        <div >
            <input type="file" style={{display:'none'}} onChange={onPickImage} accept=".jpg,.png,.jpeg" ref={filePickerRef}/>
            <div className="image-upload center">
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview"/>}
                    {!previewUrl && <p className="blueText">please select an image</p>}
                </div>
                <CartButton type="button" onClick={onSelectImage}>Pick Image</CartButton>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
};
export default ImageUpload;
