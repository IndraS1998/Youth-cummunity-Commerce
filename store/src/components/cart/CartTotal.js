import React,{useContext,useState} from 'react';
import {Link} from "react-router-dom";
import {CartButton} from "../Button";
import {ProductContext} from "../../context";

const CartTotal= props =>{
    const {cartSubTotal,cartTax,cartTotal,clearCart} = props.message;
    const message = useContext(ProductContext);
    const [calc,setCalc] = useState(false);

    const onSetCalc = () =>{
        message.addToTotals();
        setCalc(true);
    };

    if(!calc){
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                            <CartButton onClick={onSetCalc}>Calculate</CartButton>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }


    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <Link to='/'>
                            <CartButton onClick={clearCart}>Clear Cart</CartButton>
                        </Link>
                        <Link to='purchase'>
                            <CartButton>Purchase</CartButton>
                        </Link>
                        <h5> <span className="text-title"> subTotal XAF: <strong>{cartSubTotal} </strong> </span> </h5>
                        <h5> <span className="text-title"> tax XAF: <strong>{cartTax} </strong> </span> </h5>
                        <h5> <span className="text-title"> Total XAF: <strong>{cartTotal} </strong> </span> </h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default CartTotal;
