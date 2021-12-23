import React from 'react';
import { render } from '@testing-library/react';
import UpdateUser from '../UpdateDetails.js'
import Adapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import * as enzyme from 'enzyme'


enzyme.configure({ adapter: new Adapter() });
describe('Test case for update details component',()=>{
    let wrapper;
    it('header check', () => {
        wrapper = render(<UpdateUser />);
        const header = wrapper.getByTestId('title')
        expect(header.textContent).toBe('Update User')
    })

    it('proper form rendering', () => {
        const { getByText, getByLabelText } = render(<UpdateUser />)
        const name = getByText('Enter your customer id');
        expect(name).toBeInTheDocument();
        const inputUname = getByLabelText('Enter your customer id');
        expect(inputUname).toHaveAttribute('type', 'number')
    });

    it('matches snapshot', () => {
        const shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<UpdateUser/>);
        const result = shallowRenderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });
})
