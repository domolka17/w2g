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
import { leaveRoom } from "./components/Controller/RoomController";
import UserCreatrSide from "./components/UserCreateSide";
import { NotFound } from "./components/NotFound";
import Chat from "./components/Chat";


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
  logOut(sessionStorage.getItem('id'))
}
const alertUser = (event) => {
  event.preventDefault()
  event.returnValue = ''
  // not lösung, nutzer werden sonst nie gelöscht bei verlassen der Seite
  leaveRoom( sessionStorage.getItem('roomname'))
  logOut(sessionStorage.getItem('id'))
}
const logOut = (id)=>{
  const url = 'https://gruppe13.toni-barth.com/users/'
  fetch(url+ id, {
    method:'DELETE', headers:{"Content-Type": "application/json"}
  }).then(sessionStorage.clear())
}
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/w2g2022-web' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/Help' element={<Help />} />
        <Route path="/Room" element={<Room/>}/>
        <Route path="/Host" element={<Host/>}/>
        <Route path="/Watchparty/:roomid" element={<Watchparty/>}/>
        <Route path="/UserCreateSide" element={<UserCreatrSide/>}/>
        <Route path="/Chat" element={<Chat/>}/>
        <Route path="*" element={<NotFound/> }/>     
      </Routes>
    </Router>
  );
}

export default App;

