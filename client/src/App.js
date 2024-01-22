import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Login from "./login";
  
import { useEffect, useState } from "react";
import Chat from "./Chat";
 
  

 
function App() {


  

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
         </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;