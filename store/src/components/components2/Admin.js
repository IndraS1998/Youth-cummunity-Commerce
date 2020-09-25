import React, {useReducer,useState,useContext} from 'react';

import './Admin.css';
import {EasyButton} from "../Button";
import {ProductContext} from "../../context";
import GetRequests from "./components/GetRequests";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";


const Admin =() =>{
    const [get,setGet] = useState(false);
    const [createP,setCreateP] = useState(false);
    const [product,setProduct] = useState(false);
    const message = useContext(ProductContext);

    const [state,dispatch] = useReducer(function reducer(state,action){
        switch(action.type){
            case "getRequest":
                setProduct(false);
                setCreateP(false);
                return setGet(true);
            case "createProduct":
                setProduct(false);
                setGet(false);
                return setCreateP(true);
            case "seeProducts":
                setGet(false);
                setCreateP(false);
                return setProduct(true);
            default:
                return state
        }
    },null);
    if(!message.token){
        return(
            <div className="height-80 blueText d-flex justify-content-center align-items-center">
                <p>how the hell did you get here???  go back please i dont want issues</p>
            </div>
        )
    }
    return(
            <div className="row admin">
                <div className="col-2 blue d-flex flex-column align-items-center">
                    <EasyButton onClick={()=> dispatch({type:"getRequest"})}>get Requests</EasyButton>
                    <EasyButton onClick={()=> dispatch({type:"createProduct"})}>create Product</EasyButton>
                    <EasyButton onClick={()=> dispatch({type:"seeProducts"})}>see Products</EasyButton>
                </div>
                <div className="col-10 mx-auto red d-flex justify-content-center align-items-center">
                    {
                        function () {
                            if(get){
                                return <GetRequests />
                            }
                            if(createP){
                                return <CreateProduct />
                            }
                            if(product){
                                return <UpdateProduct />
                            }
                            return(
                                <p className="blueText">welcome dear Admin</p>
                            )
                        }()
                    }
                </div>
            </div>
    )
};

export default Admin;
