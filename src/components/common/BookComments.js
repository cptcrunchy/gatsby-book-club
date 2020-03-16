import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from './'

const CommentForm = styled.form`
    display: flex;
    margin: 32px 0 0 0;
    ${Input}{
        margin: auto 8px auto 0;
    }

    ${Button}{
        margin: auto 0;
    }
`

const CommentListItem = styled.div`
    >strong {
        font-size: 80%;
        color: #666;
    }
    border-bottom: 1px solid #ddd;
    padding: 4px 0;

`
export const BookComments = ({firebase, bookId}) => {

    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    useEffect(() => {
        const unsubscribe = firebase.subscribeToBookComments({
            bookId, 
            onSnapshot: (snapshot) => {
                console.log(snapshot);
                const snapshotComments = [];
                snapshot.forEach(doc => {
                    snapshotComments.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setComments(snapshotComments);
            }
        })

        return () => {
            if(unsubscribe) unsubscribe();
        }
    
    }, [])

    function handlePostCommentSubmit(e){
        e.preventDefault();
        console.log(commentText);
        firebase.postComment({
            text: commentText,
            bookId
        })
    }

    function handleOnChange(e){
        setCommentText(e.target.value)
    }

    return (
        <div>
            <CommentForm onSubmit={handlePostCommentSubmit}>
                <Input value={commentText} onChange={handleOnChange} />
                <Button type="submit">
                    Post comment
                </Button>
            </CommentForm>
            {comments.map( comment => (
                <CommentListItem key={comment.id}>
                    <strong>{comment.username}</strong>
                    <div>
                        {comment.text}
                    </div>
                </CommentListItem>
            ))}
        </div>
    )
}