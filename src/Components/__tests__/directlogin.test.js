import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DirectLogin from '../DirectLogin.js'
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';

enzyme.configure({ adapter: new Adapter() });
describe('Test case for testing login', () => {
    let wrapper;
    it('header check', () => {
        wrapper = render(<DirectLogin />);
        const login_header = wrapper.getByTestId('login')
        expect(login_header.textContent).toBe('LOGIN')
    })

    it('proper form rendering', () => {
        const { getByText, getByLabelText } = render(<DirectLogin />)
        const name = getByText('Username');
        const password = getByText('Password');
        expect(name).toBeInTheDocument();
        expect(password).toBeInTheDocument();

        const inputUname = getByLabelText('Username');
        expect(inputUname).toHaveAttribute('type', 'text')

        const inputPassword = getByLabelText('Password');
        expect(inputPassword).toHaveAttribute('type', 'password')
    });


})