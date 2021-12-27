import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../Validations/loginValidations'
import './styles/login.css'

const Login = () => {
    
    let flag = 'false'
    let history = useHistory()
    //data from the data base is stored in this userdata
    const [userData, setUserData] = useState('')
    //the details of the user logged in is stored in currentuserdata
    const [currentuserData, setCurrentUserData] = useState('')
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (e) => {
        console.log(e)
        let k = ''
        //confirm if the credentials are correct
        for (let index = 0; index < userData.length; index++) {
            if (e.username === userData[index].username && e.password === userData[index].password) {
                //if the details are true the value of k is set to id of the user which is passed on to the next component through props
                k = userData[index].id 
                flag = 'true'
                break
            }
        }
        //if the user is verified then naviagte to the success page
        if (flag === 'true') {
            history.push({
                pathname: '/success',
                state: {
                    key: k
                }
            })
        }
        //error popups if wrong credentials are given
        else {
            alert('Enter correct details else register!')
        }
    }

    //navigates toregistration component if register button is clicked
    const redirettoregister = () => {
        history.push('/register')
    }

    //fetching the details from the server and store in a local constant for verification
    useEffect(() => {
        fetch('https://bank-management-sys.herokuapp.com/api/users')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setUserData(data)
                setCurrentUserData(data[data.length - 1])
                console.log(currentuserData)
            })
    }, [])

    return (
        <div>
            <Container>
                <h3 className="success">Hey {currentuserData.username},You are successfully registered!</h3>
                <h4 className> Your Customer Id is : {currentuserData.customerId}</h4>
                <h4 className> Your Account Number is : {currentuserData.customerAccountNumber}</h4>
                <h2 className="title" data-testid="login" >LOGIN</h2>
                <Form >
                    <Form.Group>
                        <Form.Label id="username">Username</Form.Label>
                        <Form.Control type="text" aria-labelledby="username" data-testid="username" name="username" placeholder="Enter your username!"  {...register('username')} />
                        <p data-testid="usererr">{errors.username?.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id="password">Password</Form.Label>
                        <Form.Control type="password" aria-labelledby="password" data-testid="password" name="password" placeholder="Enter your password!"  {...register('password')} />
                        <p data-testid="passerr">{errors.password?.message}</p>
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>Login</Button>
                    <Button className='regButton' aria-hidden="true" variant="success" onClick={redirettoregister}>Register</Button>
                </Form>
            </Container >
        </div>
    )
}
export default Login;
