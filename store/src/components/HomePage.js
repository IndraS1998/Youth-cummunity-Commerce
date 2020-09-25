import React from 'react';
import styled from "styled-components";
import {BodyButton} from "./Button";
import {Link} from "react-router-dom";


const HomePage = props =>{
  return(
          <HomeWrapper>
              <div className="container  mx-auto py-5">
                  <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                      <h1 className="text-title align-items-center justify-content-center my-md-5 mx-auto">Youth community</h1>
                      <div className="mx-lg-5 my-lg-5 mx-auto">
                          <p className="blueText">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit
                              . Ab accusantium amet ea eligendi natus praesentium quae
                              repudiandae tenetur totam ullam! Aperiam architecto consequuntur
                              et eum exercitationem iste perferendis quasi vero.
                          </p>
                          <div className="d-flex justify-content-center align-items-center">
                              <Link to='/Products'>
                                  <BodyButton>
                                      See Our Products
                                  </BodyButton>
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>
          </HomeWrapper>
  )
};

const HomeWrapper = styled.div`
    background: url("../images/image2shopping.jpg") no-repeat center center/cover;
    display:flex;
    justify-content:center;
    align-items:center;
    padding-top:4rem;
    padding-bottom:4rem;
    flex:1;
    color:var(--mainDark);
    
`;

export default HomePage;
