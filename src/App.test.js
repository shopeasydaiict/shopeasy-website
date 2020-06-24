import React from 'react';
import App from './App';
import fire from "./config/fire";
//test('renders learn react link', () => {
//  const { getByText } = render(<App />);
//  const linkElement = getByText(/learn react/i);
//  expect(linkElement).toBeInTheDocument();
//});

import { shallow, mount } from 'enzyme';
import Login from './Login';

/*test('sign in with correct password',() => {
    login('hunnybalani26@gmail.com', 'Chotumotu@17');
    expect('isLogin').toBe(true);
});*/

describe('Test case for testing Password',() =>{
test('Valid password',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().validatePassword('Chotumotu@17')).toBe(true);
    
})
it('Invalid password length less than 8 with all other conditions',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().validatePassword('Abc@2')).toBe(false);
    
})
it('Invalid password length less than 8 not satisfying all other conditions',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().validatePassword('abc2')).toBe(false);
    
})
it('Invalid password without special character',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().validatePassword('BlahBlah123')).toBe(false);
    
})
it('Invalid password without Uppercase character',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().validatePassword('blahblah@123')).toBe(false);
    
})
it('Invalid password without Numeric character',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().validatePassword('BlahBlah@')).toBe(false);
    
})
it('Invalid password without Lowercase character',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().validatePassword('BLAH@123')).toBe(false);
    
})
it('Invalid password with empty string',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().validatePassword('')).toBe(false);
    
})
});


describe('Test case for testing login',() =>{
let wrapper;
let wrapper2;
test('username check',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'hunnybalani26@gmail.com'}});
expect(wrapper.state('email')).toEqual('hunnybalani26@gmail.com');
})
it('password check',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'Chotumotu@17'}});
expect(wrapper.state('password')).toEqual('Chotumotu@17');
})
it('input only email and no password',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'hunnybalani26@gmail.com'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: ''}});
wrapper.find('button').at(0).simulate('click');
expect(wrapper2.state('isLogin')).toBe(false);
})
it('login check with right data',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'hunnybalani26@gmail.com'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'Chotumotu@17'}});
wrapper.find('button').at(0).simulate('click');
/*const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
while(wrapper2.state('isLogin')!=true)
    sleep(1000);*/
wrapper2= shallow(<App/>);
expect(wrapper2.state('isLogin')).toBe(true);
})
it('login check with right data2',()=>{
    wrapper = mount(<Login/>);
    wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'hunnybalani26@gmail.com'}});
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'Chotumotu@17'}});
    wrapper.find('button').at(0).simulate('click');
    wrapper2= mount(<App/>);
    expect(wrapper2.instance().onAuthStateCHanged('user')).toBe(true);
    })
it('login check with wrong data',()=>{
wrapper = shallow(<Login/>);
wrapper2= shallow(<App/>);
wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'hunnybalani26@gmail.com'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'Chotumotu@09'}});
wrapper.find('button').at(0).simulate('click');
expect(wrapper2.state('isLogin')).toBe(false);
})
})