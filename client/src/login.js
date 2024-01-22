 
import "./login.css";
 import "./App.css";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
  import { useEffect, useState } from "react";
import Chat from "./Chat";
import io from "socket.io-client";

const mongoose = require("mongoose");
 
     
const socket = io.connect("http://localhost:3001");


 
function Login(){

 



    const [username,setUsername] = useState(0);
const [password,setPassword] = useState(0);
const [chat,setChat]=useState(false);
const [room,setRoom]=useState();
const[messages,setMessages] = useState([])
const [login,setlogin] = useState(false)






 const create = ()=>{


    const login ={
        username:username,
        password:password,
        contacts:[],
        messages: [
            {
              room: '',
              author: 'sdfs',
              message: '',
               
            }
          ],
        }

 socket.emit("create",login);
 
}


const   get  = ()=>{



      
    socket.emit("get",username)
      setChat(true)
       

} 
 

    socket.on("recieve",(login,message )=>{


        console.log("test")
 
         
    
        console.log("login",login)
        console.log(message)
 
     setUsername(login )
    setMessages(message)
 
     
 

})
 
socket.on("error", ()=>{

             
            alert("Incorrect")
    
        })
 
 


return(
    <div>

{!chat ? (
<div class="container">
<div class="screen">
    <div class="screen__content">
        <form class="login">
            <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input type="text" class="login__input" placeholder="User name / Email" onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>
            <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input type="password" class="login__input" placeholder="Password"onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
            <button class="button login__submit" onClick={get}>
                <span class="button__text">Log In Now</span>
                <i class="button__icon fas fa-chevron-right"></i>
            </button>	
            <button class="button login__submit" onClick={create}>
                <span class="button__text">Create Account</span>
                <i class="button__icon fas fa-chevron-right"></i>
            </button>			
        </form>
        <div class="social-login">
            <h3>log in via</h3>
            <div class="social-icons">
                <a href="#" class="social-login__icon fab fa-instagram"></a>
                <a href="#" class="social-login__icon fab fa-facebook"></a>
                <a href="#" class="social-login__icon fab fa-twitter"></a>
            </div>
        </div>
    </div>
    <div class="screen__background">
        <span class="screen__background__shape screen__background__shape4"></span>
        <span class="screen__background__shape screen__background__shape3"></span>		
        <span class="screen__background__shape screen__background__shape2"></span>
        <span class="screen__background__shape screen__background__shape1"></span>
    </div>		
</div>
</div>
):( <Chat socket={socket} username={username} messages={messages} room = {room}/>)}
 
</div>
);







}

export default Login