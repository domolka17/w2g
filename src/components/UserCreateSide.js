import React, { useState, useEffect } from 'react'
import {  createUser } from "./Controller/UserController";
import "./css/host.css";
import {useNavigate} from "react-router-dom"
import { createRoom, joinRoom } from './Controller/RoomController';

const UserCreatrSide = () => {
    const [inp, setInput] = useState('')
    const navigate = useNavigate()
    const [check, setCheck]=useState()
    const [redirect, setRedirect]=useState(sessionStorage.getItem('redirect'))
    const [find, setFind]=useState([])
    const [rooms, setrooms]=useState([])
    

    useEffect(()=>{
       if(redirect==undefined){
        setRedirect(sessionStorage.getItem('redirect'))
       }
       else{
        console.log(redirect)
        getRooms()
       }
    }, [redirect]);


    useEffect(()=>{
        console.log(find)
        setCheck(checker())
    },[find])

    


    const  handleButton =  () => {		// gives button its funktion

        if(sessionStorage.getItem('redirect')!=null){
            sessionStorage.removeItem('redirect');

            // triggers when room is available
            if(check==true){
                createUser(inp)
                setTimeout(function () {
                    joinRoom(redirect)
                    }, 500)
                
                setTimeout(function () {
                navigate('/Watchparty/'+redirect)
                }, 500)
            }

            else{
                navigate('/*')
            }


           
        }
        else{
            createUser(inp)
            setTimeout(function () {
                createRoom()
                setTimeout(function () {
                navigate('/Watchparty/'+sessionStorage.getItem('roomname'))
                }, 500)
                }, 200)
        }
    }

    const checker=()=>{
        if(find == undefined)
        {
            console.log(false)
            return false
        }
        else{
            console.log(true)
            return true
        }
    }

    const finder=()=>{
        let temp 
        temp = rooms.find((item)=>{
            return item.name == redirect
            })
            return temp
        }
        
    const getRooms=()=>{
        fetch('https://gruppe13.toni-barth.com/rooms/')
          .then((res) =>
        res.json())
          .then((response) => {
            console.log(response.rooms)
            setrooms(response.rooms)
         }).then(finder())
    }
        

  return (
    <>
    <body class="home">
        <div>
            <div class="hosttitle_text">
                <h1 class="hosttitle">Erstellen sie einen eigenen Raum für ihre Watchparty!</h1>
            </div>
            <div class="host_text">
                <p class="host_textbox">Bitte geben Sie einen Benutzernamen ein um diese Seite nutzen zu können.</p>
            </div>
            <div class="input">
                <div class="eins">
                <input type="text" class="input_box" placeholder="Benutzernamen eingeben zb.: Floppa" value={inp} onChange={(change) => setInput(change.target.value)}></input>
                </div>
                <div class="zwei">
						<button onClick={event => handleButton()} className="host_button">Bestätigen	</button>
                </div>
            </div>
        </div>
    </body>
</>
  )
}

export default UserCreatrSide