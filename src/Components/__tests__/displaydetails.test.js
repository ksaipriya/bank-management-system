import React from 'react';
import { render } from '@testing-library/react';
import LoanDetails from '../displaydetails.js'
import Adapter from 'enzyme-adapter-react-16';
import { configure, ShallowWrapper, shallow, mount } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

configure({ adapter: new Adapter() });
describe('Test case for testing display details component', () => {

    it('matches snapshot', () => {
        const shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<LoanDetails />);
        const result = shallowRenderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });

    it('able to find an html element', () => {
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('h4').html()).toContain('You have successfully applied for a loan, here are you loan details');
    });

    it('header check', () => {
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('b').html()).toContain('Loan Details');
    });

    it('Label for Update details button', () => {
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('#update').html()).toContain('Update your personal details?')
    })

    it('Label for Logout button', () => {
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('#logout').html()).toContain('No more changes?')
    })

    it('Test Update Button', () => {
        const mockCallBack = jest.fn();
        const button = shallow(<button onClick={mockCallBack}>Update Details</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Test Logout Button', () => {
        const mockCallBack = jest.fn();
        const button = shallow(<button onClick={mockCallBack}>Logout</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Test Loan type field', () => {
        const a = <td>Loan Type</td>
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('td').getElements()[0]).toMatchObject(a)
    })

    it('Test Loan Amount field', () => {
        const a = <td>Loan Amount</td>
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('td').getElements()[2]).toMatchObject(a)
    })

    it('Test Loan Apply Date field', () => {
        const a = <td>Loan Apply Date</td>
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('td').getElements()[4]).toMatchObject(a)
    })

    it('Test Loan Issue Date field', () => {
        const a = <td>Loan Issue Date</td>
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('td').getElements()[6]).toMatchObject(a)
    })

    it('Test Rate of Interest field', () => {
        const a = <td>Rate of Interest</td>
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('td').getElements()[8]).toMatchObject(a)
    })

    it('Test Duration of Loan field', () => {
        const a = <td>Duration of Loan</td>
        let shallowWrapper = new ShallowWrapper(<LoanDetails />)
        expect(shallowWrapper.find('td').getElements()[10]).toMatchObject(a)
    })
})