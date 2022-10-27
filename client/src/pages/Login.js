import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
 
import Auth from '../utils/auth';
 
const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
 
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
 
    setFormState({
      ...formState,
      [name]: value,
    });
  };
 
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
 
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
 
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
 
  const renderForm = () => {
    if (data) {
      return (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      )
    }
    return (
      <form onSubmit={handleFormSubmit} style={{alignItems: "center", display:"flex", justifyContent:"center", marginTop:"450px", flexDirection:"column"}}>
              <h4 style={{marginBottom:"20px", fontSize:"40px"}}>Login</h4>
        <input style={{display:"flex", fontSize:"30px", borderRadius:"10px", padding:"10px"}}
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input style={{ display:"flex" , fontSize:"30px", borderRadius:"10px", marginTop:"10px", padding:"10px"}}
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit" style={{ display:"flex", fontSize:"30px", borderRadius:"10px", marginTop:"10px"}}>
          Submit
        </button>
      </form>
    );
  };
 
  return (
    <main>
      <h4></h4>
      <div>
        {renderForm()}
        {error && <div>{error.message}</div>}
      </div>
    </main>
  );
};
 
export default Login;
