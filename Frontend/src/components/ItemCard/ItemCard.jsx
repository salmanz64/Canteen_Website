import React, { useContext, useState } from 'react'
import './ItemCard.css'
import { StoreContext } from '../../Context/StoreContext'
const ItemCard = ({image,name,price,description,id}) => {

   
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)

  return (
    <div className="Item-Card" >
    <div className="image-and-title">
      <img src={`${url}/images/`+image} alt="" />
      <div className="title">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
    <div className="price-and-inc">
    <p>${price}</p>
      <div className="card__counter">
        <button className="card__btn" onClick={()=>removeFromCart(id)}>-</button>
        <div className="card__counter-score">{cartItems[id] ?? 0}</div>
        <button className="card__btn card__btn-plus" onClick={()=>addToCart(id)}>+</button>
      </div>
    </div>
  </div>
  )
}

export default ItemCard
