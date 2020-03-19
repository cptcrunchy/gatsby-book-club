import React, {useContext, useEffect, useState} from 'react'
import {FirebaseContext} from '../components/Firebase'
import {Form, Input, Button} from '../components/common'
import styled from 'styled-components'

const FormField = styled.div`
    margin: 0 0 20px 0;
`

const fileReader = new FileReader();

const AddBook = () => {
    const {firebase} = useContext(FirebaseContext)
    const [authors, setAuthors] = useState([])
    const [bookCover, setBookCover] = useState('');
    const [bookName, setBookName] = useState('');
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        fileReader.addEventListener('load', () => {
            setBookCover(fileReader.result)
        })
    }, [])

    useEffect(() => {
        // query all available authors
        if(firebase){
            firebase.getAuthors().then( snapshot => {
                const availableAuthors = []

                snapshot.forEach(doc => {
                    availableAuthors.push({
                        id: doc.id,
                         ...doc.data()
                    })
                })
                setAuthors(availableAuthors)
            })
        }
    }, [firebase])

    return (
        <Form onSubmit={e => {
            e.preventDefault();
            console.log(bookCover)
            console.log(bookName)
            console.log(authorId)
        }}>
            <FormField>
                <strong>Book Title</strong>
                <Input value={bookName}
                placeholder="book name"
                onChange={e => {
                    e.persist();
                    setBookName(e.target.value)

                }}  />
            </FormField>
            <FormField>
                <strong>Author</strong>
                <div>
                    <select value={authorId}
                    onChange={e => {
                        e.persist();
                        setAuthorId(e.target.value)
                    }} >
                        {authors.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>
            </FormField>
            <FormField>
                <strong>Book cover</strong>
                <Input type="file"
                onChange={e => {
                    e.persist();
                    fileReader.readAsDataURL(e.target.files[0])
                }} />
            </FormField>
            <Button type="submit" block>
                Add new book        
            </Button>
        </Form>
    )
}

export default AddBook;