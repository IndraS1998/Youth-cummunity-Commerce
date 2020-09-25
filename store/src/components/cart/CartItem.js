import React from 'react';

const CartItem = props =>{
    const {item,message} = props;
    const {name,price,id,count,image,total} = item;
    const {increment,decrement,removeItem} = message;
    return(
        <div className='row my-2 text-center text-capitalize '>
            <div className='col-10 mx-auto col-lg-2 '>
                <img src={`http://localhost:5000/${image}`} alt="image" style={{width:'5rem',height:'5rem'}} className="img-fluid"/>
            </div>
            <div className='col-10 mx-auto col-lg-2 '>
                {name}
            </div>
            <div className='col-10 mx-auto col-lg-2 '>
                {price}
            </div>
            <div className='col-10 mx-auto col-lg-2 my-2 my-lg-2 '>
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1 " onClick={ ()=>decrement(id)}>-</span>
                        <span className="btn btn-black mx-1 " >{count}</span>
                        <span className="btn btn-black mx-1 " onClick={ ()=>increment(id)}>+</span>

                    </div>
                </div>
            </div>
            <div className='col-10 mx-auto col-lg-2 mt-3'>
                <div className="cart-icon" onClick={()=>removeItem(id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
            <div className='col-10 mx-auto col-lg-2 '>
                <strong> item Total : XAF{total} </strong>
            </div>
        </div>
    )
};
export default CartItem;
