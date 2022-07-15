import { useEffect, useState } from 'react'
export const useDeleteFetch = (url, id) => {

    fetch(url, {
        method:'DELETE',
        headers:{"Content-Type": "application/json"}, // deklares intent
        body: JSON.stringify({"user": id})            // points at id, to delete
    }

    )}
