import {useContext,useCallback,useRef,useEffect} from 'react';

import {ProductContext} from "../../context";

export const useHttp_request = () =>{
    const message = useContext(ProductContext);
    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback(async (url,method='GET',reqBody =null,headers ={}) =>{
        message.setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);
        try{
            const response = await fetch(url,{
                method,
                reqBody,
                headers,
                signal:httpAbortCtrl.signal,
            });
            const digest = await response.json();
            activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl=> reqCtrl !== httpAbortCtrl);

            if(!response.ok){
                throw new Error(response);
            }
            message.setIsLoading(false);
            return digest;
        }catch (e) {
            message.setError(e.message);
            message.setModalOpen(true);
            message.setIsLoading(false);
            throw e;
        }
    },[]) ;

    useEffect(()=>{
        return ()=>{
            activeHttpRequest.current.forEach(abortCrl => abortCrl.abort())
        }
    },[]);

    return {sendRequest};
};
