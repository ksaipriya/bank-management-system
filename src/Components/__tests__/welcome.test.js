import React from 'react';
import { render } from '@testing-library/react';
import Welcome from '../Welcome.js'
import ShallowRenderer from 'react-test-renderer/shallow';
import Adapter from 'enzyme-adapter-react-16';
import { shallow ,configure} from 'enzyme';

configure({ adapter: new Adapter() });
describe('Test case for Success Component', () => {

    it('matches snapshot', () => {
        const shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<Welcome />);
        const result = shallowRenderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });

    it('check Logout button', () => {
        const mockCallBack = jest.fn();
        const button = shallow(<button onClick={mockCallBack}>Logout</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })

    it('check Register button', () => {
        const mockCallBack = jest.fn();
        const button = shallow(<button onClick={mockCallBack}>Register</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })

    it('check Login button', () => {
        const mockCallBack = jest.fn();
        const button = shallow(<button onClick={mockCallBack}>Login</button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })

})