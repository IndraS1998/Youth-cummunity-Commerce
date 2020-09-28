import React,{useContext}  from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductContext} from "../context";
import PropTypes from 'prop-types';


const Product = props =>{
    const {id,image,price,inCart} = props;
    const message = useContext(ProductContext);
    const {handleDetail,addToCart,onOpenModal} = message;

    return(
        <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3" >
            <div className="card">
                <div className="img-container p-5" onClick={()=> {
                    handleDetail(id);
                }}>
                    <Link to="/details">
                        <img src={`http://localhost:5000/${image}`} alt="product" className="card-img-top images"/>
                    </Link>
                    <button className="cart-btn" disabled={!!inCart} onClick={()=>{
                        addToCart(id);
                        onOpenModal(id);
                    }}>
                        {inCart ? (<p className="text-capitalize mb-0" disabled>inCart</p>) : (<i className="fas fa-cart-plus"/>)}
                    </button>
                </div>
                {/* card footer*/}
                <div className="card-footer d-flex justify-content-between">
                    <p className="align-self-center mb-0 ">{props.name}</p>
                    <h5 className="text-blue mb-0">
                        <span className="mr-1">XAF</span>{price}
                    </h5>
                </div>
            </div>
        </ProductWrapper>
    )
};

Product.propTypes = {
    product : PropTypes.shape({
        id:PropTypes.string,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired
};


const ProductWrapper = styled.div`
    .card{
        background:var(--myWhite);
        border-color:transparent;
        transition:all 1s linear;
    }
    .card-footer{
        background:transparent;
        border-top:transparent;
        transition:all 1s linear;
    }
    &:hover{
        .card{
            border:0.04rem solid rgba(0,0,0,0.2);
            box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);   
        }
        .card-footer{
            background:rgba(247,247,247 );
        }
    }
    .img-container{
        position:relative; 
        overflow:hidden;
    }
    .img-container:hover .card-image-top{
        transform : scale(1.2);
    }
    .card-img-top{
        transition:all 3s linear;
    }
    .cart-btn{
        position:absolute;
        bottom:0;
        right:0;
        padding:0.2rem 0.4rem;
        background:var(--mainRed);
        border:none;
        font-size:1.4rem;
        color:var(--mainWhite);
        border-radius: 0.5rem 0 0 0;
    }
    .cart-btn:hover{
        color:var(--mainBlue);
        cursor:pointer;
        transition:all 3s linear;
    } 
`;

export default Product;
