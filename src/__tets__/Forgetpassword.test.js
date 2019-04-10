import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Forgetpassword from '../components/forgetPassword';
import '../setUp';
const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('Login Component', () => {
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
      expect(shallow(<Forgetpassword />).exists()).toBe(true)
    })
   })
   // within the Login components describe function
it('renders a email input', () => {
    expect(shallow(<Forgetpassword />).find('#username').length).toEqual(1)
   })
 
   // within the Login components describe function
describe('Email input', () => {
  
  it('should respond to change event and change the state of the Login Component', () => {
   
   const wrapper = shallow(<Forgetpassword />);
   wrapper.find('#username').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
   
  expect(wrapper.state('email')).toEqual('blah@gmail.com');
  })
 })
