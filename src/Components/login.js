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
    const [userData, setUserData] = useState('')
    const [userLastData, setLastUserData] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (e) => {
        console.log(e)
        let k = ''
        for (let index = 0; index < userData.length; index++) {
            if (e.username === userData[index].username && e.password === userData[index].password) {
                k = userData[index].id
                flag = 'true'
                break
            }
        }
        if (flag === 'true') {
            history.push({
                pathname: '/success',
                state: {
                    key: k
                }
            })
        }
        else {
            alert('Enter correct details else register!')
        }
    }

    const redirettoregister = () => {
        history.push('/register')
    }
    useEffect(() => {
        fetch('http://localhost:8000/users')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setUserData(data)
                console.log(userData)
                setLastUserData(data[data.length - 1])
            })
    }, [])

    return (
        <div>
            <Container>
                <h3 className="success">Hey {userLastData.username},You are successfully registered!</h3>
                <h4 className> Your Customer Id is : {userLastData.customerId}</h4>
                <h4 className> Your Account Number is : {userLastData.customerAccountNumber}</h4>
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
