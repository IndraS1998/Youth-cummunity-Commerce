import React,{useContext} from 'react';

import RequestItem from "./RequestItem";
import styled from "styled-components";
import {ProductContext} from "../../../context";

const GetRequestsItem = props =>{
    const {email,location,phoneNumber,cost,items,reqId,completed} = props;
    const message = useContext(ProductContext);

    const onPerformDelivery = async () =>{
        message.setIsLoading(true);
        try{
            const response = await fetch(`http://localhost:5000/request/edit/${reqId}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    Authorization : 'Bearer ' + message.token
                },
            });

            if(!response.ok){
                message.setIsLoading(false);
                message.setError(response.message);
                message.setModalOpen(true);
                return
            }
            const digest = await response.json();
            await message.onGetRequests();
            message.setIsLoading(false);
        }catch (e) {
            message.setError(e.message);
            message.setIsLoading(false);
            message.setModalOpen(true);
        }
    };

    return (
        <MainWrapper>
            <div className=" m-2  d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-between my-3 p-3">
                    <div className="px-2">
                        {completed && <span className="mr-2 GreenText"><i className="fa fa-check-circle"/></span>}
                    </div>
                    <div className="px-2">
                        {email}
                    </div>
                    <div className="px-2">
                        {location}
                    </div>
                    <div className="px-2">
                        {phoneNumber}
                    </div>
                    <div className="px-2">
                        {cost} Xfa
                    </div>
                </div>
                <div className="my-1">
                    {items.map((item,index) =>{
                        return(
                            <RequestItem name={item.name} count={item.count} key={index}/>
                        )})}
                </div>
                <div className="mx-2">
                    {completed && <DeleteButton onClick={onPerformDelivery}>
                        cancel Delivery
                    </DeleteButton>}
                </div>
                <div className="mx-2">
                    {!completed && <DeleteButton onClick={onPerformDelivery}>
                        Deliver
                    </DeleteButton>}
                </div>
                <div className="mx-2">
                    <SecondButton onClick={()=> {
                        message.setId(reqId);
                        message.setDeleteRequest(true);
                        message.setModalOpen(true);
                    }}>Delete</SecondButton>
                </div>
            </div>
        </MainWrapper>
    )
};

const MainWrapper = styled.div`
        background-color: var(--myWhite);
        transition:all 1s ease-in-out;
        &:hover{
        background-color: var(--mainBlue);
        color: white;
        }
`;

const DeleteButton = styled.div`
        color: var(--myWhite);
        background-color: var(--mainBlue);
        cursor:pointer;
        border-radius:0.6rem;
        padding:0.4rem;
        transition:all 1s ease-in-out;
        &:hover{
        color: white;
        background-color: var(--lightBlue);
        }
`;

const SecondButton = styled.div`
        color: var(--myWhite);
        background-color: var(--mainRed);
        cursor:pointer;
        border-radius:0.6rem;
        padding:0.4rem;
        transition:all 1s ease-in-out;
        &:hover{
        color: var(--mainBlue);
        background-color: var(--mainYellow);
        }

`;

export default GetRequestsItem;
