import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';


//the prop 'a' has the details of the user who is logged in
const Success = (a) => {
    let history = useHistory();
    const applyLoan=(e)=>{
        e.preventDefault()
        console.log(a.location.state.key)
        history.push({
            pathname: '/applyloan',
            state: {
                //acquired from login page and holds id of user
                key: a.location.state.key
            }
        })
    }
    //naviagtes to the update details page
    const updateDetails=()=>{
        history.push('/updateuser')
    }
    return (
        <Container>
            <h4 data-testid="success">Successfully logged in!</h4>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} className="register">
                        <Button variant="info" onClick={applyLoan}>Apply Loan</Button>
                    </Form.Group>
                    <Form.Group as={Col} className="register">
                        <Button variant="info" onClick={updateDetails} >Update Details</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    )
}

export default Success
