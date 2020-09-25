import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {ProductContext} from "../context";
import {ButtonContainer} from "./Button";

const Details = () =>{
    const message = useContext(ProductContext);
    const {id,name,image,price,inCart,category,description} = message.detail;
    return(
        <div className="container py-5">
            {/*title*/}
            <div className="row">
                <div className="col-10 mx-auto text-center text-blue my-5">
                    <p className="text-uppercase rem">{name}</p>
                </div>
            </div>
            {/*title end*/}
            {/*product info*/}
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <img src={`http://localhost:5000/${image}`} alt="product" className="img-fluid"/>
                </div>
                {/*product text*/}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    name :<p className="text-uppercase rem">{name}</p>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                        category : <span className="text-capitalize blueText"> {category} </span>
                    </h4>
                    <h4 className="text-blue">
                        <strong>
                            price : <span>XAF</span> {price}
                        </strong>
                    </h4>
                    <h5 className="text-capitalize mt-3 mb-0 font-weight-bold text-center ">
                        some info about the product
                        <p className="blueText"> {description} </p>
                    </h5>
                    {/*buttons*/}
                    <div>
                        <Link to='/Products'>
                            <ButtonContainer>
                                back to products
                            </ButtonContainer>
                        </Link>
                        <ButtonContainer cart disabled={inCart} onClick={ ()=> {
                            message.addToCart(id);
                            message.onOpenModal(id);
                        }}>
                            {inCart ? 'inCart':'add to cart'}
                        </ButtonContainer>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Details;
