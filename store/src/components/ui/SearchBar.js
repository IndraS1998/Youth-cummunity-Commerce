import React,{useContext}  from 'react';
import TextField from '@material-ui/core/TextField';

import {ProductContext} from "../../context";


const SearchBar = () =>{
    const message = useContext(ProductContext);
    let {onSetQueryString,queryString} = message;

    return(
        <div className="p-3 m-2">
            <TextField placeholder='Search by Category' value={queryString} onChange={onSetQueryString} />
        </div>
    )

};

export default SearchBar;
