import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react'
import { Form, Button, Col, Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import { Label } from 'reactstrap';

// landing page
const Home = () => {
    
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    let history = useHistory()
    
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/welcome')
        }
    }, [isAuthenticated])

    return (
        <div>
            {!isAuthenticated &&
                <Container>
                    <h4 data-testid="header">Welcome to XXX Bank</h4>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} className="register">
                                <Label>Please Authenticate your email and register to enjoy our services</Label>
                            </Form.Group>
                            {/*authenticate button redirects to auth0 website*/}
                            <Form.Group as={Col} className="register">
                                <Button onClick={() => loginWithRedirect()}>Authenticate</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Container>
            }
        </div>
    )
}
export default Home
