import React, { useState } from 'react';
import './Products.css';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
const Products = () => {
   
    const url = 'http://localhost:3000'
    const [img,setImg] = useState('')
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"BreakFast"
    })
    const [foodList,setFoodList] = useState([])

    const fetchList = async()=>{
        const response = await axios.get(`${url}/api/food/lists`)
      
        if(response.data.success){
            
            setFoodList(response.data.data)
            
        }else{
            toast.error("Error")
        }
        
    }

    useEffect(()=>{
        fetchList()
    },[])



   


    const onHandle = (event)=>{
        const name = event.target.name
        const value = event.target.value

        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const onDelete = async(Foodid)=>{
        console.log(Foodid)
        const response = await axios.post(`${url}/api/food/remove`,{id:Foodid})
        if(response.data.success){
            toast.success(response.data.message)
            await fetchList()
        }else{
            toast.error("Error")
        }
    }


    const onHandleSubmit= async(event)=>{
        event.preventDefault();
        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",img)
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                category:"BreakFast",
                price:""
            })
            setImg('')
            toast.success(response.data.message)
            await fetchList()
        }else{
            toast.error(response.data.message)
        }
    }

    

    

    return (
        <div className="manage-menu-container">
           

            <div className="main-content">
                <h1 className="text-2xl font-bold mb-4">Manage Menu</h1>
                
                <form className="add-item-form" onSubmit={onHandleSubmit}>
                    <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
                    <p>Upload image</p>
                    <label htmlFor='image'>
                        <img src={img? URL.createObjectURL(img): assets.upload_area}/>
                    </label>
                    <input type='file' onChange={(e)=>setImg(e.target.files[0])} />
                    <input
                        type="text"
                        value={data.name}
                        name='name'
                        onChange={onHandle}
                        placeholder="Item Name"
                        className="input-field"
                    />
                    <input
                        type="number"
                        name='price'
                        value={data.price}
                        onChange={onHandle}
                        placeholder="Price"
                        className="input-field"
                    />
                    <textarea className='description' onChange={onHandle} placeholder='Product Description' name='description' value={data.description} rows='6' cols='32'></textarea>
                   <br></br>
                    <select name='category' onChange={onHandle} value={data.category}>
                        <option value="BreakFast">BreakFast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Soup">Soup</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Side Dish">Side Dish</option>
                        <option value="Drinks">Drinks</option>
                        
                    </select>
                    <br></br>
                    <button  className="add-item-btn" type='submit'>Add Item</button>
                </form>

                <div className="menu-table">
                    <h3 className="text-lg font-semibold mb-4">Current Menu</h3>
                    <table className="table">
                        <thead>
                            <tr className="table-header">
                                <th>Image</th>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodList.map((item, index) => (
                                <tr key={index}>
                                    <td><img src={`${url}/images/`+item.image}/></td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>${item.price}</td>
                                    <td>{item.category}</td>
                                    <td className="text-center">
                                        <button
                                           onClick={()=>onDelete(item._id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;
