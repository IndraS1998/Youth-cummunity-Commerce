import styled from 'styled-components';

  const ButtonContainer = styled.button`
    text-transform:capitalize;
    font-size:1.4rem;
    background:transparent;
    border:0.05rem solid var(--mainRed);
    border-color:${props => props.cart?"var(--mainYellow)":"var(--mainRed)" };
    color:${props => props.cart?"var(--mainYellow)":"var(--mainRed)"};
    border-radius:0.5rem;
    padding:0.2rem 0.5rem;
    cursor:pointer;
    margin:0.2rem 0.5rem;
    transition:all 1s ease-in-out;
    &:hover{
    background:${props => props.cart?"var(--mainYellow)":"var(--mainOrange)" } ;
    color: var(--mainWhite);
    }
    &:focus{
    outline:none
    }
`;

 const BodyButton = styled.button`
  font-size:1.4rem;
  background: var(--mainWhite);
  border-radius:0.5rem;
  padding:0.2rem 0.5rem;
  cursor:pointer;
  margin:0.2rem 0.5rem;
  border:0.05rem solid var(--mainRed);
  transition:all 1s ease-in-out;
  &:hover{
    background:var(--myWhite);
    }
 `;
 const EasyButton = styled.div`
 font-size:0.8rem;
 padding:0.1rem 0.2rem;
 margin:1.3rem 0.3rem;
 background: var(--mainBlue);
 cursor:pointer;
 color:var(--mainWhite);
 border-radius:0.5rem;
 border:0.05rem solid var(--mainWhite);
 transition:all 1s ease-in-out;
 &:hover{
    color:var(--myWhite);
    border:0.05rem solid var(--myWhite);
    }
 `;
 const CartButton = styled.button`
    text-transform:capitalize;
    font-size:1.2rem;
    background:transparent;
    border:0.05rem solid var(--lightBlue);
    color:var(--lightBlue);
    cursor:pointer;
    border-radius:1rem;
    margin:1.3rem 0.7rem;
    padding: 0.2rem 0.2rem;
    transition:all 1s ease-in-out;
    &:hover{
        color:var(--mainBlue);
        border:0.05rem solid var(--mainBlue);
    }
 `;
const ProductButton = styled.div`
    text-transform:capitalize;
    font-size:1.2rem;
    background:transparent;
    border:0.05rem solid var(--mainOrange);
    color:var(--mainOrange);
    cursor:pointer;
    border-radius:1rem;
    margin:1.3rem 0.7rem;
    padding: 0.2rem 0.2rem;
    transition:all 1s ease-in-out;
    &:hover{
        color:var(--mainRed);
        border:0.05rem solid var(--mainRed);
    }
 `;
 const SecondaryButton = styled.div`
    text-transform:capitalize;
    font-size:1.2rem;
    background:transparent;
    border:0.05rem solid var(--mainOrange);
    color:var(--mainOrange);
    border-radius:1rem;
    cursor:pointer;
    margin:1.3rem 0.7rem;
    padding: 0.2rem 0.2rem;
    transition:all 1s ease-in-out;
    &:hover{
        color:var(--mainRed);
        border:0.05rem solid var(--mainRed);
    }
 `;
 const AccesoriesButton = styled.div`
    color:var(--mainOrange);
    border-radius:1rem;
    cursor:pointer;
    margin:1.3rem 0.7rem;
    padding: 0.2rem 0.2rem;
    transition:all 1s ease-in-out;
    &:hover{
        color:var(--mainRed);
    }
 
 `

export {AccesoriesButton,ButtonContainer,BodyButton,EasyButton,CartButton,SecondaryButton,ProductButton}
