
//      // make our assertion and what we expect to happen 
//      it('should render without throwing an error', () => {
//         expect(shallow(<createNotes />).exists()).toBe(true)
//       })
    
//      // within the createNotes components describe function
//   it('renders a email input', () => {
//       expect(shallow(<createNotes />).find('#username').length).toEqual(1)
//      })
//     it('renders a password input', () => {
//       expect(shallow(<createNotes />).find('#password1').length).toEqual(1)
//      })
//      // within the createNotes components describe function
//   describe('Email input', () => {
    
//     it('should respond to change event and change the state of the createNotes Component', () => {
     
//      const wrapper = shallow(<createNotes />);
//      wrapper.find('#username').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
     
//     expect(wrapper.state('email')).toEqual('blah@gmail.com');
//     })
//    })
   
//    describe('Password input', () => {
    
//     it('should respond to change event and change the state of the createNotes Component', () => {
     
//      const wrapper = shallow(<createNotes />);
//      wrapper.find('#password1').simulate('change', {target: {name: 'password', value: 'password'}});
     
//      expect(wrapper.state('password')).toEqual('password');
//     })
//    })
//    it('renders a password input', () => {
//     expect(shallow(<createNotes />).find('#conformpassword').length).toEqual(1)
//    })
//    describe('Password input', () => {
    
//     it('should respond to change event and change the state of the createNotes Component', () => {
     
//      const wrapper = shallow(<createNotes />);
//      wrapper.find('#conformpassword').simulate('change', {target: {name: 'password', value: 'password'}});
     
// //      expect(wrapper.state('password')).toEqual('password');
// //     })
//    })

   