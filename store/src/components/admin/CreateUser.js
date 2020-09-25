import React, {useContext,useState} from 'react';
import {ProductContext} from "../../context";
import LoadingSpinner from "../ui/LoadingSpinner";
import {CartButton} from "../Button";

const CreateUser = () =>{
    const message = useContext(ProductContext);
    const {email,onSetEmail} = message;
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

    const onSetName = e => setName(e.target.value);
    const onSetPassword = e => setPassword(e.target.value);

    const onPerformPost = async () =>{
        if(email && password && name){
            message.setIsLoading(true);
            let res;
            try{
                res = await fetch('http://localhost:5000/admin/signUp',{
                    method : 'POST',
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        name,
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
            if(!res.ok){
                message.setIsLoading(false);
                message.setError('something went wrong please try again later');
                message.setModalOpen(true);
                return null;
            }
            const digest = await res.json();
            console.log(digest.message);
            message.setIsLoading(false);
        }else{
            message.setError('fill all spaces');
            message.setModalOpen(true);
            return null;
        }
    };

    return(
        <div className="height-80 d-flex flex-column justify-content-center align-items-center">
            { message.isLoading && <LoadingSpinner asOverlay/>}
            <div className="form-group">
                <input type="text" onChange={e=>onSetName(e)} value={name} placeholder="name" className="form-group"/>
            </div>
            <div className="form-group">
                <input type="email" placeholder="email" className="form-group" value={email} onChange={e => onSetEmail(e)}/>
            </div>
            <div className="form-group">
                <input type="text" placeholder="password" className="form-group" value={password} onChange={e =>onSetPassword(e)}/>
            </div>
            <CartButton onClick={onPerformPost}>Sign Up</CartButton>
        </div>
    )
};

export default CreateUser;
