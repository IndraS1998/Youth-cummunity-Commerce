import React, {useContext} from 'react';
import Title from "../components2/Title";
import CartColumns from "./CartColumns";
import {EmptyCart} from "./EmptyCart";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import {ProductContext} from "../../context";

const Cart = () =>{
    const message = useContext(ProductContext);
    const {cart} = message;

    if(cart.length > 0){
        return (
            <div className="height-80">
                <Title name="My" title='Cart'/>
                <CartColumns />
                <CartList message={message}/>
                <CartTotal message={message}/>
            </div>
        )
    }

   return(
       <div className="height-80">
           <div className="pt-5">
               <Title name="My" title='Cart'/>
               <EmptyCart />
           </div>
       </div>

   )
};

export default Cart;
