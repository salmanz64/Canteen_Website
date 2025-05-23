import React, { useContext, useEffect, useState } from 'react'
import './Place.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const Place = () => {



    const {getTotalAmount,getQuantity,foodList,cartItems,url,token} = useContext(StoreContext)

    const [data,setData] = useState({
        name:"",
        email:"",
        address:"",
        number:"",
        table:"1"

    })

    const onHandle= (event)=>{

        const name = event.target.name;
        const value = event.target.value;
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const onSubmit = async( event)=>{
        event.preventDefault()
        let orderItems = [];
        foodList.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address:data,
            items:orderItems,
            amount:getTotalAmount() + 5
        }
        let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
        console.log(response)
        if(response.data.success){
            const {session_url} = response.data;
            window.location.replace(session_url)
        }else{
            alert("Error")
        }
    }
    
  return (
    <form class="checkout-container"onSubmit={onSubmit}>
        <div class="billing-details">
            <h2>Billing Details</h2>
            <label for="name">Name</label>
            <input type="text" id="name" name='name' value={data.name} onChange={onHandle} required placeholder="Enter your name"/>
            
            <label for="email">Email</label>
            <input type="email" id="email"  name='email' value={data.email} onChange={onHandle} required placeholder="Enter your email"/>
            
            <label for="address">Address</label>
            <input type="text" id="address"  name='address' value={data.address} onChange={onHandle} required placeholder="Enter your address"/>
            
            <label for="number">Mobile Number</label>
            <input type="text" id="number"  name='number' value={data.number} onChange={onHandle} required placeholder="Enter your Number"/>
            
            <label for="table">Table</label>
            <select id="table"  name='table' value={data.table} onChange={onHandle} >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            
            {/* <label for="payment">Payment Method</label>
            <select id="payment">
                <option>Cash on Delivery</option>
                <option>Credit/Debit Card</option>
                <option>UPI Payment</option>
            </select> */}
        </div>
        <div class="order-summary">
            <h2>Order Summary</h2>
            <p>Quantity: {getQuantity()}</p>
            
            <p><strong>Total: ${getTotalAmount()}</strong></p>
            <button class="checkout-btn" type='submit'>Proceed to Checkout</button>
        </div>
    </form>
  )
}

export default Place
