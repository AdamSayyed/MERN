const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Account = require("./account");

app.use(cors());

const server = http.createServer(app);



mongoose.connect("mongodb+srv://sayyed:sayyed@test.qnftmjb.mongodb.net/Chat?retryWrites=true&w=majority")
.then(()=>{

   


})

const io = new Server(server ,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data,username) => {


    Account.findOne({username:username}).then((result)=>{

 const  room= result.messages;

 


const findroom = (contact)=>{

return contact.room == data;

 }




 const roomresult = room.filter(findroom)

 console.log(roomresult)
 
 socket.emit("room", roomresult)

    })
 

    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
     
                           });

   socket.on("send_message", (data) => {
     socket.to(data.room).emit("receive_message", data);
  });
  socket.on("create", (data) => {
    console.log("dsfds")
   const account = new Account({
    username: data.username,
    password: data.password,
    contacts: data.contacts, 
    messages:[
      {room:"test", 
      author:data.username,
      message: "test"
    
    }

    ]


     });
     account.save();
   });



   const find =()=>{

 

   } 

socket.on("new",(list,username )=>{ 

   
 
   
  Account.findOneAndUpdate({username:username},{$push:{messages: list} }).then((result)=>{console.log(result)})

     

  })

 

 




   socket.on("get",(data)=>{
    console.log(data)


     
 Account.findOne({username:data }).then((result)=>{
 
    
  if(result==null){

    socket.emit("error");
  }else{
    console.log("test")
     socket.emit("recieve", data,result.messages);


  }
 

 })

});

   
 

   

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
 
});
server.listen(3001, () => {
  console.log("SERVER RUNNING");
});