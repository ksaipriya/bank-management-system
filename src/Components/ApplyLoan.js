import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import './styles/applyloan.css'
const ApplyLoan = (a) => {

    let history = useHistory()
    const [loanType, setLoantype] = useState('')
    const [applyDate, setApplyDate] = useState('')
    const [issueDate, setIssueDate] = useState('');
    const [key, setKey] = useState('')
    const [data, setData] = useState('')
    let loanSchema = ''

    //validations for educational loan
    if (loanType === 'educational') {
        loanSchema = yup.object({
            loanamount: yup.string().required(),
            roi: yup.string().required(),
            duration: yup.string().required(),
            cfee: yup.string().required(),
            course: yup.string().required(),
            fname: yup.string().required(),
            experience: yup.string().required(),
            curr_experience: yup.string().required(),
            ration: yup.string().required(),
            income: yup.string().required(),
        })
    }
    //validations for personal / home loans
    else {
        loanSchema = yup.object({
            loanamount: yup.string().required(),
            roi: yup.string().required(),
            duration: yup.string().required(),
            annualincome: yup.string().required(),
            companyname: yup.string().required(),
            designation: yup.string().required(),
            total_experience: yup.string().required(),
            comp_experience: yup.string().required()
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loanSchema)
    });

    //functions on clicking the submit
    const onSubmit = (e) => {
        console.log(data)
        console.log(e)
        e.loantype = loanType
        e.applydate= applyDate
        e.issuedate= issueDate
        alert('Loan Applied!')
        console.log(e)
        //details are fetched and loan details are appended to the current user data in server
        fetch(`https://bank-management-sys.herokuapp.com/api/users/${key}`,{
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(e)
        }).then(()=> history.push({
            pathname: '/displaydetails',
            state: {
                key: key,
            }
        })) 
    }

    //sets the data of the user when component is rendered using the key
    useEffect(() => {
        setKey(a.location.state.key)
        fetch('https://bank-management-sys.herokuapp.com/api/users').then(res => {
            return res.json()
        }).then(data => {
            for (let index = 0; index < data.length; index++) {
                if (data[index].id === key) {
                    setData(data[index])
                    break
                }
            }
        })
    },[(a.location.state.key!=='')])

    return (
        <Container>
            <h3>ApplyLoan</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Loan Type</Form.Label>
                    <Form.Control as="select" onChange={e => setLoantype(e.target.value)} >
                        <option value="">Select Loan Type</option>
                        <option value="educational">Educational</option>
                        <option value="housing">Housing</option>
                        <option value="personal">Personal</option>
                    </Form.Control>
                    <p></p>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Loan Amount</Form.Label>
                    <Form.Control type="number" placeholder="Loan Amount" name="loanamount" required {...register("loanamount")}></Form.Control>
                    <p>{errors.loanamount?.message}</p>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Loan Apply date</Form.Label>
                        <DatePicker

                            selected={applyDate}
                            onChange={date => setApplyDate(date)}
                            maxDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Loan Issue date</Form.Label>
                        <DatePicker

                            selected={issueDate}
                            onChange={date => setIssueDate(date)}
                            maxDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Rate of Interest</Form.Label>
                    <Form.Control type="number" placeholder="Rate of Interest" name="roi" {...register("roi")} />
                    <p>{errors.roi?.message}</p>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Duration Of Loan</Form.Label>
                    <Form.Control as="select"  {...register("duration")}>
                        <option value="">Duration</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </Form.Control>
                    <p>{errors.duration?.message}</p>
                </Form.Group>

                <Form.Group>
                    {loanType === 'educational' &&
                        <Form.Group>
                            <h4>Educational Loan</h4>
                            <Form.Group>
                                <Form.Label>Course Fee</Form.Label>
                                <Form.Control type="number" name="cfee" placeholder="Course Fee" {...register("cfee")} />
                                <p>{errors.cfee?.message}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Course</Form.Label>
                                <Form.Control type="text" name="course" placeholder="Course" {...register("course")} />
                                <p>{errors.course?.message}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Father Name</Form.Label>
                                <Form.Control type="text" name="fname" placeholder="Father Name" {...register("fname")} />
                                <p>{errors.fname?.message}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Father’s Total Experience</Form.Label>
                                        <Form.Control type="number" name="experience" placeholder="Father’s Total Experience" {...register("experience")} />
                                        <p>{errors.experience?.message}</p>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Father’s Experience with Current company </Form.Label>
                                        <Form.Control type="number" name="curr_experience" placeholder="Father’s Experience with Current company " {...register("curr_experience")} />
                                        <p>{errors.curr_experience?.message}</p>
                                    </Form.Group>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Ration Card No </Form.Label>
                                <Form.Control type="text" name="ration" placeholder="Ration Card No " {...register("ration")} />
                                <p>{errors.ration?.message}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Annual Income </Form.Label>
                                <Form.Control type="number" name="income" placeholder="Ration Card No " {...register("income")} />
                                <p>{errors.income?.message}</p>
                            </Form.Group>
                        </Form.Group>
                    }

                    {(loanType === 'personal' || loanType === 'housing') &&
                        <Form.Group>
                            <h4>Personal/Home Loan</h4>
                            <Form.Group>
                                <Form.Label>Annual Income</Form.Label>
                                <Form.Control type="number" name="annualincome" placeholder="Annual Income" {...register("annualincome")} />
                                <p>{errors.annualincome?.message}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control type="text" name="companyname" placeholder="Company Name" {...register("companyname")} />
                                <p>{errors.companyname?.message}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text" name="designation" placeholder="Designation" {...register("designation")} />
                                <p>{errors.designation?.message}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Total Experience</Form.Label>
                                <Form.Control type="number" name="total_experience" placeholder="Total Experience" {...register("total_experience")} />
                                <p>{errors.total_experience?.message}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Experience with company </Form.Label>
                                <Form.Control type="number" name="comp_experience" placeholder=" Experience with company" {...register("comp_experience")} />
                                <p>{errors.comp_experience?.message}</p>
                            </Form.Group>
                        </Form.Group>
                    }
                </Form.Group>
                
                <Form.Group>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>Apply Loan</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}
export default ApplyLoan;