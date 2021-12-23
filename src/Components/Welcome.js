import React from 'react'
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react'
import { Form, Button, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/welcome.css'
const Welcome = () => {
    let history = useHistory();
    const { logout, isAuthenticated } = useAuth0()
    
    return (
        <div className="container">
            {isAuthenticated &&
                <Container>
                    <Form.Row>
                        <Form.Group as={Col} className="logout">
                            <Button onClick={() => logout()}>Logout</Button>
                        </Form.Group>
                    </Form.Row>
                    <h4>Welcome to <span>XXXX</span> Bank</h4>
                    <Form>
                        <Form.Row>
                            <Form.Group className="register" as={Col}>
                                <Form.Label>New User?</Form.Label><br />
                                <Button variant="success" onClick={() => history.push('/register')}>Register</Button>
                            </Form.Group>
                            <Form.Group className="login" as={Col}>
                                <Form.Label>Already Registered?</Form.Label><br />
                                <Button variant="primary" onClick={() => history.push('/directlogin')}>Login</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Container>
            }
        </div>
    )
}
export default Welcome;
