import React, { useContext, useState } from "react";
import "./Home.css";
import { menu_list } from "../../assets/assets";
import MyCourasel from "../../components/MyCarousel/MyCourasel";
import ItemCard from "../../components/ItemCard/ItemCard";
import { StoreContext } from "../../Context/StoreContext";
const Home = () => {

  const [category,setCategory] = useState("All")
  const {foodList} = useContext(StoreContext)
 

  
  return (
    <>
    
      <MyCourasel />
    <h2>Explore Our Menu</h2>
    
      <div class="category-sections">
        {menu_list.map((item,index)=>{
          return (
            <button key={index} className={`menu-icon ${category==item.menu_name ? "active": ""}` }  onClick={()=>setCategory((prev)=>item.menu_name==prev ? "All" :item.menu_name)} >
            <div className={`menu-icon` }>{item.menu_image}</div>{item.menu_name}</button>
          )
        })}
      </div>



      <h2>Lunch Menu</h2>
      <div className="Menu-Items">

        { foodList.map((item)=>{
          if(category == "All" || category ==item.category){
          return (
            
          <ItemCard  id={item._id} image={item.image} name={item.name} description={item.description} price={item.price}/>
          )
          }
        })}
        
      </div>
    </>
  );
};

export default Home;
