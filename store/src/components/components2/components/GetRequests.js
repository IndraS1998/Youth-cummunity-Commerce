import React, {useContext,useEffect} from 'react';

import GetRequestsItem from "./GetRequestsItem";
import {ProductContext} from "../../../context";
import LoadingSpinner from "../../ui/LoadingSpinner";

const GetRequests = () =>{
    //see all the requests
    const message = useContext(ProductContext);

    useEffect(()=>{
        const onGetRequest = async ()=>{
            message.setIsLoading(true);
            try{
                const res = await fetch('http://localhost:5000/request',{
                    headers:{
                        Authorization : 'Bearer ' + message.token
                    }
                });
                if(!res.ok){
                    message.setError(res.message);
                    message.setModalOpen(true);
                    message.setIsLoading(false);
                    throw new Error(res.message);
                }
                const digest = await res.json();
                message.setRequests(digest.requests);
                message.setIsLoading(false);
            }catch (e) {
                message.setError(e.message);
                message.setModalOpen(true);
                message.setIsLoading(false);
                throw new Error(e.message);
            }
        };
        onGetRequest();
    },[]);

    if(message.requests.length < 1){
        return(
            <div className="blueText">
                no requests made yet
            </div>
        )
    }

    return(
        <div>
            {message.isLoading && <LoadingSpinner asOverlay/>}
            {message.requests.map(request =>{
                return(
                    <GetRequestsItem  cost={request.cost} email={request.email} location={request.location} phoneNumber={request.phoneNumber}
                                      reqId={request.id} items={request.items} key={request.id} completed={request.completed}/>
                )
            })}
        </div>
    )
};

export default GetRequests;
