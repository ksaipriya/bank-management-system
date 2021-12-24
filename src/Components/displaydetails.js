import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Table, Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css'

const LoanDetails = (e) => {

    const { logout  } = useAuth0()
    const [key, setKey] = useState('')
    const [data, setData] = useState('')
    let history = useHistory()

    useEffect(() => {
        setKey(e.location.state.key)
        fetch('https://bank-management-sys.herokuapp.com/api/users').then(res => {
            return res.json()
        }).then(data => {
            for (let index = 0; index < data.length; index++) {
                if (key === data[index].id) {
                    setData(data[index])
                }
            }
        })
    }, [])

    return (
        <Container>
            <h4 className="card-title">You have successfully applied for a loan, here are you loan details</h4>
            <Table striped bordered hover>
                <thead>
                    <b style={{ textAlign: 'center' }}>Loan Details</b>
                </thead>
                <tbody>
                    <tr>
                        <td>Loan Type</td>
                        <td>{data.loantype}</td>
                    </tr>
                    <tr>
                        <td>Loan Amount</td>
                        <td>{data.loanamount}</td>
                    </tr>
                    <tr>
                        <td>Loan Apply Date</td>
                        <td>{data.applydate}</td>
                    </tr>
                    <tr>
                        <td>Loan Issue Date</td>
                        <td>{data.issuedate}</td>
                    </tr>
                    <tr>
                        <td>Rate of Interest</td>
                        <td>{data.roi}</td>
                    </tr>
                    <tr>
                        <td>Duration of Loan</td>
                        <td>{data.duration} years</td>
                    </tr>
                </tbody>
            </Table>
            {data.loantype === 'educational' &&
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Course Fee</td>
                            <td>{data.cfee}</td>
                        </tr>
                        <tr>
                            <td>Course</td>
                            <td>{data.course}</td>
                        </tr>
                        <tr>
                            <td>Father Name</td>
                            <td>{data.fname}</td>
                        </tr>
                        <tr>
                            <td>Course Fee</td>
                            <td>{data.cfee}</td>
                        </tr>
                        <tr>
                            <td>Father’s Total Exp</td>
                            <td>{data.experience}</td>
                        </tr>
                        <tr>
                            <td>Father’s Exp with Current company</td>
                            <td>{data.curr_experience}</td>
                        </tr>
                        <tr>
                            <td>Ration Card No.</td>
                            <td>{data.ration}</td>
                        </tr>
                        <tr>
                            <td>Annual Income</td>
                            <td>{data.income}</td>
                        </tr>
                    </tbody>
                </Table>
            }
            {(data.loantype === 'personal' || data.loantype === 'housing') &&
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Annual Income</td>
                            <td>{data.annualincome}</td>
                        </tr>
                        <tr>
                            <td>Company Name</td>
                            <td>{data.companyname}</td>
                        </tr>
                        <tr>
                            <td>Designation </td>
                            <td>{data.designation}</td>
                        </tr>
                        <tr>
                            <td>Total Exp</td>
                            <td>{data.total_experience} years</td>
                        </tr>
                        <tr>
                            <td>Exp with Current company:</td>
                            <td>{data.comp_experience} years</td>
                        </tr>
                    </tbody>
                </Table>
            }
            <Form>
                <Form.Row>
                    <Form.Group className="register" as={Col}>
                        <Form.Label id="update">Update your personal details?</Form.Label><br />
                        <Button variant="success" onClick={() => history.push('/updateuser')}>Update Details</Button>
                    </Form.Group>
                    <Form.Group className="login" as={Col}>
                        <Form.Label id="logout">No more changes?</Form.Label><br />
                        {
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Button onClick={() => logout()}>Logout</Button>
                                </Form.Group>
                            </Form.Row>
                        }
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    )
}
export default LoanDetails
