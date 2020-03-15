import React, { useState, useContext } from 'react'
import {FirebaseContext} from '../components/Firebase'
import {Form, Input, Button} from '../components/common'

import SEO from '../components/seo'

const Login = () => {
    const [formValues, setFormValues] = useState({email: '', password: ''});
    const {firebase} = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        firebase.login({email: formValues.email, password: formValues.password}).catch( error => {
            console.log(error);
            setErrorMessage(error.message);
        });
    }

    function handleInputChange(e){
        e.persist();
        setErrorMessage('')
        setFormValues( currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <React.Fragment>
            <SEO title="Login" />
            <Form onSubmit={handleSubmit}>
                <Input required value={formValues.email} name="email" onChange={handleInputChange} placeholder="email" type="email" />
                <Input required value={formValues.password} name="password" onChange={handleInputChange} plaseholder="password" type="password" />
                {!!errorMessage &&
                    <span>
                        {errorMessage}
                    </span>
                }
                <Button type="submit" block>
                    Login
                </Button>
            </Form>
        </React.Fragment>
    )
}

export default Login;