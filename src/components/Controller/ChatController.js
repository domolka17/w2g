import React from 'react'

/**
 * get massage
 * put massage
 */


const url = 'https://gruppe13.toni-barth.com/rooms/'+sessionStorage.getItem('roomname')+'/chat'

    export const chatGet = () => {
        const data =''
        fetch(url, {
            method:'GET'
        }).then((res) =>
        res.json()).then((res)=> data=res)
        return data
    }

    export const chatPost = (data) => {
        fetch(url, {
            method:'PUT',
            headers:{"Content-Type": "application/json"},
            body:  JSON.stringify({"user": sessionStorage.getItem('id'),
                                   "message": data})
        })
    }

    