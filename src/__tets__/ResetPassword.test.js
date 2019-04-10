import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Resetpassword from '../components/resetPassword';
import '../setUp'
const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('resetpassword Component', () => {
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
      expect(shallow(<Resetpassword />).exists()).toBe(true)
    })
   })
   // within the Login components describe function
   it('renders a newpassword input', () => {
    expect(shallow(<Resetpassword />).find('#newpassword').length).toEqual(1)
   })


   
 
   // within the Login components describe function
describe('newpassword input', () => {
  
  it('should respond to change event and change the state of the Login Component', () => {
   
   const wrapper = shallow(<Resetpassword />);
   wrapper.find('#newpassword').simulate('change', {target: {name: 'password', value: 'blah'}});
   
  expect(wrapper.state('password')).toEqual('blah');
  })
 })

 it('renders a password input', () => {
    expect(shallow(<Resetpassword />).find('#cpassword').length).toEqual(1)
   })
   describe('Password input', () => {
    
    it('should respond to change event and change the state of the Register Component', () => {
     
     const wrapper = shallow(<Resetpassword />);
     wrapper.find('#cpassword').simulate('change', {target: {name: 'password', value: 'blah'}});
     
     expect(wrapper.state('password')).toEqual('blah');
    })
   })
