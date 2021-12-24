import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import './styles/login.css'
import { useHistory } from 'react-router-dom';

//rendered if user tries to login without registering
const DirectLogin = () => {

    let flag = 'false'
    let history = useHistory()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        let k = ''
        for (let index = 0; index < userData.length; index++) {
            if (username === userData[index].username && password === userData[index].password) {
                flag = 'true'
                k = userData[index].id
                break
            }
        }
        if (flag === 'true') {
            console.log(k)
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

    //navigates to register component
    const redirettoregister = () => {
        history.push('/register')
    }

    //fetches and sets the data from the db
    useEffect(() => {
        fetch('https://bank-management-sys.herokuapp.com/api/users')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setUserData(data)
                console.log(userData)
            })
    }, [])

    return (
        <Container>
            <h2 className="title" data-testid="login">LOGIN</h2>
            <Form>
                <Form.Group>
                    <Form.Label id="username">Username</Form.Label>
                    <Form.Control type="text" aria-labelledby="username" data-testid="username" name="username" placeholder="Enter your username!" onChange={e => setUserName(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="password">Password</Form.Label>
                    <Form.Control type="password" aria-labelledby="password" data-testid="password" name="password" placeholder="Enter your password!" onChange={e => setPassword(e.target.value)} required='true' />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit} formNoValidate>Login</Button>
                <Button className='regButton' aria-hidden="true" variant="success" onClick={redirettoregister}>REGISTER</Button>
            </Form>
        </Container>
    )
}
export default DirectLogin
