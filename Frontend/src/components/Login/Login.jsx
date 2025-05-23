import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const Login = ({setLogin}) => {


    const {url,token,setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Login")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData((prev)=>({...prev,[name]:value}))
    }


    const onSubmit =async (event)=>{
        event.preventDefault()

        let newUrl = url

        if(currState == "Login"){
            newUrl+='/api/user/login'
        }else{
            newUrl+='/api/user/register'
        }

        const response = await axios.post(newUrl,data)

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("Token",response.data.token)
            setLogin(false)
        }else{
            alert(response.data.message)
        }
    }

  return (
    
     <div className="login-popup">
    <div className="login-container">
    <span className="icon material-symbols-rounded" onClick={()=>setLogin(false)}>close</span>
        <h2>{currState=="Login"?"Login":"Sign Up"}</h2>
        <form className='Form-Container' onSubmit={onSubmit}>
        {currState == "Login" ?<></>:<div className="input-group">
                <label htmlFor="name">name</label>
                <input type="text" onChange={handleChange} value={data.name} id="name" name="name" required/>
            </div>}
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" onChange={handleChange} value={data.email} required/>
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} value={data.password} required/>
            </div>
            <button type="submit" className="login-btn">{currState=="Login"?"Login":"Sign Up"}</button>
        </form>
        <div className="forgot-password">
            <p><a href="#">Forgot Password?</a></p>
        </div>
        <div className="signup-link">
            {currState =="Login"? <p >Don't have an account? <a onClick={()=>setCurrState("Sign Up")} href="#">Sign Up</a></p>
         :  <p >Already have an account? <a onClick={()=>setCurrState("Login")} href="#">Login</a></p>
        }
        </div>
        
  
  


    </div>
</div>
    
  )
}

export default Login
