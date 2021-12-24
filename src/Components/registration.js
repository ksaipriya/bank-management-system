import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Form, Button, Col, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { countries } from './countries'
import { states } from './states';
const Reg = () => {

    let history = useHistory()
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [birth, setBirthDate] = useState(null)
    const [citizen, setCitizenStatus] = useState(null)
    const [deposit, Deposit] = useState(null)
    const [country, setCountry] = useState('')
    const [st, setSt] = useState([]);
    const [regDate, setSelectedDate] = useState(null)
    let [id, setId] = useState('')

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    //sets the account type field
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

    //sets the citizen status
    const citizenStatus = (dob) => {
        setBirthDate(dob)
        setField('dob', dob)
        let m = dob.getFullYear()
        let a = ''
        if (2021 - m < 18) {
            a = 'minor';
        } else if (2021 - m >= 18 && 2021 - m < 60) {
            a = 'normal';
        } else if (2021 - m >= 60) {
            a = 'senior';
        }
        document.getElementById("citizen").value = a
        setCitizenStatus(a)
        setField('citizenstatus', a)
    }

    //selecting the state and country using the js files and mapping them
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

    //on submit generates the customer id, account number and appends the same to the user data in db
    const handleSubmit = (data) => {
        data.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            console.log(form)
            setId(id++)
            let customerId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
            let customerAccountNumber = Math.floor(Math.random().toString().substring(2, 18))
            form.customerId = customerId
            form.customerAccountNumber = customerAccountNumber
            form.registrationdate = regDate
            //const obj = { id, name, email, password, username, guardiantype, guardianname, address, citizenship, contactno, branch, birth, citizenstatus, deposittype, gender, maritalstatus, regDate, country, state, idtype, idnum, accholdername, accnum, accaddress, customerId, customerAccountNumber }
            console.log(customerAccountNumber)
            fetch('https://bank-management-sys.herokuapp.com/api/users', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            }).then(() => {
                history.push('/login')
            })
        }
    }

    //validations for the fields
    const findFormErrors = () => {
        const { name,email, username, password, guardianType, guardianName, address, citizen, contact, branchName, gender, maritalStatus, state, idtype, iddoc, refname, refnum, refadd } = form
        const newErrors = {}
        const phoneregex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
        const emailregex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i;
        const nameregex = /^[aA-zZ\s]*$/
        if (!name || name === '') newErrors.name = 'cannot be blank!'
        else if (nameregex.test(name) === false) newErrors.name = 'can contain only letters and spaces'
        if (emailregex.test(email) === false) newErrors.email = "invalid email(should contain a '.' & '@')"
        if (!password || password === '') newErrors.password = 'cannot be blank'
        if (!username || username === '') newErrors.username = 'cannot be blank'
        if (!guardianType || guardianType === '') newErrors.guardianType = 'cannot be blank'
        if (!guardianName || guardianName === '') newErrors.guardianName = 'cannot be blank'
        if (!address || address === '') newErrors.address = 'cannot be blank'
        if (!citizen || citizen === '') newErrors.citizen = 'cannot be blank'
        if (!contact || contact === '') newErrors.contact = 'cannot be blank'
        else if (phoneregex.test(contact) === false) newErrors.contact = 'invalid phone number'
        if (!branchName || branchName === '') newErrors.branchName = 'cannot be blank'
        if (!gender || gender === '') newErrors.gender = 'select the gender'
        if (!maritalStatus || maritalStatus === '') newErrors.maritalStatus = 'select your marital status'
        if (!state || state === '') newErrors.state = 'select your marital status'
        if (!idtype || idtype === '') newErrors.idtype = 'cannot be blank'
        if (!iddoc || iddoc === '') newErrors.iddoc = 'cannot be blank'
        if (!refname || refname === '') newErrors.refname = 'cannot be blank'
        else if (nameregex.test(refname) === false) newErrors.refname = 'can contain only letters and spaces'
        if (!refnum || refnum === '') newErrors.refnum = 'cannot be blank'
        if (!refadd || refadd === '') newErrors.refadd = 'cannot be blank'
        return newErrors
    }

    //fetches the last id and sets the id field
    useEffect(() => {
        fetch('https://bank-management-sys.herokuapp.com/api/users')
            .then(res => {
                return res.json()
            }).then(data => {
                console.log(data[data.length - 1].id)
                setId(data[data.length - 1].id)
            })
    })

    return (
        <div>
                <Container>
                    <h3 data-testid="register">Register</h3>
                    <Form.Group>
                        <Form.Label id="name">Name</Form.Label>
                        <Form.Control type="text" aria-labelledby="name" name="name" data-testid="name" placeholder="Name" onChange={e => setField('name', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="nameerr">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="email">Email</Form.Label><br />
                        <Form.Control type="text" aria-labelledby="email" data-testid="email" name="email" placeholder="Email" onChange={e => setField('email', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="emailerr">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="username">UserName</Form.Label><br />
                        <Form.Control type="text" name="username" aria-labelledby="username" data-testid="username" placeholder="Username" onChange={e => setField('username', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="usernameerr">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="password">Password</Form.Label><br />
                        <Form.Control type="password" aria-labelledby="password" data-testid="password" name="password" placeholder="Password" onChange={e => setField('password', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="passworderr">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="gtype">Guardian Type</Form.Label><br />
                        <Form.Control type="text" aria-labelledby="gtype" data-testid="gtype" name="guardianType" placeholder="Guardian Type" onChange={e => setField('guardianType', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="gtypeerr">
                            {errors.guardianType}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="gname">Guardian Name</Form.Label><br />
                        <Form.Control type="text" name="guardianName" aria-labelledby="gname" data-testid="gname" placeholder="Guardian Name" onChange={e => setField('guardianName', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="gnameerr">
                            {errors.guardianName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="address">Address</Form.Label><br />
                        <Form.Control type="text" name="address" placeholder="Address" aria-labelledby="address" data-testid="address" onChange={e => setField('address', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="addresserr">
                            {errors.address}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="citizenship">Citizenship</Form.Label><br />
                        <Form.Control type="text" name="citizen" aria-labelledby="citizenship" data-testid="citizenship" placeholder="Citizenship " onChange={e => setField('citizen', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="citizenshiperr">
                            {errors.citizen}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="contact">Contact Number</Form.Label><br />
                        <Form.Control type="text" name="contact" placeholder="Contact Number" aria-labelledby="contact" data-testid="contact" onChange={e => setField('contact', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="contacterr">
                            {errors.contact}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Branch Name</Form.Label><br />
                        <Form.Control type="text" name="branchName" aria-labelledby="bname" data-testid="bname" placeholder="Branch Name" onChange={e => setField('branchName', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid'  data-testid="bnameerr">
                            {errors.branchName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label data-testid="dob">Date of Birth</Form.Label>
                        <DatePicker
                            selected={birth}
                            onChange={citizenStatus}
                            maxDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />
                        <p></p>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label data-testid="citizenstatus">Citizen Status</Form.Label><br />
                        <Form.Control type="text" id="citizen"  name="citizenStatus" placeholder="Citizen Status" onChange={e => setField('citizenStatus', e.target.value)} readOnly />
                        <p></p>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Account Type</Form.Label><br />
                            <Form.Control as="select" onChange={setDeposit} isInvalid={!!errors.name} aria-labelledby="acctype" data-testid="acctype">
                                <option value="">AccountType</option>
                                <option value="salary">Salary</option>
                                <option value="savings">Savings</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid' data-testid="acctypeerr">
                                {errors.accountType}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label data-testid="deposittype">Deposit Amount</Form.Label>
                            <Form.Control type="number" id="deposit" name="depositAmt" placeholder="Deposit Amount" onChange={e => setField('depositAmt', e.target.value)} readOnly />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label id="gender">Gender</Form.Label>
                            <Form.Control as="select" aria-labelledby="gender" data-testid="gender" onChange={e => setField('gender', e.target.value)} isInvalid={!!errors.name}>
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid' data-testid="gendererr">
                                {errors.gender}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label for="maritalStatus">Marital Status</Form.Label>
                            <Form.Control as="select" aria-labelledby="marital" data-testid="marital" onChange={e => setField('maritalStatus', e.target.value)} isInvalid={!!errors.name}>
                                <option value="">MaritalStatus</option>
                                <option value="married">Married</option>
                                <option value="unmarried">Unmarried</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid' data-testid="maritalerr">
                                {errors.maritalStatus}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label data-testid="RegDate">Registration Date</Form.Label>
                        <DatePicker
                            selected={regDate}
                            onChange={date => setSelectedDate(date)}
                            maxDate={new Date()}
                            minDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />
                        <p></p>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label for="country" data-testid="country">Country</Form.Label>
                            <Form.Control as="select" name="country" onChange={selectstate} isInvalid={!!errors.name} >
                                <option selected> </option>
                                {countries.map((data, key) => <option key={key}>{data.name + "(" + data.iso2 + ")"}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Control.Feedback type='invalid'>
                            {errors.country}
                        </Form.Control.Feedback>

                        <Form.Group as={Col}>
                            <Form.Label for="state" data-testid="state">State</Form.Label>
                            <Form.Control as="select" name="state" onChange={e => setField('state', e.target.value)} isInvalid={!!errors.name}>
                                <option selected> </option>
                                {st.map((data, key) => <option key={key}>{data}</option>)}
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.state}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Identification Proof Type</Form.Label><br />
                        <Form.Control type="text" name='idtype' aria-labelledby="idtype" data-testid="idtype" placeholder="Identification Proof Type" onChange={e => setField('idtype', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="idtypeerr">
                            {errors.idtype}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Identification Document No.</Form.Label>
                        <Form.Control type="text" name="iddoc" aria-labelledby="iddoc" data-testid="iddoc" placeholder="Identification Document No." onChange={e => setField('iddoc', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="iddocerr">
                            {errors.iddoc}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Reference Account Holder Name</Form.Label>
                        <Form.Control type="text" name="refname" aria-labelledby="refname" data-testid="refname" placeholder="Reference Account Holder Name" onChange={e => setField('refname', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="refnameerr">
                            {errors.refname}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Reference Account Holder Acc Number</Form.Label>
                        <Form.Control type="text" name="refnum" aria-labelledby="refnum" data-testid="refnum" placeholder="Reference Account Holder Number" onChange={e => setField('refnum', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="refnumerr">
                            {errors.refnum}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Reference Account Holder Address</Form.Label>
                        <Form.Control type="text" name="refadd" aria-labelledby="refadd" data-testid="refadd" placeholder="Reference Account Holder Address" onChange={e => setField('refadd', e.target.value)} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type='invalid' data-testid="refadderr">
                            {errors.refadd}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type='submit' onClick={handleSubmit}>Register</Button>
                </Container>
        </div>
    )
}
export default Reg