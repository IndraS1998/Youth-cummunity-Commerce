import React, {createContext, useEffect, useState} from 'react';

import {detailProduct, storeProducts} from "./data";//ultimately this import will be removed to be fed from the api itself

//a function that will be used to wrap the whole app, thus providing the context globally

//the value passed with createContext return an object with two values
//Provider: we use this to provide the value to the whole app from index.js
//Consumer: but in this case, we will use the useContext hook to render the matter
const initialState = [...storeProducts];
const ProductContext = createContext(initialState);
//using object destructuring
const { Provider } = ProductContext;


const ProductProvider = ({children}) =>{
    const [detail,setDetail] = useState(detailProduct);
    const [cart,setCart] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [modalProduct,setModalProduct] = useState(detailProduct);
    const [cartSubTotal,setCartSubTotal] = useState(0);
    const [cartTax,setCartTax] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);
    const [error,setError] = useState();
    const [requests,setRequests] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [edit,setEdit] = useState(false);
    const [description,setDescription] = useState('');
    const [prices,setPrice] = useState('');
    const [id,setId] = useState('');
    const [items,setItems] = useState();
    const [deleteP,setDeleteP] = useState(false);
    const [mkReq,setMkReq] = useState(false);
    const [phone,setPhone] = useState('');
    const [location,setLocation] = useState('');
    const [email,setEmail] = useState('');
    const [deleteRequest,setDeleteRequest] = useState(false);
    const [purchaseMade,setPurchaseMade] = useState(false);
    const [file,setFile] = useState();
    const [token,setToken] = useState(false);
    const [queryString,setQueryString] = useState('');

    // actually setting the state directly to the storeProduct which is bad as editing the storeProducts manually will also edit the state
    //but with the setProducts method, its a new set of values instead of copying them
   /* useEffect( () =>  {
        let products = [];
        console.log('setting products');
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            products = [...products,singleItem];
        });
        setStore(products);
    },[initialState]);

    const setProducts = () =>{
        let products = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            products = [...products,singleItem];
        });
        setStore(products);
    };

*/

    useEffect(()=>{
        const getProducts = async ()=>{
            setIsLoading(true);
            try{
                const res = await fetch('http://localhost:5000/products');
                const digest= await res.json();
                if(!res.ok){
                    setIsLoading(false);
                    setError(res.message);
                    setModalOpen(true);
                }
                setIsLoading(false);
                setItems(digest.products);
            }catch (e) {
                setIsLoading(false);
                setError(e.message);
                setModalOpen(true);
            }
        };
        getProducts();
    },[]);


    const onGetProducts = async () =>{
        setIsLoading(true);
        try{
            const response = await fetch('http://localhost:5000/products');
            const digest = await response.json();

            if(!response.ok){
                setIsLoading(false);
                setError(response.message);
                setModalOpen(true);
                throw new Error(response.message);
            }
            setIsLoading(false);
            setItems(digest.products);
        }catch (e) {
            setIsLoading(false);
            setError(e.message);
            setModalOpen(true);
            throw new Error(e.message);
        }
    };

    const onPerformEdit = async (description,price) =>{
        if(description && price){
            setIsLoading(true);
            try{
                const response = await fetch(`http://localhost:5000/products/edit/${id}`,{
                    method:'PATCH',
                    headers:{
                        'Content-Type':'application/json',
                        Authorization : 'Bearer ' + token
                    },
                    body: JSON.stringify({description,price})
                });
                if(!response.ok){
                    setIsLoading(false);
                    setError(response.message);
                    setModalOpen(true);
                }
                //const digest = await response.json();
                setIsLoading(false);
                closeEdit();
                await onGetProducts();
            }catch (e) {
                setIsLoading(false);
                setError(e.message);
                throw new Error(e.message);
            }
        }
        else{
            setError('wrong input');
            setModalOpen(true);
        }

    };

    const onPerformDelete = async () =>{
        setIsLoading(true);
        try{
            const response = await fetch(`http://localhost:5000/products/${id}`,{
                method:'DELETE',
                headers:{
                    Authorization : 'Bearer ' + token
                }
            });
            if(!response.ok){
                setError(response.message);
                setModalOpen(true);
                setIsLoading(false);
                throw new Error(response.message);
            }
            //const digest = await response.json();
            setIsLoading(false);
            onCLoseDelete();
            await onGetProducts();

        }catch (e) {
            setError(e.message);
            setModalOpen(true);
            setIsLoading(false);
            throw new Error(e.message)
        }
    };

    const onGetRequests = async () =>{
        setIsLoading(true);
        try{
            const res = await fetch('http://localhost:5000/request',{
                headers:{
                    Authorization : 'Bearer ' + token
                }
            });
            if(!res.ok){
                setError(res.message);
                setModalOpen(true);
                setIsLoading(false);
                throw new Error(res.message);
            }
            const digest = await res.json();
            setRequests(digest.requests);
            setIsLoading(false);
        }catch (e) {
            setError(e.message);
            setModalOpen(true);
            setIsLoading(false);
            throw new Error(e.message);
        }
    };
    const onMakePurchase = async () =>{
        setIsLoading(true);
        let res;
        try{
            res = await fetch('http://localhost:5000/request/purchase',{
                method : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    phoneNumber : phone,
                    location,
                    email,
                    cost : cartTotal,
                    items : cart,
                    numberOfProducts : cart.length
                })
            })
        }catch (e) {
            setIsLoading(false);
            setError(e.message);
            console.log('ok i got here');
            return null
        }

        //const digest = await res.json();

        if(!res.ok){
            setIsLoading(false);
            setError(res.message);
            throw new Error(res.message);
        }
        setIsLoading(false);
        await onGetProducts();
        setPurchaseMade(true);
        setCart([]);
    };

    const onDeleteRequest = async () =>{
        setIsLoading(true);
        try{
            const res = await fetch(`http://localhost:5000/request/${id}`,{
                method : 'DELETE',
                headers:{
                    Authorization : 'Bearer ' + token
                }
            });
            if(!res.ok){
                setIsLoading(false);
                setError(res.message);
                setModalOpen(true);
            }
            const digest = await res.json();
            setIsLoading(false);
            console.log(digest.message);
            await onGetRequests();
        }catch (e) {
            setIsLoading(false);
            setError(e.message);
            setModalOpen(true);
        }
    };


    const onSetDescription = e => setDescription(e.target.value);
    const onSetPrice = e => setPrice(e.target.value);
    const onSetPhone = e => setPhone(e.target.value);
    const onSetLocation = e =>setLocation(e.target.value);
    const onSetEmail = e => setEmail(e.target.value);
    const onSetQueryString = e => setQueryString(e.target.value);

    const selectItem = id =>{
        return items.find(item => item.id === id);
    };

    const handleDetail = (id) =>{
        const product = selectItem(id);
        setDetail(product);
    };

    const onOpenModal = id =>{
      const product = selectItem(id);
      setModalProduct(product);
      setModalOpen(true);
    };

    const onCloseModal = () =>{
      setModalOpen(false);
    };

    //dealing with the cart
    const increment = id =>{
        let tempCart = [...cart];
        let selectedProduct = tempCart.find(item => item.id === id);
        let index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];
        product.count += 1;
        product.total = product.count * product.price;
        setCart([...tempCart]);
        addToTotals();
    };
    const decrement = id =>{
        let tempCart = [...cart];
        let selectedProduct = tempCart.find(item => item.id === id);
        let index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];
        product.count -= 1;

        if(product.count === 0){
            removeItem(id);
        }else{
            product.total = product.count * product.price;
            setCart([...tempCart]);
            addToTotals();
        }
    };

    const removeItem = id =>{
        let tempStore = [...items];
        let tempCart = [...cart];

        tempCart = tempCart.filter(item => item.id !== id );
        const index = tempStore.indexOf(selectItem(id));
        let removedProduct = tempStore[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        setCart([...tempCart]);
        setItems([...tempStore]);
        addToTotals();
    };

    const clearCart= () =>{
        setCart([]);
        onGetProducts();
        addToTotals();
    };

    const addToTotals = () =>{
        let subTotal = 0;
        cart.map( item =>{
            subTotal += item.total;
            const tempTax = subTotal * 0.1;
            const tax = parseFloat(tempTax.toFixed(2));
            const total = subTotal + tax;
            setCartSubTotal(subTotal);
            setCartTax(tax);
            setCartTotal(total);
        });
    };

    const addToCart = (id) =>{
        let tempProducts = [...items];
        const index = tempProducts.indexOf(selectItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        product.total = product.price;
        setItems(tempProducts);
        setCart([...cart,product]);
        addToTotals();
    };

    const clearError =() => {
        setError(null);
        setModalOpen(false);
    };

    const closeEdit =() =>{
        setEdit(false);
        setModalOpen(false);
    };
    const onCLoseDelete = ()=>{
      setDeleteP(false);
      setModalOpen(false);
    };

    const onOpenDeleteModal = () =>{
      setDeleteP(true);
      setModalOpen(true);
    };

    const onCloseRequestModal =()=>{
      setModalOpen(false);
      setMkReq(false);
    };

    const onCloseDeleteRequestModal = () =>{
        setDeleteRequest(false);
        setModalOpen(false);

    };
    return (
        //implementation of the ProductContext.Provider but since we already used object destructuring, we only call Provider
        <div>
            <Provider value = {{
                modalOpen,modalProduct,detail,cart,cartSubTotal,requests,setRequests,description,phone,onSetPhone,email,onSetEmail,
                onSetDescription,items,deleteP,setDeleteP,onPerformDelete,onCLoseDelete,file,setFile,onGetRequests,onSetQueryString,queryString,
                onOpenDeleteModal,mkReq,setMkReq,purchaseMade,setPurchaseMade,addToTotals,onMakePurchase,token,setToken,
                location,onSetLocation,onCloseRequestModal,onDeleteRequest,deleteRequest,setDeleteRequest,onCloseDeleteRequestModal,onGetProducts,
                cartTax,cartTotal,setCart,error,setError,isLoading,setIsLoading,setModalOpen,edit,prices,onSetPrice,setEdit,setId,setItems,
                handleDetail,addToCart,onOpenModal,onCloseModal,increment,decrement,removeItem,clearCart,clearError,onPerformEdit,closeEdit
            }} >
                {children}
            </Provider>
        </div>
    );
};

//exporting the ProductContext so we will be able to call the useContext hook to consume it
export {ProductProvider,ProductContext};
