import React, { useEffect } from "react";
import './App.css';
import './components/css/navbar.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Startseite';
import About from './components/about';
import Help from './components/Help';
import Room from './components/Room';
import Host from "./components/Host";
import Watchparty from "./components/Watchparty";
import { deleteUser } from "./components/Controller/UserController";
import { leaveRoom } from "./components/Controller/RoomController";
import UserCreatrSide from "./components/UserCreateSide";


function App() {
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', handleTabClosing)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
      window.removeEventListener('unload', handleTabClosing)
    }
})
const handleTabClosing = () => {
  logOut(sessionStorage.getItem('id'), sessionStorage.getItem('name'))
}
const alertUser = (event) => {
  event.preventDefault()
  event.returnValue = ''
}
const logOut = (id, roomname)=>{
  leaveRoom(roomname)
  deleteUser(id)
  sessionStorage.clear()
}
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/index' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/Help' element={<Help />} />
        <Route path="/Room" element={<Room/>}/>
        <Route path="/Host" element={<Host/>}/>
        <Route path="/Watchparty" element={<Watchparty/>}/>
        <Route path="/UserCreateSide" element={<UserCreatrSide/>}/>
      </Routes>
    </Router>
  );
}

export default App;

