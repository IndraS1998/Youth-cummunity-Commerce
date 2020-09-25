import React, {useContext} from 'react';

import {ProductContext} from "../../context";
import CartItem from "./CartItem";

const CartList = () =>{
  const message = useContext(ProductContext);
  const {cart} = message;

  return(
      <div className='container-fluid'>
        {cart.map((item,index)=><CartItem item={item} message={message} key={index}/>)}
      </div>
  )
};

export default CartList;
