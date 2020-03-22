import React, {useContext, useEffect, useState} from 'react'
import {FirebaseContext} from '../components/Firebase'
import {Form, Input, Button} from '../components/common'
import styled from 'styled-components'
import {navigate} from 'gatsby'

const FormField = styled.div`
    margin: 0 0 20px 0;
`

let fileReader;

if(typeof window !== 'undefined'){
    fileReader = new FileReader();
}

const AddBook = () => {
    const {firebase} = useContext(FirebaseContext)
    const [authors, setAuthors] = useState([])
    const [bookCover, setBookCover] = useState('');
    const [bookName, setBookName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [success, setSuccess] = useState(false);
    let isMounted = true;

    
    useEffect(() => {
        return () => {
            isMounted = false;
        }
    },[])

    useEffect(() => {
        fileReader.addEventListener('load', () => {
            setBookCover(fileReader.result)
        })
    }, [])

    useEffect(() => {
        // query all available authors
        if(firebase){
            firebase.getAuthors().then( snapshot => {
                if(isMounted){

                    const availableAuthors = []
                    
                    snapshot.forEach(doc => {
                        availableAuthors.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                    
                    setAuthorId(availableAuthors[0].id)
                    setAuthors(availableAuthors)
                }
            })
        }
    }, [])

    return (
        <Form onSubmit={e => {
            e.preventDefault();
            firebase.createBook({
                bookCover,
                bookName,
                bookSummary,
                authorId
            }).then( () =>{
                if(isMounted){    
                    setSuccess(true)
                    navigate('/')
                }
            })
        }}>
            <FormField>
                <strong>Book Title</strong>
                <Input value={bookName}
                placeholder="book name"
                onChange={e => {
                    e.persist();
                    setSuccess(false)
                    setBookName(e.target.value)

                }}  />
            </FormField>
            <FormField>
                <strong>Author</strong>
                <div>
                    <select value={authorId}
                    onChange={e => {
                        e.persist();
                        setSuccess(false)
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
                    setSuccess(false)
                    fileReader.readAsDataURL(e.target.files[0])
                }} />
            </FormField>
            <FormField>
                <strong>Book Summary</strong>
                <Input placeholder="book summary"
                value={bookSummary}
                onChange={e => {
                    e.persist();
                    setSuccess(false)
                    setBookSummary(e.target.value)
                }} />
            </FormField>
            {!!success && 
            <span>New book added successfully!</span>
            }
            <Button type="submit" block>
                Add new book        
            </Button>
        </Form>
    )
}

export default AddBook;