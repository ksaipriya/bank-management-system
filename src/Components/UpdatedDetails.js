import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { countries } from './countries'
import { states } from './states';
import { useHistory } from 'react-router-dom';

const Test = (a) => {
    const [temp, setTemp] = useState('')
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [form, setForm] = useState('')
    const [st, setSt] = useState([]);
    const [deposittype, Deposit] = useState(null)
    const [country, setCountry] = useState('')
    const { handleSubmit } = useForm({});
    let history = useHistory()

    for (let index = 0; index < user.length; index++) {
        if (temp === user[index].id) {
            document.getElementById('name').setAttribute('value', user[index].name)
            document.getElementById('email').setAttribute('value', user[index].email)
            document.getElementById('password').setAttribute('value', user[index].password)
            document.getElementById('username').setAttribute('value', user[index].username)
            document.getElementById('guardiantype').setAttribute('value', user[index].guardianType)
            document.getElementById('guardianname').setAttribute('value', user[index].guardianName)
            document.getElementById('address').setAttribute('value', user[index].address)
            document.getElementById('citizenship').setAttribute('value', user[index].citizen)
            document.getElementById('contact').setAttribute('value', user[index].contact)
            document.getElementById('branchname').setAttribute('value', user[index].branchName)
            document.getElementById('deposit').setAttribute('value', user[index].depositamount)
            document.getElementById('gender').setAttribute('value', user[index].gender)
            document.getElementById('maritalstatus').setAttribute('value', user[index].maritalStatus)
            document.getElementById('country').setAttribute('value', user[index].country)
            document.getElementById('state').setAttribute('value', user[index].state)
            document.getElementById('idtype').setAttribute('value', user[index].idtype)
            document.getElementById('iddoc').setAttribute('value', user[index].iddoc)
            document.getElementById('refname').setAttribute('value', user[index].refname)
            document.getElementById('refnum').setAttribute('value', user[index].refnum)
            document.getElementById('refadd').setAttribute('value', user[index].refadd)
            break
        }
    }

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const setDeposit = (data) => {
        let type = data.target.value;
        setField('accountType', type)
        Deposit(type)
        let k = 0
        if (type === 'savings') {
            k = 5000
        } else if (type === 'salary') {
            k = 0
        }
        document.getElementById("deposit").value = k
        setField('depositamount', k)
    }

    const selectstate = (e) => {
        let s = e.target.value;
        setField('country', s)
        setCountry(s)
        let x = s.indexOf("(");
        s = s.slice(x + 1, s.length - 1);
        //console.log(s)
        let sts = states.filter((x) => x.country_code === s).map((x) => x.name);
        //console.log(sts)
        setSt(sts)
    }

    const updateDetails = (e) => {
        console.log(e)
        fetch(`http://localhost:8000/users/${temp}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then(() => {
            alert('details Updated')
        })
    }

    useEffect(() => {
        fetch('http://localhost:8000/users')
            .then(res => {
                return res.json()
            }).then(data => {
                setTemp(a.location.state.key)
                setUser(data)
            }
            )
    }, [])

    return (
        <Container>
            <h4>Update Details!</h4>
            <Form className="login-form" >
                <Form.Group>
                    <Form.Label id="Name">Name</Form.Label><br />
                    <Form.Control type="text" name="name" id='name' aria-labelledby="Name" placeholder="Name" onChange={e => setName('name', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="Email">Email</Form.Label><br />
                    <Form.Control type="text" name="email" aria-labelledby="Email" id="email" placeholder="Email" onChange={e => setField('email', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="Password">Password</Form.Label><br />
                    <Form.Control type="password" name="password" aria-labelledby="Password" id="password" placeholder="Password" onChange={e => setField('password', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="Username">UserName</Form.Label><br />
                    <Form.Control type="text" name="username" aria-labelledby="Username" id="username" placeholder="Username" onChange={e => setField('username', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="gtype">Guardian Type</Form.Label><br />
                    <Form.Control type="text" name="guardianType" aria-labelledby="gtype" id="guardiantype" placeholder="Guardian Type" onChange={e => setField('guardianType', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="gname">Guardian Name</Form.Label><br />
                    <Form.Control type="text" name="guardianName" aria-labelledby="gname" id="guardianname" placeholder="Guardian Name" onChange={e => setField('guardianName', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="address">Address</Form.Label><br />
                    <Form.Control type="text" name="address" aria-labelledby="address" id="address" placeholder="Address" onChange={e => setField('address', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="citizenship">Citizenship</Form.Label><br />
                    <Form.Control type="text" name="citizen" aria-labelledby="citizenship" id="citizenship" placeholder="Citizenship " onChange={e => setField('citizen', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="contact">Contact Number</Form.Label><br />
                    <Form.Control type="number" name="contact" aria-labelledby="contact" id="contact" placeholder="Contact Number" onChange={e => setField('contact', e.target.value)} />

                </Form.Group>

                <Form.Group>
                    <Form.Label id="bname">Branch Name</Form.Label><br />
                    <Form.Control type="text" name="branchName" aria-labelledby="bname" id="branchname" placeholder="Branch Name" onChange={e => setField('branchName', e.target.value)} />

                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label id="accounttype">Account Type</Form.Label><br />
                        <Form.Control as="select" onChange={setDeposit} aria-labelledby="accounttype"> 
                            <option value="">AccountType</option>
                            <option value="salary">Salary</option>
                            <option value="savings">Savings</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label id="depositamount">Deposit Amount</Form.Label>
                        <Form.Control type="number" id="deposit" name="depositAmt" aria-labelledby="depositamount" placeholder="Deposit Amount" onChange={e => setField('depositAmt', e.target.value)} readOnly />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label id="gender">Gender</Form.Label>
                        <Form.Control as="select" id="gender" aria-labelledby="gender" onChange={e => setField('gender', e.target.value)}>
                            <option value="">Select your Gender </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Control>

                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label id="maritalStatus">Marital Status</Form.Label>
                        <Form.Control as="select" id="maritalstatus" aria-labelledby="maritalStatus" onChange={e => setField('maritalStatus', e.target.value)}>
                            <option value="">MaritalStatus</option>
                            <option value="married">Married</option>
                            <option value="unmarried">Unmarried</option>
                        </Form.Control>

                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label for="country" data-testid="Country">Country</Form.Label>
                        <Form.Control as="select" id="country" name="country" onChange={selectstate} >
                            <option selected> </option>
                            {countries.map((data, key) => <option key={key}>{data.name + "(" + data.iso2 + ")"}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label for="state" data-testid="State">State</Form.Label>
                        <Form.Control as="select" id="state" name="state" onChange={e => setField('state', e.target.value)}>
                            <option selected> </option>
                            {st.map((data, key) => <option key={key}>{data}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label id="idtype">Identification Proof Type</Form.Label><br />
                    <Form.Control type="text" id="idtype" aria-labelledby="idtype" name='idtype' placeholder="Identification Proof Type" onChange={e => setField('idtype', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="iddoc">Identification Document No.</Form.Label>
                    <Form.Control type="text" id="iddoc" name="iddoc" aria-labelledby="iddoc" placeholder="Identification Document No." onChange={e => setField('iddoc', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="refname">Reference Account Holder Name</Form.Label>
                    <Form.Control type="text" id="refname" aria-labelledby="refname" name="refname" placeholder="Reference Account Holder Name" onChange={e => setField('refname', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="refnum">Reference Account Holder Acc Number</Form.Label>
                    <Form.Control type="text" id="refnum" aria-labelledby="refnum" name="refnum" placeholder="Reference Account Holder Number" onChange={e => setField('refnum', e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label id="refadd">Reference Account Holder Address</Form.Label>
                    <Form.Control type="text" id="refadd" aria-labelledby="refadd" name="refadd" placeholder="Reference Account Holder Address" onChange={e => setField('refadd', e.target.value)} />
                </Form.Group>
                
                <Form.Row>
                    <Form.Group as={Col}>
                        <Button variant="success" onClick={handleSubmit(updateDetails)}>Update</Button>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Button variant="primary" onClick={() => history.push('/')}>Logout</Button>
                    </Form.Group>
                </Form.Row>
            </Form >
        </Container >
    )
}
export default Test
