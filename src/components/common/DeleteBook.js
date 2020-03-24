import React, {useState} from 'react'
import {navigate} from 'gatsby'
import {Form} from './'
import styled from 'styled-components'


const FormButton = styled.button`
    padding: 6px 16px;
    background: #d30000;
    color: white;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    ${props => props.block ? 'display: block; width: 100%;' : ''}

    &:hover{
        background: #9b0000;
    }
`


export const DeleteButton = ({firebase, bookId}) => {


    function handleDeleteBookSubmit(e) {
        e.preventDefault();
        firebase.deleteBook({
            bookId
        })
        .then( () => {
           navigate('/')
        })
    }

    return (
        <Form onSubmit={handleDeleteBookSubmit}>
            <FormButton type="submit">
                Delete Book
            </FormButton>
        </Form>
    )
}