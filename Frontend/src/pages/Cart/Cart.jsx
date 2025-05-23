import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
const Cart = () => {


  const {foodList,cartItems,removeFromCart,getTotalAmount,url,getQuantity} = useContext(StoreContext)
  return (
    <div className='full-body'>
    <div className="cart-container">
        <h2>Cart Totals</h2>
        <div className="cart-header">
            <span className="cart-image">Item</span>
            <span className="cart-title">Title</span>
            <span className="cart-quantity">Quantity</span>
            <span className="cart-price">Price</span>
            <span className="cart-total">Total</span>
            <span className="cart-remove">Remove</span>
        </div>
        {
          foodList.map((item,index)=>{
            if(cartItems[item._id]>0){
              return (
                <div className="cart-item">
            <div className="cart-image">
                <img src={`${url}/images/`+item.image} alt="Food Item 1"/>
            </div>
            <div className="cart-title">{item.name}</div>
            <span className="cart-quantity">{cartItems[item._id]}</span>
            <span className="cart-price">${item.price}</span>
            <span className="cart-total">${cartItems[item._id] * item.price}</span>
            <span className="cart-remove" onClick={()=>removeFromCart(item._id)}>x</span>
        </div>
              )
            }
          })
        }
        
        
    </div>
    <div className='cart-details'>
    <h2>Cart Total</h2>
        <div className="cart-subtotal-container">SubTotal: ${getTotalAmount()}</div>
        <div className="cart-cfee-container">Extra Fee: $5</div>
        <div className="cart-quantity-container">Quantity: {getQuantity() || 0}</div>
        <div className="cart-total-container">Total: ${getTotalAmount()+5}</div>
        
        <button className="checkout-button">Proceed to Checkout</button>
        </div>
    </div>
  )
}

export default Cart
