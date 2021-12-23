import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Home.js'
import ShallowRenderer from 'react-test-renderer/shallow';
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';

enzyme.configure({ adapter: new Adapter() });
describe('Test case for Home Component', () => {
    it('matches snapshot', () => {
        const shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<Home
            x={true}
        />);
        const result = shallowRenderer.getRenderOutput();
        expect(result).toMatchSnapshot();

    });

    it('check title', () => {
        let wrapper = render(<Home x={false} />)
        const title = wrapper.getByTestId('header')
        expect(title.textContent).toBe('Welcome to XXX Bank')
    })


    it ('authenticate label', () => {
        const { getByText } = render(<Home x={true} />)
        const name = getByText('Please Authenticate your email and register to enjoy our services');
        expect(name).toBeInTheDocument();
    });

    it('Test click event', () => {
        const mockCallBack = jest.fn();
        const button = enzyme.shallow(<button onClick={mockCallBack}>Authenticate</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
})