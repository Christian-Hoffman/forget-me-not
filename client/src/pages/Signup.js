import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
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
        <h4 style={{marginBottom:"20px", fontSize:"40px"}}>Sign Up</h4>
        <input style={{display:"flex", fontSize:"30px", borderRadius:"10px", padding:"10px"}}
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input style={{ display:"flex" , fontSize:"30px", borderRadius:"10px", marginTop:"10px", padding:"10px"}}
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

export default Signup;
