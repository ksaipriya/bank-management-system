import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './styles/UpdateDetails.css'

//renders a component that asks for the customer id to update the details of the user
const UpdateUser = () => {

    let flag = 'false'
    let history = useHistory()
    const [customerId, setCustomerId] = useState('')
    const [valid, setValid] = useState('')
    const [userData, setUserData] = useState('')

    const updateSchema = yup.object({
        custid: yup.number().required('Customer Id is required')
    })

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(updateSchema)
    });


    //gets the customer id from the user and checks the customer id in the database
    const handleUser = (e) => {
        let z = ''
        for (let index = 0; index < userData.length; index++) {
            if (e.custid === userData[index].customerId) {
                flag = 'true'
                z=userData[index].id
                setValid(flag)
                break
            }
        }

        //navigates to updateddetails page with k as prop which holds the id
        if (flag === 'true') {
            history.push({
                pathname: '/UpdatedDetails',
                state: {
                    key: z
                }
            })
        }
        else
            setValid(flag)
    }

    useEffect(() => {
        fetch('https://bank-management-sys.herokuapp.com/api/users')
            .then(res => {
                return res.json()
            }).then(data => {
                setUserData(data)
            })
    }, [])
    return (
        <Container>
            <Form>
                <Form.Group>
                    <h4 data-testid="title">Update User</h4>
                    <Form.Label id="custid">Enter your customer id</Form.Label>
                    <Form.Control type="number" aria-labelledby="custid" name="custId" placeholder="Please enter your customer_id to edit your details!" onChange={e => setCustomerId(e.target.value)} {...register('custid')}></Form.Control>
                    <p>{errors.custid?.message}</p>
                    <Button variant="success" onClick={handleSubmit(handleUser)}>Show Details</Button>
                </Form.Group>

                {valid === 'false' &&
                    <h3 className="sorry">Sorry! There is no customer with entered Id.Please try again!</h3>
    }
            </Form>
        </Container>
    )
}

export default UpdateUser;