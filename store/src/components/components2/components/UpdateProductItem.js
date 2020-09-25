import React,{useContext} from 'react';
import styled from "styled-components";
import {EasyButton} from "../../Button";
import {ProductContext} from "../../../context";

const UpdateProductItem =props =>{
    const {price,name,description,id,img} = props;
    const message = useContext(ProductContext);

    return(
        <ProductWrapper>
            <div className="row mx-auto my-1">
                <div className="col-md-2 d-flex align-items-center justify-content-center"><h5>{name}</h5></div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">{description}</div>
                <div className="col-md-2 d-flex align-items-center justify-content-center">{price}</div>
                <div className="col-md-2 d-flex align-items-center justify-content-center"><EasyButton onClick={()=>{
                    message.setId(id);
                    message.setEdit(true);
                    message.setModalOpen(true);
                }}>edit</EasyButton></div>
                <div className="col-md-2 d-flex align-items-center justify-content-center"><ButtonContainer onClick={()=>{
                    message.setId(id);
                    message.setDeleteP(true);
                    message.setModalOpen(true);
                }}>delete</ButtonContainer></div>
            </div>
        </ProductWrapper>
    )
};

const ProductWrapper = styled.div`
    background:var(--myWhite);
`;
const ButtonContainer = styled.div`
    font-size:0.8rem;
    padding:0.1rem 0.2rem;
    margin:1.3rem 0.3rem;
    background: var(--mainRed);
    cursor:pointer;
    color:var(--mainWhite);
    border-radius:0.5rem;
    border:0.05rem solid var(--mainWhite);
    transition:all 1s ease-in-out;
    &:hover{
        color:var(--myWhite);
        border:0.05rem solid var(--myWhite);
        }
`;

export default UpdateProductItem;
