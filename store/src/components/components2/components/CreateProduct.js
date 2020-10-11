import React, {useState,useContext} from 'react';

import ImageUpload from "../../ui/ImageUpload";
import {ProductContext} from "../../../context";
import {BodyButton} from "../../Button";
import LoadingSpinner from "../../ui/LoadingSpinner";

const CreateProduct = () =>{
    const message = useContext(ProductContext);

    const [name,setName] = useState('');
    const [category,setCategory] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');

    const onSetName = e =>setName(e.target.value);
    const onSetCategory = e => setCategory(e.target.value);
    const onSetDescription = e => setDescription(e.target.value);
    const onSetPrice = e => setPrice(e.target.value);

    return(
        <div className="height-80 my-3">
            {message.isLoading && <LoadingSpinner asOverlay/>}
            <form onSubmit={async e =>{
                e.preventDefault();
                message.setIsLoading(true);
                if(name && description && message.file && category && price){
                    const formData = new FormData();
                    formData.append('name',name);
                    formData.append('price',price);
                    formData.append('description',description);
                    formData.append('category',category);
                    formData.append('image',message.file);
                    try{
                        const response = await fetch('http://localhost:5000/products/new_product',{
                            method: 'POST',
                            body : formData,
                            headers:{
                                Authorization : 'Bearer ' + message.token
                            }
                        });
                        if(!response.ok){
                            message.setError('something went wrong');
                            message.setModalOpen(true);
                            message.setIsLoading(false);
                            return ;
                        }
                        await message.onGetProducts();
                        message.setIsLoading(false);
                        alert('item successfully created')
                    }catch (e){
                        message.setError(e.message);
                        message.setModalOpen(true);
                        message.setIsLoading(false);
                        return null;
                    }
                }else{
                    message.setIsLoading(false);
                    message.setError('Wrong data, fill all spaces');
                    message.setModalOpen(true);
                }
            }}>
                <div className="form-group">
                    <input type="text" className="form-control" onChange={event => onSetName(event)} placeholder="name"/>
                </div>
                <div className="form-group">
                    <div className="dropdown show">
                        <BodyButton className="dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></BodyButton>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <BodyButton className="dropdown-item" onClick={()=>setCategory("devices")}> device</BodyButton>
                            <BodyButton className="dropdown-item" onClick={()=>setCategory("accessories")}>accessories</BodyButton>
                            <BodyButton className="dropdown-item" onClick={()=>setCategory("clothing")}>cloth</BodyButton>
                            <BodyButton className="dropdown-item" onClick={()=>setCategory("other")}>other</BodyButton>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <textarea  className="form-control"  placeholder="description" onChange={event => onSetDescription(event)}/>
                </div>
                <div>
                    <ImageUpload />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="price" onChange={event => onSetPrice(event)}/>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <BodyButton>Create</BodyButton>
                </div>
            </form>
        </div>
    )
};

export default CreateProduct;
