import React, {useState,useContext} from 'react';
import {Link} from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";
import {CartButton,BodyButton,SecondaryButton} from "../Button";
import {ProductContext} from "../../context";

const Auth = () =>{
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const message = useContext(ProductContext);

    const onSetEmail = e => setEmail(e.target.value);
    const onSetPassword = e =>setPassword(e.target.value);

    const onPerformAuth = async () =>{
        if(email.length >0 && password.length>0){
            message.setIsLoading(true);
            let response;
            try{
                response = await fetch('http://localhost:5000/admin/login',{
                    method : 'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });
            }catch (e) {
                message.setIsLoading(false);
                message.setError(e.message);
                message.setModalOpen(true);
                return null;
            }
            if(!response.ok){
                message.setIsLoading(false);
                message.setError('user does not exist please');
                message.setModalOpen(true);
                return null;
            }
            const digest = await response.json();
            message.setToken(digest.token);
            setName(digest.Name);
            message.setIsLoading(false);
        }
        setPassword('');
        setEmail('');
        return null;
    };

    return(
        <div className="d-flex justify-content-center align-items-center height-80 flex-column">
            { message.isLoading && <LoadingSpinner asOverlay/>}
            {!message.token &&
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <div className="form-group">
                    <input type="text" placeholder="email" className="form-group" value={email} onChange={e=>onSetEmail(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="password" className="form-group" value={password} onChange={e=>onSetPassword(e)}/>
                </div>
                <CartButton onClick={onPerformAuth}>Sign In</CartButton>
            </div>}
            {message.token &&
            <div className="d-flex justify-content-center align-items-center flex-column">
                <p className="blueText">Welcome dear <span className="text-uppercase">{name}</span></p>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to="/Work/administrator"><CartButton>Work Now</CartButton></Link>
                    <SecondaryButton onClick={()=>message.setToken(false)}>Log OUT</SecondaryButton>
                </div>
            </div>
            }
        </div>
    )
};

export default Auth;
