import React from 'react';
import { render, fireEvent,cleanup } from '@testing-library/react';
import Reg from '../registration.js'
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';

enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);
describe('Test cases for registration', () => {
    let wrapper;
    it('title check', () => {
        wrapper = render(<Reg />);
        const register_header = wrapper.getByTestId('register')
        expect(register_header.textContent).toBe('Register')
    })

    it('no error for customer name',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("name"), { target: { value: "Priya" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("nameerr").textContent).toBe("");
    })

    it('no error for username',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("username"), { target: { value: "priya" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("usernameerr").textContent).toBe("");
    })

    it('error for password',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("password"), { target: { value: "" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("passworderr").textContent).toBe("cannot be blank");
    })

    it('no error for guardian type',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("gtype"), { target: { value: "father" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("gtypeerr").textContent).toBe("");
    })

    it('no error for email',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("email"), { target: { value: "priya@gmail.com" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("emailerr").textContent).toBe("");
    })

    it('no error for guardian name',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("gname"), { target: { value: "Mr.A" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("gnameerr").textContent).toBe("");
    })

    it('no error for address',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("address"), { target: { value: "xxx" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("addresserr").textContent).toBe("");
    })

    it('no error for citizenship',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("citizenship"), { target: { value: "indian" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("citizenshiperr").textContent).toBe("");
    })

    it('no error for contact',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("contact"), { target: { value: "1234567890" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("contacterr").textContent).toBe("");
    })

    it('no error for branch name',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("bname"), { target: { value: "Hyderabad" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("bnameerr").textContent).toBe("");
    })

    it('dob label check', () => {
        wrapper = render(<Reg />);
        const dob_label = wrapper.getByTestId('dob')
        expect(dob_label.textContent).toBe('Date of Birth')
    })

    it('citizenstatus label check', () => {
        wrapper = render(<Reg />);
        const dob_label = wrapper.getByTestId('citizenstatus')
        expect(dob_label.textContent).toBe('Citizen Status')
    })

    it('no error for account type',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("acctype"), { target: { value: "Salary" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("acctypeerr").textContent).toBe("");
    })
    
    it('no error for account type2',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("acctype"), { target: { value: "Savings" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("acctypeerr").textContent).toBe("");
    })

    it('deposittype label check', () => {
        wrapper = render(<Reg />);
        const dob_label = wrapper.getByTestId('deposittype')
        expect(dob_label.textContent).toBe('Deposit Amount')
    })

    it('no error for gender',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("gender"), { target: { value: "male" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("gendererr").textContent).toBe("");
    })

    it('no error for gender2',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("gender"), { target: { value: "female" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("gendererr").textContent).toBe("");
    })

    it('no error for marital status',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("marital"), { target: { value: "married" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("maritalerr").textContent).toBe("");
    })

    it('no error for marital status2',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("marital"), { target: { value: "unmarried" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("maritalerr").textContent).toBe("");
    })

    it('Registration date label check', () => {
        wrapper = render(<Reg />);
        const dob_label = wrapper.getByTestId('RegDate')
        expect(dob_label.textContent).toBe('Registration Date')
    })

    it('Country label check', () => {
        wrapper = render(<Reg />);
        const dob_label = wrapper.getByTestId('country')
        expect(dob_label.textContent).toBe('Country')
    })

    it('State label check', () => {
        wrapper = render(<Reg />);
        const dob_label = wrapper.getByTestId('state')
        expect(dob_label.textContent).toBe('State')
    })

    it('no error for ID Proof Type',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("idtype"), { target: { value: "PAN" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("idtypeerr").textContent).toBe("");
    })

    it('no error for ID Doc Number',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("iddoc"), { target: { value: "111111111" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("iddocerr").textContent).toBe("");
    })

    it('no error for Reference account holder name',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("refname"), { target: { value: "Priya" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("refnameerr").textContent).toBe("");
    })

    it('no error for Reference account holder num',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("refnum"), { target: { value: "1223331122" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("refnumerr").textContent).toBe("");
    })

    it('no error for Reference account holder address',()=>{
        const { getByRole, getByTestId } = render(<Reg/>);
        fireEvent.change(getByTestId("refadd"), { target: { value: "xyz" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("refadderr").textContent).toBe("");
    })

    it('Test click event', () => {
        const mockCallBack = jest.fn();
        const button = enzyme.shallow(<button onClick={mockCallBack}>Register</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
})
