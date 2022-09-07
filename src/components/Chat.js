/**
 *  Chat window
 *  TODO manages Chat
 *  TODO uses get and posts
 *  TODO exports it selfe, needs css style
 *  TODO writing message and submit it
 * 
 */

import React, { useEffect, useRef, useState } from 'react'
import { chatGet, chatPost } from './Controller/ChatController'


const Chat = () => {
    const [message, setMessage] = useState('')
    const [data, getData] = useState([])
   



    useEffect(() => {
        const interval = setInterval(() => {
            handleChat()
            console.log('a')
		}, 3000);
		return () => clearInterval(interval);
	}, []);

    // submit message button
    const handleButton = ()=>{
        chatPost(message, sessionStorage.getItem('roomname'))
        // after posting message, emptys message-input
        setTimeout(function () {
            setMessage('')
        }, 500)
    }

    const handleButton2 = ()=>{
        sessionStorage.setItem("roomname", "abnormal-nutty-alarm")
    }

    const handleChat=()=>{
        if(sessionStorage.getItem('roomname')!=null)
        {
            getData(chatGet(sessionStorage.getItem('roomname')))
        }
    }
    
  return (
    <div className='ChatBox'>
        <div className='messageBox'>
            <p class="messageList">
			    {data.map((messages, time) => (
				    <tr key={time}>
					    <td>{messages.text}</td>
				    </tr>
			    ))}
			</p>
        </div>
        <div className='ChatSubmitbar'>
            <input type="text"  class="submit" placeholder="Narricht schreiben" value={message} onChange={(change) => setMessage(change.target.value)}></input>
            <button onClick={event => handleButton()} className="message_submit">Send</button>
            <button onClick={event => handleButton2()} className="message_submit">delete later</button>
        </div>
    </div>
    
  )
}

export default Chat