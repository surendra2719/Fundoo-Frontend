import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Register from '../components/registration';
import '../setUp'
const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('Register Component', () => {
 
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
      expect(shallow(<Register />).exists()).toBe(true)
    })
   })
   // within the Register components describe function
it('renders a email input', () => {
    expect(shallow(<Register />).find('#firstName').length).toEqual(1)
   })
  it('renders a password input', () => {
    expect(shallow(<Register />).find('#lastName').length).toEqual(1)
   })
   // within the Register components describe function
describe('Email input', () => {
  
  it('should respond to change event and change the state of the Register Component', () => {
   
   const wrapper = shallow(<Register />);
   wrapper.find('#firstName').simulate('change', {target: {name: 'firstName', value: 'blah'}});
   
  expect(wrapper.state('firstName')).toEqual('blah');
  })
 })
 
 describe('Password input', () => {
  
  it('should respond to change event and change the state of the Register Component', () => {
   
   const wrapper = shallow(< Register />);
   wrapper.find('#lastName').simulate('change', {target: {name: 'lastName', value: 'blah'}});
   
   expect(wrapper.state('lastName')).toEqual('blah');
  })
 })
     // make our assertion and what we expect to happen 
     it('should render without throwing an error', () => {
        expect(shallow(<Register />).exists()).toBe(true)
      })
    
     // within the Register components describe function
  it('renders a email input', () => {
      expect(shallow(<Register />).find('#username').length).toEqual(1)
     })
    it('renders a password input', () => {
      expect(shallow(<Register />).find('#password1').length).toEqual(1)
     })
     // within the Register components describe function
  describe('Email input', () => {
    
    it('should respond to change event and change the state of the Register Component', () => {
     
     const wrapper = shallow(<Register />);
     wrapper.find('#username').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
     
    expect(wrapper.state('email')).toEqual('blah@gmail.com');
    })
   })
   
   describe('Password input', () => {
    
    it('should respond to change event and change the state of the Register Component', () => {
     
     const wrapper = shallow(<Register />);
     wrapper.find('#password1').simulate('change', {target: {name: 'password', value: 'password'}});
     
     expect(wrapper.state('password')).toEqual('password');
    })
   })
   it('renders a password input', () => {
    expect(shallow(<Register />).find('#conformpassword').length).toEqual(1)
   })
   describe('Password input', () => {
    
    it('should respond to change event and change the state of the Register Component', () => {
     
     const wrapper = shallow(<Register />);
     wrapper.find('#conformpassword').simulate('change', {target: {name: 'password', value: 'password'}});
     
     expect(wrapper.state('password')).toEqual('password');
    })
   })

   