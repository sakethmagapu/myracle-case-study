import React,{useState} from 'react'
import axios from 'axios';
const Register = () => {

const [Data,setData] = useState({
    username : '',
    email : '',
    password : '',
    confirmpassword:''
});

const changeHandler = e => {
    setData({...Data,[e.target.name]:e.target.value})
}
const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/register',Data).then(
        res => alert(res.data)
    )
}

  return (
    <div>
        <center>
            <form onSubmit={submitHandler}>
                <h3>Register</h3>
                <input type= "text" onChange={changeHandler} name="username" placeholder="username" /> <br />
                <input type= "email"  onChange={changeHandler} name="email" placeholder="email" /> <br />
                <input type= "password"  onChange={changeHandler} name="password" placeholder="password" /> <br />
                <input type= "password"  onChange={changeHandler} name="confirmpassword" placeholder="confirm password" /> <br />
                <input type="submit" value="Register"/>
            </form>
        </center>
    </div>
  )
}

export default Register