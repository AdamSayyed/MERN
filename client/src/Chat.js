
import "./Chat.css";

import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, messages  }) {



 

    
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [originalmessageList, setoriginalMessageList] = useState([] );
  const [messageList, setMessageList] = useState([] );
  const [contact,setContact] =useState( );

    
console.log(messageList)



  useEffect(()=>{
 

 
  } )
     

    const update =()=>{

socket.emit("new",  messageList  ,username ) ;

    }
 
  console.log(messageList )
  const sendMessage =   () => {
    if (currentMessage !== "") {
      const messageData = {
        room: contact,
        author: username,
        message: currentMessage,
         
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      socket.emit("new",  messageData  ,username ) ;

      setCurrentMessage("");
    }
  };


  const joinroom =()=>{
socket.emit("join_room",contact,username)
 
 

  }


 useEffect(()=>{

  socket.on("receive_message", ( incy) =>{
    console.log("54")
    setMessageList((list) => [...list, incy]);

    socket.emit("new",  incy  ,username ) ;



  });


  




 },[socket])


  



   
 

 
    
  
 

  socket.on("room", ( incy) =>{
    
    setMessageList(incy);
     


});
  return (

    <div className="chat-window">
    <div className="chat-header">
      <p>Live Chat</p>
    </div>
    <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
    <div className="chat-footer">
      <input
        type="text"
        value={currentMessage}
        placeholder="Hey..."
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
      <input
        type="text"
         placeholder="Contact"
        onChange={(event) => {
          setContact (event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && joinroom();
        }}
      />
      <button onClick={joinroom}>&#9658;</button>
    </div>
  </div>
  );
}

export default Chat;