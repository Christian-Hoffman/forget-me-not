import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput, MediaQuery, Title, PasswordInput, Button } from "@mantine/core"

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

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
      <form onSubmit={handleFormSubmit} style={{ alignItems: "center", display: "flex", justifyContent: "center", marginTop: "50px", flexDirection: "column", marginBottom: "225px" }}>
        <TextInput
          withAsterisk
          label="Your Username"
          name="username"
          size="xl"
          placeholder="Test User"
          onChange={handleChange}
          radius="xl"
          style={{ width: "50vw", marginBottom: "20px" }}
        />

        <TextInput
          withAsterisk
          label="Your Email"
          name="email"
          size="xl"
          placeholder="test@user.com"
          onChange={handleChange}
          radius="xl"
          style={{ width: "50vw", marginBottom: "20px" }}
          />

        <PasswordInput
          withAsterisk
          label="Your Password"
          name="password"
          size="xl"
          placeholder="******"
          onChange={handleChange}
          radius="xl"
          style={{ width: "50vw", marginBottom: "20px" }}
          />

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
            Sign Up
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

export default Signup;
