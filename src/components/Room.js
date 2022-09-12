import React from 'react'
import "./css/room.css";
import { useNavigate } from "react-router-dom"
import { createRoom, joinRoom } from "./Controller/RoomController";
import { useEffect, useState } from "react";


const Room = () => {
  const navigate = useNavigate()
  const handleButton = () => {		// gives button its funktion
    if (sessionStorage.getItem('id') == null) {
      navigate('/UserCreateSide')
    }
    else {
      createRoom()
      setTimeout(function () {
        navigate('/Watchparty/'+sessionStorage.getItem('roomname'))
      }, 500)
    }
  }
  const handleButton2 = (roomname) => {        // gives button its funktion
    if (sessionStorage.getItem('id') == null) {
<<<<<<< HEAD
      navigate('/UserCreateSide')

=======
      window.sessionStorage.setItem("redirect", roomname)
      navigate('/UserCreateSide')
>>>>>>> 867bc1ba958c43d116ab286b9b93eaf4114f7807
    }
    else {
      joinRoom(roomname)
      setTimeout(function () {
        navigate('/Watchparty/'+roomname)
      }, 500)
    }
  }

  const [data, getData] = useState([])
  const URL = 'https://gruppe13.toni-barth.com/rooms/';

  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = () => {
    fetch(URL)
      .then((res) =>
        res.json())

      .then((response) => {
        console.log(response.rooms);
        getData(response.rooms);
      })

  }


  return (
    <body>
      <div>
        <div class="room_title_text">
          <h1 class="room_title">Treten Sie einer vorhandenen Watchparty bei</h1>
        </div>
        <div >
          <h3 class="room_h3">Vorhandene Räume</h3>
          <p class="roomlist">
            {data.map((rooms, name) => (
              <tr key={name}>
                <button onClick={event => handleButton2(rooms.name)} className="roomlink_button">{rooms.name}</button>
              </tr>
            ))}
          </p>
        </div>
        <div>

        </div>
        <div>
          <p class="room_text">Oder vielleicht doch eine eigene Watchparty erstellen?</p>
        </div>

        <div class="room_buttons_container">
          <button onClick={event => handleButton()} className="room_buttons">Einen neuen Raum erstellen</button>
        </div>
      </div>
    </body>
  )
}
export default Room;