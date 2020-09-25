import React, {useContext,useState} from 'react';

import {ProductButton} from "./Button";
import Product from "./Product";
import Title from "./components2/Title";
import {ProductContext} from "../context";
import LoadingSpinner from "./ui/LoadingSpinner";

const ProductList = () =>{
    //making use of the useContext hook to consume the context we created
    const message = useContext(ProductContext);
    const {items} = message
    const [category,setCategory] = useState();

    if(items){
        return(
            <div>
                { message.isLoading && <LoadingSpinner asOverlay/>}
                <div className="d-flex align-items-center justify-content-center flex-row">
                    <ProductButton onClick={()=>{
                        //const categories = [...new Set(message.items.map(item=>item.category))];
                        //console.log(categories);
                    }}>
                        <span className="mr-2"><i className="fa fa-mobile" aria-hidden="true" /></span>Mobile Phone
                    </ProductButton>
                    <ProductButton onClick={()=>{
                    }}>
                        <span className="mr-2"><i className="fa fa-male" aria-hidden="true" /></span><span className="mr-2"><i className="fa fa-female" aria-hidden="true" /></span>Clothing
                    </ProductButton>
                    <ProductButton>Others</ProductButton>
                </div>
                <div className="py-3">
                    <div className="container">
                        <Title name="our" title="products"/>
                        <div className="row">
                            {items.map(product => {
                                return <Product
                                    product={product} key={product.id} image={product.image} id={product.id}
                                    name={product.name} inCart={product.inCart} price={product.price}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="height-80 d-flex justify-content-center align-items-center blueText">
            <p className="blueText text-uppercase">no items yet</p>
        </div>
    )

};

export default ProductList;
