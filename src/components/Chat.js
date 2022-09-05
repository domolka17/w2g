/**
 *  Chat window
 *  TODO manages Chat
 *  TODO uses get and posts
 *  TODO exports it selfe, needs css style
 *  TODO writing massage and submit it
 * 
 */

import React, { useEffect, useRef, useState } from 'react'
import { chatGet, chatPost } from './Controller/ChatController'


const Chat = () => {
    const [massage, setMassage] = useState('')
    const [chat,setChat] = useState([])
    const [currentChat,setCurrentChat] = useState([])



    useEffect(() => {
        const interval = setInterval(() => {
            handleChat()
            console.log('a')
		}, 3000);
		return () => clearInterval(interval);
	}, []);

    // submit massage button
    const handleButton = ()=>{
        chatPost(massage, sessionStorage.getItem('roomname'))
        // after posting massage, emptys massage-input
        setTimeout(function () {
            setMassage('')
        }, 500)
    }

    
    
    const handleButton2 = ()=>{
        sessionStorage.setItem("roomname", "better-adamant-scooter")
    }

    const handleChat=()=>{
        if(sessionStorage.getItem('roomname')!=null)
        {
            setChat(chatGet(sessionStorage.getItem('roomname')))
        }
    }
    
  return (
    <div className='ChatBox'>
        <div className='MassageBox'>
           {chat.map((chat)=> (
            <tr key={chat.time}>
                <td>{chat.text}</td>
            </tr>
           ))}
        </div>
        <div className='ChatSubmitbar'>
            <input type="text"  class="submit" placeholder="Narricht schreiben" value={massage} onChange={(change) => setMassage(change.target.value)}></input>
            <button onClick={event => handleButton()} className="massage_submit">Send</button>
            <button onClick={event => handleButton2()} className="massage_submit">delete later</button>
        </div>
    </div>
    
  )
}

export default Chat