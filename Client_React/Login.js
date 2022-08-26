import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
const navigate = useNavigate();
    
const [Data,setData] = useState({
    email : '',
    password : ''
});

const changeHandler = e => {
    setData({...Data,[e.target.name]:e.target.value})
}
const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/login',Data).then(
        navigate("/dashboard")
    )
}

  return (
    <div>
        <center>
            <form onSubmit={submitHandler} autoComplete="off">
                <h3>Login</h3>
                <input type= "email"  onChange={changeHandler} name="email" placeholder="email" /> <br />
                <input type= "password"  onChange={changeHandler} name="password" placeholder="password" /> <br />
                <input type="submit" value="Login"/>
            </form>
        </center>
    </div>
  )
}

export default Login