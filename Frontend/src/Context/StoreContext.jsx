import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from 'axios'



export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{

    const [cartItems,setCartItems] = useState({})
    const [token,setToken] = useState("")
    const [foodList,setFoodList] = useState([])
    // 'http://localhost:3000' 
    const url = 'https://canteen-website-teal.vercel.app';

    const addToCart =async (itemId)=>{
        
        if(!cartItems[itemId]){
            // itemId is enclosed in bracket because in js [itemId] denotes the value else plain string
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart =async (itemId) =>{
       
        if(cartItems[itemId] && cartItems[itemId]>0){
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId] - 1 }))
        }
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
        
    }

    const loadCartData = async (token) =>{
       const response = await axios.post(url+'/api/cart/get',{},{headers:{token}})
       console.log(response)
       setCartItems(response.data.cartData)
    }
    const getTotalAmount = ()=>{
        let totalAmount = 0
        
        for (const item in cartItems ){
            if(cartItems[item]>0){
            let product = foodList.find((product)=>product._id === item)
            totalAmount += product.price * cartItems[item]
            }
        }
        return totalAmount

    }
    const getQuantity = ()=>{
        let total = 0
        
        for (const item in cartItems ){
            if(cartItems[item]>0){
            total +=  cartItems[item]
            }
        }
        return total

    }
    const fetchFoodList = async () =>{
        const response = await axios.get(`${url}/api/food/lists`)
        
        if(response.data.success){
            setFoodList(response.data.data)
        }
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("Token")){
                setToken(localStorage.getItem("Token"))
                await loadCartData(localStorage.getItem("Token"));
            }
            
        }
        loadData();
    },[])

    const contextValue = {
        foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,
        token,
        getQuantity,
        setToken
    }

        
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;