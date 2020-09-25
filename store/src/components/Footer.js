import React from 'react';
import styled from "styled-components";

const Footer = () =>{
  return(
      <FooterWrapper>
          <footer>
                  <div className="d-flex justify-content-center align-items-center flex-column">
                      <p >&copy;YouthCommunity. April 2020</p>
                      <div className="d-flex justify-content-center align-items-center flex-row">
                          <a href="#" className="pr-1"><i className="fab fa-facebook-square"></i></a>
                          <a href="#" className="pr-1"><i className="fab fa-twitter-square"></i></a>
                          <a href="#" className="pr-1"><i className="fab fa-instagram"></i></a>
                      </div>
                  </div>
          </footer>
      </FooterWrapper>

  )
};
const FooterWrapper = styled.div`
    background:var(--myWhite);
    padding-top:1.6rem;
    padding-bottom:0.8rem;
    font-size:0.8rem;
    color:var(--mainRed);
    a{
        color:var(--mainOrange);
    }
    strong{
        color:var(--mainOrange);
    }
`;

export default Footer;
