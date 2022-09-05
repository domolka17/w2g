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
            setTimeout(function () {
                setChat(chatGet())
                }, 500)
            console.log('a')
		}, 3000);
		return () => clearInterval(interval);
	}, []);

    // submit massage button
    const handleButton = ()=>{
        chatPost(massage)
        // after posting massage, emptys massage-input
        setTimeout(function () {
            setMassage('')
        }, 500)
    }
   
    // massage extarctor 
    const massageExtract=()=>{
        
    
    }


  return (
    <div className='ChatBox'>
        <div className='MassageBox'>
            <ul>
                {chat.map((chat) =>(
                    <li key={chat.id}>{chat.text}</li>
                ))}
            </ul>
        </div>
        <div className='ChatSubmitbar'>
            <input type="text"  class="submit" placeholder="Narricht schreiben" value={massage} onChange={(change) => setMassage(change.target.value)}></input>
            <button onClick={event => handleButton()} className="massage_submit">Send</button>
        </div>
    </div>
    
  )
}

export default Chat