import React, {useContext,useEffect} from 'react';
import {ProductContext} from "../../../context";
import LoadingSpinner from "../../ui/LoadingSpinner";
import UpdateProductItem from "./UpdateProductItem";


const UpdateProduct = () =>{
    const message = useContext(ProductContext);

    useEffect(()=>{
        const getProducts = async () =>{
            message.setIsLoading(true);
            try{
                const response = await fetch('http://localhost:5000/products');
                const digest = await response.json();

                if(!response.ok){
                    message.setIsLoading(false);
                    message.setError(response.message);
                    message.setModalOpen(true);
                }
                console.log(message.items);
                message.setIsLoading(false);
                message.setItems(digest.products);
            }catch (e) {
                message.setError(e.message);
                message.setIsLoading(false);
                message.setModalOpen(true);
            }
        };
        getProducts();
    },[]);

    if(message.items.length < 1){
        return(
            <div className="blueText d-flex justify-content-center align-items-center">
                no products created yet
            </div>
        )
    }

    return(
        <div>
            { message.isLoading && <LoadingSpinner asOverlay/>}
            {message.items.map(item=>{
                return(
                    <UpdateProductItem id={item.id} key={item.id} name={item.name} price={item.price}
                        description={item.description} img={item.image}
                    />
                )
            })}
        </div>
    )
};

export default UpdateProduct;
