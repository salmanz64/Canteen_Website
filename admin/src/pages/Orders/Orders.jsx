
import "./Orders.css";
import moment from 'moment';


import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Orders = () => {
 
  const [ordersList,setOrdersList] = useState([])

  const fetchOrders = async ()=>{
    const response = await axios.get('http://localhost:3000'+"/api/order/list");
    console.log(response.data.data)
    setOrdersList(response.data.data)
    
  }

  const statusHandler= async(event,orderId)=>{
      console.log(event.target.value)
      const response = await axios.post('http://localhost:3000/api/order/status',{
        orderId,
        status:event.target.value

      })
      if(response.data.success){
        await fetchOrders();
      }

  }

    useEffect(()=>{
     
        fetchOrders();

      
    },[])
  return (
   
    <div class="admin-panel">
    

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
          {ordersList.map((item,index)=>{
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
            <td>{
              
              
              formattedDate}</td>
            <td>
              <select name='status' value={item.status} onChange={(event)=>statusHandler(event,item._id)}>
                <option value='Preparing'>Preparing</option>
                <option value="Ready">Ready</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </td>
           
          </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Orders;
