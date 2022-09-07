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
    const [chatFeed, getFeed] = useState([])
    const [chatData, getChat]= useState([])



    useEffect(() => {
        const interval = setInterval(() => {
            handleChat()
            console.log('Update Chat')
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



    const handleChat=()=>{
        getChat(chatGet(sessionStorage.getItem('roomname')))
        if(sessionStorage.getItem('roomname')!=null)
        {
            if(chatData!=null){getFeed(chatData)}
        }
    }
    
  return (
    <div className='ChatBox'>
        <div className='messageBox'>
            <p class="messageList">
			    {chatFeed.map((chatFeed, time) => (
				    <tr key={time}>
					    <td>{chatFeed.text}</td>
				    </tr>
			    ))}
			</p>
        </div>
        <div className='ChatSubmitbar'>
            <input type="text"  class="submit" placeholder="Narricht schreiben" value={message} onChange={(change) => setMessage(change.target.value)}></input>
            <button onClick={event => handleButton()} className="message_submit">Send</button>
        </div>
    </div>
    
  )
}

export default Chat