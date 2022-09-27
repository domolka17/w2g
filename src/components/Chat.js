/**
 *  Chat window
 *  TODO manages Chat
 *  TODO uses get and posts
 *  TODO exports it selfe, needs css style
 *  TODO writing message and submit it
 * 
 */

import React, { useEffect, useState } from 'react'
import {  chatPost } from './Controller/ChatController'
import "./css/Chat.css";


const Chat = () => {
    const [messageList, getListData]= useState([])
    const [message, setMessage] = useState('')
    const [chatData, getChatData]= useState([])
    const [userData, getUserData] = useState([])
    const roomname = sessionStorage.getItem('roomname')

    useEffect(() => {

   
        const interval = setInterval(() => {
                fetchChatData(roomname)
                fetchUserData(roomname)
                console.log('Update Chat')
		}, 3000);
		return () => clearInterval(interval);
	}, []);

    useEffect(()=>{
        console.log(chatData)
        if(chatData.length>0){
            let temp =[]
            for(let i = 0; i<chatData.length; i++) {
                const user = getUserName(chatData[i])
                temp[i]=  { author: user, text: chatData[i].text, time: chatData[i].time}
            }
            getListData(temp)
        }
    }, [chatData]);

    useEffect(()=>{
        console.log(messageList)
    }, [messageList]);


    // submit message button
    const handleButton = ()=>{
        chatPost(message, sessionStorage.getItem('roomname'))
        // after posting message, emptys message-input
        setTimeout(function () {
            setMessage('')
        }, 500)
    }
    const getUserName=(userID)=>{
        const user = userData.find((item)=>{
            return item.id == userID.userId
        })
        let ret
        if(user== undefined){
            console.log(user)
            ret='deleted User'
        }
        else{
            ret=user.name
        }
        return ret
    }

    //____________________________

    const fetchChatData = (roomname) => {
        
        fetch('https://gruppe13.toni-barth.com/rooms/'+roomname+'/chat', {
            method:'GET'
        }).then((res) =>
        res.json()).then((response)=> {
            getChatData(response.messages);
        
        })
        
    }

    const fetchUserData = (roomname) => {
		fetch('https://gruppe13.toni-barth.com/rooms/' + roomname + '/users')
			.then((res) =>
				res.json())
			.then((response) => {
				getUserData(response.users);
                
			})

	}
    
  return (
    <div className='ChatBox'>
        <div className='messageBox'>
			{messageList.map( line => <ul className='massage' key={line.time}>{line.author+': '+line.text}</ul>)}
        </div>
        <div className='ChatSubmitbar'>
            <input type="text"  class="message_submit" placeholder="Nachricht schreiben" value={message} onChange={(change) => setMessage(change.target.value)}></input>
            <button onClick={event => handleButton()} className="message_submit_button">Senden</button>
       
        </div>
    </div>
    
  )
}

export default Chat