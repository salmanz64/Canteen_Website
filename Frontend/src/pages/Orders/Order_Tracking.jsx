import React, { useContext, useEffect, useState } from 'react'
import './Order_Tracking.css'
import { StoreContext } from '../../Context/StoreContext'
import moment from 'moment';
import axios from 'axios'

const Order_Tracking = () => {
  const {url,token} = useContext(StoreContext)
  const [data,setData] = useState([])

  const fetchOrders = async ()=>{
    const response = await axios.post(url+"/api/order/userOrders",{},{headers:{token}});
    setData(response.data.data)
    console.log(response.data.data

    )
  }

    useEffect(()=>{
      if(token){
        fetchOrders();

      }
    },[token])
  return (
    
    <div class="admin-panel">
    <div class="search-container">
    
    </div>

    <div class="orders-container">
      <table id="ordersTable">
        <thead>
          <tr>
            <th>Token No.</th>
            <th>Customer Name</th>
            <th>Order Items</th>
            <th>Price</th>
            <th>Date</th>
            <th>Status</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((item,index)=>{
            let isDate = item.date;
            let formattedDate = moment(isDate).format("DD/MM/YYYY")

            return (
              <tr>
            <td>#{index}</td>
            <td>{item.address.name}</td>
            <td>{item.items.map((item,index)=>{
              return (
                <>
                  {item.name},
                </>
              )
            })}</td>
            <td>${item.amount}</td>
            <td>{formattedDate}</td>
            <td>
              <input value={item.status} type='text' readOnly/>
              
            </td>
         
          </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Order_Tracking
