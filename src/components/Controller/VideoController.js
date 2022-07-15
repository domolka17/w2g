import React, { useState } from 'react'
/**
*    TODO post videos (form and methode)
 *   TODO video sync
 */

  //  takes the url and sends it to the api, uses session userid and uses getVideo()  
        // get video url, fetch video 
    export const postVideo = (url) => {
        fetch('https://gruppe18.toni-barth.com/rooms/'+sessionStorage.getItem('roomname') +'/video',{
            method:'PUT',
            headers:{"Content-Type": "application/json"}, 
            body:  JSON.stringify({"user": sessionStorage.getItem('id'),"url": url}),})
            .then( (response) => { getVideo()} )
    }
 
    // saves the roomurl (in the api) to a sessionkey and returns it
    export const getVideo = () => {
        // get video url, fetch video url
        fetch('https://gruppe18.toni-barth.com/rooms/' + sessionStorage.getItem('roomname') + '/video')
        .then(response => {return response.json()}).then(data => { sessionStorage.setItem("url", data.url)})
        return sessionStorage.getItem('url')
    }
    //saves room position from api of the api video to the session 
    export const getVideoPos = () => {          
        // get video url, fetch video url
        fetch('https://gruppe18.toni-barth.com/rooms/' + sessionStorage.getItem('roomname') + '/position')
        .then(response => {return response.json()}).then(data => { })
        return sessionStorage.getItem('position')
    }
    // takes session positon and posts it to the api
    export const postVideoPos = (pos) => {  //posts room position of video
        // get video url, fetch video url
        fetch('https://gruppe18.toni-barth.com/rooms/' + sessionStorage.getItem('roomname') + '/position', {
            method: 'PUT',
            headers:{"Content-Type": "application/json"}, 
            body:  JSON.stringify({"user": sessionStorage.getItem('id'),"position": pos}),})
    }

    export const postVideoStat = (stat) => {  //posts room position of video
        // get video url, fetch video url
        fetch('https://gruppe18.toni-barth.com/rooms/' + sessionStorage.getItem('roomname') + '/status', {
            method: 'PUT',
            headers:{"Content-Type": "application/json"}, 
            body:  JSON.stringify({"user": sessionStorage.getItem('id'),"status": stat}),
        })
    }

    export const getVideoStat = () => {          
        // get video url, fetch video url
        fetch('https://gruppe18.toni-barth.com/rooms/' + sessionStorage.getItem('roomname') + '/status')
        .then(response => {return response.json()}).then(data => { sessionStorage.setItem("stat", data.status)})

        return sessionStorage.getItem('stat')
    }
    

    
	
