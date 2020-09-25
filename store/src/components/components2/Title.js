import React from 'react';


const Title = props =>{
  return(
      <div className="row">
           <div className="col-10 mx-auto my-2 text-title text-center">
                <h1 className="text-capitalize font-weight-bold"> {props.name} <strong className="my-title"> {props.title}</strong> </h1>
           </div>
      </div>
  )
};


export default Title;
