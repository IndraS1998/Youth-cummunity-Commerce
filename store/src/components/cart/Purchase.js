import React, {useContext} from 'react';
import {Link} from "react-router-dom";

import {ProductContext} from "../../context";
import {EasyButton,CartButton} from "../Button";
import LoadingSpinner from "../ui/LoadingSpinner";

const Purchase = () =>{
    const message = useContext(ProductContext);
    const {phone,location,email,cartTotal,cart,isLoading} = message;


    const onCreateRequest = async () =>{
        if(phone.length < 9){
            message.setError('please enter valid phone number');
            message.setModalOpen(true);
            return;
        }

        if(phone && location && email && cart && cartTotal){
           await message.onMakePurchase();
        }else{
            message.setError('please make sure items are selected in cart and fill all inputs');
            message.setModalOpen(true);
        }
    };

    if(message.purchaseMade){
        return(
            <div className="d-flex flex-column justify-content-center align-items-center height-80">
                <p className="blueText">purchase made successfully</p>
                <Link to='/Products'>
                    <CartButton onClick={()=>message.setPurchaseMade(false)}>
                        Back to products
                    </CartButton>
                </Link>
            </div>
        )
    }

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column height-80">
            {isLoading && <LoadingSpinner asOverlay/>}
            <div className="form-group">
                <input type="email" placeholder="email" className="form-control" value={message.email} onChange={e => message.onSetEmail(e)}/>
            </div>
            <div className="form-group">
                <input type="text" placeholder="phone number" className="form-control" value={message.phone} onChange={e=>message.onSetPhone(e)}/>
            </div>
            <div className="form-group">
                <input type="text" placeholder="location" className="form-control" value={message.location} onChange={e=>message.onSetLocation(e)}/>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <CartButton onClick={onCreateRequest}>
                    Purchase
                </CartButton>
                <Link to='/cart'>
                    <CartButton>Back</CartButton>
                </Link>
            </div>
        </div>
    )
};

export default Purchase;
