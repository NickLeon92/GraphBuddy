import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

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
    console.log(formState);
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

  return (

    <Card style={{ width: '50%' }}>
      <Card.Body>
        <Card.Title>Welcome Back!</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Login to your account</Card.Subtitle>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              className="form-input"
              placeholder="Enter email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit"
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </Form>
        <br />
        <Card.Link href="/signup">Don't have an account? Sign Up!</Card.Link>

      </Card.Body>
    </Card>
  );
};

export default Login;
