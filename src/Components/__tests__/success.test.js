import React from 'react';
import { render } from '@testing-library/react';
import Success from '../success.js'
import ShallowRenderer from 'react-test-renderer/shallow';
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';

enzyme.configure({ adapter: new Adapter() });
describe('Test case for Success Component', () => {
    it('matches snapshot', () => {
        const shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<Success/>);
        const result = shallowRenderer.getRenderOutput();
        expect(result).toMatchSnapshot();

    });

    it('check title', () => {
        let wrapper = render(<Success/>)
        const title = wrapper.getByTestId('success')
        expect(title.textContent).toBe('Successfully logged in!')
    })

    it('check apply loan button',()=>{
        const mockCallBack = jest.fn();
        const button = enzyme.shallow(<button onClick={mockCallBack}>Apply Loan</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })

    it('check update details button',()=>{
        const mockCallBack = jest.fn();
        const button = enzyme.shallow(<button onClick={mockCallBack}>Update Details</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })
})