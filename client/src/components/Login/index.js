import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput, MediaQuery, Title, PasswordInput, Button } from "@mantine/core"

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

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

    console.log(formState)
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formState)
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
      <form onSubmit={handleFormSubmit} style={{ alignItems: "center", display: "flex", justifyContent: "center", flexDirection: "column", marginBottom: "400px" }}>
        <TextInput
          withAsterisk
          label="Your Email"
          name={"email"}
          size={"xl"}
          placeholder='test@user.com'
          onChange={handleChange}
          radius={"xl"}
          style={{ width: "50vw" }}
        />
        <MediaQuery smallerThan={"sm"}>
          <PasswordInput
            withAsterisk
            name={"password"}
            size={"xl"}
            label="Your Password"
            placeholder="******"
            onChange={handleChange}
            radius={"xl"}
            style={{ width: "50vw" }}
          />
        </MediaQuery>

        <Button type="submit"
          style={{ display: "flex", fontSize: "30px", borderRadius: "10px", marginTop: "24px" }}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          size={"xl"}
        >
          Submit
        </Button>
      </form>
    );
  };

  return (
    <main>
      <h4></h4>
      <div>
        <div>
          <Title order={1} style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "20px",
            fontSize: "40px",
            marginTop: "100px",
          }}>
            Login
          </Title>
        </div>
        {error &&
          <div>
            <Title
              order={3}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              color="red.8">
                
              Incorrect Email or Password!
            </Title>
          </div>}
        {renderForm()}

      </div>
    </main>
  );
};

export default Login;
