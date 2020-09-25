import React from 'react';
import styled from "styled-components";

const EmptyCart = () =>{
    return(
        <EmptyWrapper>
            <div className="row">
                <div className="col-10 mx-auto text-center text-title ">
                    <p className="blueText">your cart is currently empty</p>
                </div>
            </div>
        </EmptyWrapper>
    )
};

const EmptyWrapper = styled.div`
    height:50vh;
    display:flex;
    flex:1;
    justify-content: center;
    align-items:center;
    flex-direction:column;
`;

export {EmptyCart, EmptyWrapper};
