import React from 'react';
import {Link} from 'react-router-dom';

import logo from '../images/iconfinder_home_126572.svg';
import {ButtonContainer} from "./Button";
import styled from 'styled-components';


const Navigation = props =>{
    return(
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5  ">
            <Link to='/'>
                <img src={logo} alt="store" className="navbar-brand"/>
            </Link>
            <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5">
                    <Link to='/' className="nav-link"> Home </Link>
                </li>
                <li className="nav-item ml-5">
                    <Link to='/Products' className="nav-link"> Products </Link>
                </li>
                <li className="nav-item ml-5">
                    <Link to='/About' className="nav-link"> About us </Link>
                </li>
                <li className="nav-item ml-5">
                    <Link to='/Admin' className="nav-link"> Admin</Link>
                </li>
            </ul>
            <Link to='/cart' className="ml-auto">
                <ButtonContainer>
                    <span className="mr-2">
                        <i className = "fas fa-cart-plus " /> Cart
                    </span>
                </ButtonContainer>
            </Link>
        </NavWrapper>
    )
};

const NavWrapper = styled.nav`
    background: var(--myWhite);
    .nav-link {
        color: var(--mainRed) !important;
        font-size:1.3rem;
        text-transform: capitalize ; 
    }    
`;


export default Navigation;
