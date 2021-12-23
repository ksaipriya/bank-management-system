import React from 'react';
import { render } from '@testing-library/react';
import Test from '../UpdatedDetails.js'
import Adapter from 'enzyme-adapter-react-16';
import {configure,ShallowWrapper,shallow} from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

configure({ adapter: new Adapter() });
describe('Test case for testing updated details', () => {

    it('matches snapshot', () => {
        const shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<Test/>);
        const result = shallowRenderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });

    it('able to find an html element', () => {
        let shallowWrapper = new ShallowWrapper(<Test/>)
        expect(shallowWrapper.find('h4').html()).toContain('Update Details!');
    });

    it('proper rendering for name element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Name');
        expect(name).toBeInTheDocument();
        const inputname = getByLabelText('Name');
        expect(inputname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for password element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const password = getByText('Password')
        expect(password).toBeInTheDocument();
        const inputPassword = getByLabelText('Password');
        expect(inputPassword).toHaveAttribute('type', 'password')
    });

    it('proper rendering for email element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Email');
        expect(name).toBeInTheDocument();
        const inputemail = getByLabelText('Email');
        expect(inputemail).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Username element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('UserName');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('UserName');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Guardian Type element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Guardian Type');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Guardian Type');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Guardian Name element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Guardian Name');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Guardian Name');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Address element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Address');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Address');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Citizenship element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Citizenship');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Citizenship');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Contact Number element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Contact Number');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Contact Number');
        expect(inputUname).toHaveAttribute('type', 'number')
    });

    it('proper rendering for Branch Name element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Branch Name');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Branch Name');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Account Type element', () => {
        const { getByText } = render(<Test />)
        const name = getByText('Account Type');
        expect(name).toBeInTheDocument();
    });

    it('proper rendering for Deposit Amount element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Deposit Amount');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Deposit Amount');
        expect(inputUname).toHaveAttribute('type', 'number')
    });

    it('proper rendering for Gender element', () => {
        const { getByLabelText } = render(<Test />)
        const name = getByLabelText('Gender');
        expect(name).toBeInTheDocument();
    });

    it('proper rendering for Marital Status element', () => {
        const { getByLabelText } = render(<Test />)
        const name = getByLabelText('Marital Status');
        expect(name).toBeInTheDocument();
    });

    it('proper rendering for State element', () => {
        const { getByLabelText } = render(<Test />)
        const name = getByLabelText('State');
        expect(name).toBeInTheDocument();
    });

    it('proper rendering for Country element', () => {
        const { getByLabelText } = render(<Test />)
        const name = getByLabelText('Country');
        expect(name).toBeInTheDocument();
    });

    it('proper rendering for Identification Proof Type element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Identification Proof Type');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Identification Proof Type');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Identification Document No. element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Identification Document No.');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Identification Document No.');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Reference Account Holder Name element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Reference Account Holder Name');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Reference Account Holder Name');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Reference Account Holder Acc Number element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Reference Account Holder Acc Number');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Reference Account Holder Acc Number');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('proper rendering for Reference Account Holder Address element', () => {
        const { getByText,getByLabelText } = render(<Test />)
        const name = getByText('Reference Account Holder Address');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Reference Account Holder Address');
        expect(inputUname).toHaveAttribute('type', 'text')
    });

    it('Test Update Button', () => {
        const mockCallBack = jest.fn();
        const button = shallow(<button onClick={mockCallBack}>Update</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Test logout Button', () => {
        const mockCallBack = jest.fn();
        const button = shallow(<button onClick={mockCallBack}>Logout</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
})