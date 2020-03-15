import React, {useState, useContext} from 'react'
import {Form, Input, Button} from '../components/common'
import {FirebaseContext} from '../components/Firebase'

const Register = () => {
    const {firebase} = useContext(FirebaseContext)

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleInputChange(e){
        e.persist();
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();

        if(formValues.password == formValues.confirmPassword){
          firebase.register({
              email: formValues.email,
              password: formValues.password
          })
        }

        console.log(formValues);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input onChange={handleInputChange} value={formValues.email} placeholder="email" type="email" required name="email" />
            <Input onChange={handleInputChange} value={formValues.password} placeholder="password" type="password" required minLength={3} name="password" />
            <Input onChange={handleInputChange} value={formValues.confirmPassword} placeholder="confirm password" type="password" required minLength={3} name="confirmPassword" />
            <Button type="submit" block>
                Register
            </Button>
        </Form>
    )
}

export default Register;