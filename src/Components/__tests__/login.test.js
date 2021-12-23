import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../login.js'
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';

enzyme.configure({ adapter: new Adapter() });
describe('Test case for testing login', () => {
    let wrapper;
    it('header check', () => {
        wrapper = render(<Login />);
        const login_header = wrapper.getByTestId('login')
        expect(login_header.textContent).toBe('LOGIN')
    })

    it('proper form rendering', () => {
        const { getByText, getByLabelText } = render(<Login />)
        const name = getByText('Username');
        const password = getByText('Password');
        expect(name).toBeInTheDocument();
        expect(password).toBeInTheDocument();

        const inputUname = getByLabelText('Username');
        expect(inputUname).toHaveAttribute('type', 'text')

        const inputPassword = getByLabelText('Password');
        expect(inputPassword).toHaveAttribute('type', 'password')
    });

    it('No error for username', () => {
        const { getByRole, getByTestId } = render(<Login />);
        fireEvent.change(getByTestId("username"), { target: { value: "Priya" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("usererr").textContent).toBe("");
    })

    it('No error for password', () => {
        const { getByRole, getByTestId } = render(<Login />);
        fireEvent.change(getByTestId("password"), { target: { value: "1234" } });
        fireEvent.click(getByRole("button"));
        expect(getByTestId("passerr").textContent).toBe("");
    })

})