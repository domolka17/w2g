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
import "./css/Chat.css";


const Chat = () => {
    const [message, setMessage] = useState('')
    const [chatData, getChatData]= useState([])
    const [userData, getUserData] = useState([])
    const [messageList, getListData]= useState([])
    var listData = []

    useEffect(() => {
        const interval = setInterval(() => {
            fetchChatData(sessionStorage.getItem('roomname'))
            fetchUserData(sessionStorage.getItem('roomname'))
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
        console.log(userData)
        console.log(chatData)
        listData = convertChat()
        console.log(listData) 
    }
    const convertChat=()=>{
        
        var check = false
        var temp = [ {autor: 'user', text:'item.text', time: 'item.time'}]

        chatData.forEach((item)=>{
            // first find username
            var user = userData.find((user)=>{
                return user.id = item.userId
            })
            //check user name
            if(user==null||user==undefined){
                user= 'deletetUser'
            }
            //chek messageList length
            if(temp==undefined){
                temp[0]= {autor: user, text:item.text, time: item.time}
            }
            //case 1 messageList length = 0, chek if spot is taken by empty and if it is fill it
            if(temp.length==1)
            {
                if(temp[0]== undefined){
                    temp[0]= {autor: user, text:item.text, time: item.time}
                }
                else{
                    check=true
                }
            }
            //case 2 if length is greater zhan 0 or 0 is not empty fill the next space
            if(temp.length>1||check==true){
                check=false
                temp[temp.length]= {autor: user, text:item.text, time: item.time}
            }
        })
        console.log(temp)
        const filtered = temp.filter((item)=>{
            return item.text != 'item.text'
        })
        console.log(filtered)
        return filtered
    }

    //____________________________

    const fetchChatData = (roomname) => {
        
        fetch('https://gruppe13.toni-barth.com/rooms/'+roomname+'/chat', {
            method:'GET'
        }).then((res) =>
        res.json()).then((response)=> {
            getChatData(response.messages)
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
			{chatData.map( line => <ul className='massage'>{line.userId+': '+line.text}</ul>)}
        </div>
        <div className='ChatSubmitbar'>
            <input type="text"  class="submit" placeholder="Narricht schreiben" value={message} onChange={(change) => setMessage(change.target.value)}></input>
            <button onClick={event => handleButton()} className="message_submit">Send</button>
        </div>
    </div>
    
  )
}

export default Chat