import React, { useEffect } from "react";
import './components/css/App.css';
import './components/css/navbar.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Startseite';
import About from './components/about';
import Help from './components/Help';
import Room from './components/Room';
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
    leaveRoom(sessionStorage.getItem('roomname'))
    logOut(sessionStorage.getItem('id'))
  }
  const logOut = (id) => {
    const url = 'https://gruppe13.toni-barth.com/users/'
    fetch(url + id, {
      method: 'DELETE', headers: { "Content-Type": "application/json" }
    }).then(sessionStorage.clear())
  }
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/index' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/Help' element={<Help />} />
        <Route exact path="/Room" element={<Room />} />
        <Route exact path="/Watchparty/:roomid" element={<Watchparty />} />
        <Route exact path="/UserCreateSide" element={<UserCreatrSide />} />
        <Route exact path="/Chat" element={<Chat />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </HashRouter >
  );
}

export default App;

