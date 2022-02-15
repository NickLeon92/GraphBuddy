import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (

    <Card style={{ width: '50%' }}>
      <Card.Body>
        <Card.Title>Welcome Back!</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Login to your account</Card.Subtitle>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              className="form-input"
              placeholder="Enter email"
              name="username"
              type="username"
              value={formState.name}
              onChange={handleChange}
              
            />
            <Form.Text className="text-muted">
              Create a username for your profile
            </Form.Text>
          </Form.Group>
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
        {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
      </Card.Body>
    </Card>
  );
};

export default Signup;
