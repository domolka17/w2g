import React from 'react'

/**
 * get massage
 * put massage
 */


const url = 'https://gruppe13.toni-barth.com/rooms/'

    export const chatGet = (roomname) => {
        var data 

        fetch('https://gruppe13.toni-barth.com/rooms/'+roomname+'/chat', {
            method:'GET'
        }).then((res) =>
        res.json()).then((res)=>data=res)
        return data
    }

    export const chatPost = (data, roomname) => {
        fetch(url+roomname+'/chat', {
            method:'PUT',
            headers:{"Content-Type": "application/json"},
            body:  JSON.stringify({"user": sessionStorage.getItem('id'),
                                   "message": data})
        })
    }

    