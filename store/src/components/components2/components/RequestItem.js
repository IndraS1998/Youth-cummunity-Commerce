import React, {} from 'react';
import './GetRequestsItem.css'

const RequestItem = props =>{
    const {count,name} = props;
    return(
        <div className="row">
            <div className="col-md-4"><p>{count}</p></div>
            <div className="col-md-8"><p>{name}</p></div>
        </div>
    )
};

export default RequestItem;
