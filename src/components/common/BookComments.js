import React, {useEffect} from 'react'

export const BookComments = ({firebase, bookId}) => {

    useEffect(() => {
        const unsubscribe = firebase.subscribeToBookComments({
            bookId, 
            onSnapshot: (snapshot) => console.log(snapshot)
        })

        return () => {
            if(unsubscribe) unsubscribe();
        }
    
    }, [])

    return (
        <div>
            Test Comment
        </div>
    )
}