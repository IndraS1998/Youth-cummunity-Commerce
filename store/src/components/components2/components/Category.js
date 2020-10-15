import React,{useContext,useState} from 'react';

import {ProductContext} from '../../../context';
import {SecondaryButton} from '../../Button';

const Category = props => {

    const message = useContext(ProductContext);
    const {settingCategoryToDevice,settingCategoryToDress,settingCategoryToAccessoires,settingCategoryToOther,category} = message;
    const {categorySelected,setCategorySelected} = props;

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex flex-row">
            <p className="text-title text-blue"> Select Category </p>
            {categorySelected && <span className="text-blue"><i className="fa fa-check-circle"/></span>}
            </div>
            <div className="d-flex flex-row">
                <SecondaryButton onClick={()=>{
                    settingCategoryToDevice();
                    setCategorySelected(true);
                }}>
                    Device
                </SecondaryButton>
                <SecondaryButton onClick={()=>{
                    settingCategoryToDress();
                    setCategorySelected(true);
                }}>
                    Dressing
                </SecondaryButton>
                <SecondaryButton onClick={()=>{
                    settingCategoryToAccessoires();
                    setCategorySelected(true);
                }}>
                    Accessories
                </SecondaryButton>
                <SecondaryButton onClick={()=>{
                    settingCategoryToOther();
                    setCategorySelected(true);
                }}>
                    Others
                </SecondaryButton>
            </div>
        </div>
    )
}

export default Category;