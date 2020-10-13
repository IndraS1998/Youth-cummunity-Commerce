import React, {useContext,useState, useReducer} from 'react';

import {AccesoriesButton} from "./Button";
import Product from "./Product";
import Title from "./components2/Title";
import {ProductContext} from "../context";
import LoadingSpinner from "./ui/LoadingSpinner";

const ProductList = () =>{
    //making use of the useContext hook to consume the context we created
    const message = useContext(ProductContext);
    const {items} = message;
    const [detailItems,setDetailItems] = useState([]);
    const [devices,setDevices] = useState(false);
    const [cloth,setCloth] = useState(false);
    const [accessories,setAccessories] = useState(false);
    const [other,setOther] = useState(false);

    const [state,dispatch] = useReducer(function reducer(state,action){
        switch(action.type){
            case "devices":
                setCloth(false);
                setAccessories(false);
                setOther(false);
                setDetailItems(items.filter(item => item.category === 'device'))
                return setDevices(true);
            case "clothing":
                setDevices(false);
                setAccessories(false);
                setOther(false);
                setDetailItems(items.filter(item => item.category === 'Dress'))
                return setCloth(true);
            case "accessories":
                setDevices(false);
                setCloth(false);
                setOther(false);
                setDetailItems(items.filter(item => item.category === 'accessoires'))
                return setAccessories(true);
            case "other":
                setDevices(false);
                setCloth(false);
                setAccessories(false);
                setDetailItems(items.filter(item => item.category === 'other'))
                return setOther(true);    
            default:
                return state
        }
    },null)

    if(items){
        return(
            <div className="height-40 d-flex flex-column  align-items*center">
                { message.isLoading && <LoadingSpinner asOverlay/>}
                <div className="d-flex flex-row justify-content-center mb-5 align-items-center">
                    <AccesoriesButton onClick ={()=>{dispatch({type:"devices"})}}>
                        <span ><i className="fa fa-mobile" aria-hidden="true" /></span>                
                    </AccesoriesButton>
                    <AccesoriesButton onClick ={()=>{dispatch({type:"clothing"})}}>
                        <span ><i className="fas fa-tshirt" aria-hidden="true" /></span>
                    </AccesoriesButton>
                    <AccesoriesButton onClick ={()=>{dispatch({type:"accessories"})}}>
                        <span ><i className="fas fa-clock" aria-hidden="true"></i></span>
                    </AccesoriesButton>
                    <AccesoriesButton onClick ={()=>{dispatch({type:"other"})}}> <i className="fas fa-caret-down"></i></AccesoriesButton>
            
                </div>
                <div className="py-3 mt-5">
                        <div className="container">
                            <Title name="our" title="products"/>
                            <div className="row">
                                {
                                    function (){
                                        if(devices){
                                            detailItems.map(product =>{
                                                return <Product
                                                product={product} key={product.id} image={product.image} id={product.id}
                                                name={product.name} inCart={product.inCart} price={product.price}
                                                        />
                                            })
                                        }
                                        if(cloth){
                                            detailItems.map(product =>{
                                                return <Product
                                                product={product} key={product.id} image={product.image} id={product.id}
                                                name={product.name} inCart={product.inCart} price={product.price}
                                                        />
                                            })
                                        }
                                        if(accessories){
                                            detailItems.map(product =>{
                                                return <Product
                                                product={product} key={product.id} image={product.image} id={product.id}
                                                name={product.name} inCart={product.inCart} price={product.price}
                                                        />
                                            })
                                        }
                                        if(other){
                                            items.map(product => {
                                                return <Product
                                                    product={product} key={product.id} image={product.image} id={product.id}
                                                    name={product.name} inCart={product.inCart} price={product.price}
                                                        />
                                            })
                                        }
                                    }()
                               }
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
/*all items should display when request reaches and executes effectively DONE
*i already have a display of the three main categories of items DONE
*on a button press, the display of the items should change to suit the button type
*and that is all randy
*/ 
  /*if(items){
        return(
            <div>
                
                <div className="d-flex align-items-center justify-content-center flex-row">
                    <ProductButton onClick={()=>{
                        setDetailItems(items.filter(item => item.category == "mobile device"));
                        console.log(detailItems); 
                        console.log(items);   
                    }}>
                        <span className="mr-2"></span>Mobile Phone
                    </ProductButton>
                    <ProductButton onClick={()=>{
                    }}>
                        <span className="mr-2"><i className="fa fa-male" aria-hidden="true" /></span><span className="mr-2"><i className="fa fa-female" aria-hidden="true" /></span>Clothing
                    </ProductButton>
                    
                </div>
            
            </div>
        )
    }
    */