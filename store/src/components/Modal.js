import React, { useContext} from 'react';
import {ProductContext} from "../context";
import styled from "styled-components";
import {ButtonContainer,EasyButton} from "./Button";
import {Link} from "react-router-dom";

const Modal = props =>{
   const message = useContext(ProductContext);
   const {onCloseModal,modalOpen,modalProduct,error,description,onSetDescription,onSetPrice} = message;
   const {name,image,price} = modalProduct;



    return(
        <div>
            {function (){
                if(!modalOpen){
                    return null;
                }else{
                    if(error){
                        return(
                            <ModalContainer>
                                <div className="row">
                                    <div className="container text-danger text-title text-center col-12 text-capitalize p-5">
                                        {error}
                                    </div>
                                    <div className="text-center col-12">
                                        <EasyButton onClick={()=>message.clearError()}>Close modal</EasyButton>
                                    </div>
                                </div>
                            </ModalContainer>
                        )
                    }
                    if(message.edit){
                        return(
                            <ModalContainer>
                                <div className="container d-flex justify-content-center align-items-center flex-column">
                                    <div className="form-group">
                                        <input type="text" placeholder="description" className="form-control" value={description} onChange={e => onSetDescription(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="price" className="form-control" value={message.prices} onChange={e=>onSetPrice(e)}/>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <EasyButton onClick={() => message.onPerformEdit(description,message.prices)}>Perform Edit</EasyButton>
                                        <EasyButton onClick={message.closeEdit}>Back</EasyButton>
                                    </div>
                                </div>
                            </ModalContainer>
                        )
                    }
                    if(message.deleteP){
                        return(
                            <ModalContainer>
                                <div className="d-flex justify-content-center align-items-center flex-column">
                                    <ImportantText><p className="text-capitalize text-danger">Are you sure you want to delete?</p></ImportantText>
                                    <EasyButton onClick={()=>message.onPerformDelete()}>YES</EasyButton>
                                    <EasyButton onClick={()=>message.onCLoseDelete()}>BACK</EasyButton>
                                </div>
                            </ModalContainer>
                        )
                    }
                    if(message.deleteRequest){
                        return(
                            <ModalContainer>
                                <div className="d-flex justify-content-center align-items-center flex-column">
                                    <ImportantText><p className="text-uppercase text-info">Are you sure you want to delete the request?</p></ImportantText>
                                    <EasyButton onClick={()=>{
                                        message.onDeleteRequest();
                                        message.onCloseDeleteRequestModal();
                                    }}>YES</EasyButton>
                                    <EasyButton onClick={message.onCloseDeleteRequestModal}>BACK</EasyButton>
                                </div>
                            </ModalContainer>
                            )
                    }
                    return (
                        <ModalContainer>
                            <div className="container">
                                <div className="row">
                                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-capitalize text-center p-5">
                                        <h5>item added in cart</h5>
                                        <img src={`http://localhost:5000/${image}`} alt="itemProduct" className='img-fluid'/>
                                        <h5>{name}</h5>
                                        <h5 className="text-muted">price :XAF {price}</h5>
                                        <Link to='/Products'>
                                            <ButtonContainer onClick={onCloseModal}>
                                                continue shopping
                                            </ButtonContainer>
                                        </Link>
                                        <Link to='/cart'>
                                            <ButtonContainer cart onClick={onCloseModal}>
                                                go to the cart
                                            </ButtonContainer>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ModalContainer>
                        )
                    }
                }()
            }
        </div>
    )
   };





const ModalContainer = styled.div`
    position : fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,.3);
    display:flex;
    align-items:center;
    justify-content:center;
    
    #modal{
        background:var(--mainWhite); 
    }
`;
const ImportantText = styled.div`
    background-color:white;
    padding:0.7rem;
`;
export default Modal;
