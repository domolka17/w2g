/*

 create Room should be done
 delete Room should be done
 join room should be done
 leave room should be done

TODO Userlist, how to store and display
TODO Roomlist, same problem as before
*/

import React from 'react'


// collection of funktions related to the controll of a room


    export const createRoom =() => {
        const url = 'https://gruppe18.toni-barth.com/rooms/'

        //put request, creation of room
        fetch(url, {
            method:'POST' ,
            headers:{"Content-Type": "application/json"},             
        })
        //take respons, its the name of new room
        .then( response => {
           return response.json()})
        .then (data => { joinRoom(data.name)
        }) 
        return null
    }
    export const joinRoom = (name) => {
        // get roomname and user id put them in url
        fetch('https://gruppe18.toni-barth.com/rooms/'+ name +'/users', {
            method:'PUT',
            headers:{"Content-Type": "application/json"},
            body:  JSON.stringify({"user": sessionStorage.getItem('id')})
        })
        window.sessionStorage.setItem("roomname", name)
    }
    export const leaveRoom = (roomname) => {
        // delete user from room
        fetch('https://gruppe18.toni-barth.com/rooms/'+roomname+'/users', {
          method:'DELETE',
          headers:{"Content-Type": "application/json"},
          body:  JSON.stringify({"user": sessionStorage.getItem('id')})
      })
        //update theUser
        sessionStorage.removeItem('roomname');
    }
    export const displayUserlist = (name) => {
        fetch('https://gruppe18.toni-barth.com/rooms/'+name+'/users', {
            method:'GET'
        }).then(  respons =>  {return respons.json()}).then(data => {console.log(data)}) // TODO
    }


