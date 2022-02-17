import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap'
import LineChart from '../components/Charts/LineChart'


import Auth from '../utils/auth';

const Profile = () => {

  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [title, setTitle] = useState('')

  const [l, setLabels] = useState([])
  const [d, setData] = useState([])

  const handleGraph = (e) => {
    e.preventDefault()
    if(x !== '' && y){
      let newlabels = [...l,x]
      let newdata = [...d,y]
      setTitle(title)
      setLabels(newlabels)
      setData(newdata)
      setX('')
      setY('')
    }
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
      
    );
  }

  else 

  return (
    <div>
      <h2 style={{textAlign:'center',margin:'3rem'}}>Viewing {Auth.getProfile().data.username}'s profile.</h2>
      <Form style={{width:'50%'}}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Chart Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Chart Title..."
            value={title} 
            onChange={(event) => setTitle(event.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>New Data Point</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter data point label..."
            value={x} 
            onChange={(event) => setX(event.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Value</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Number Value"
            value={y}
            onChange={(event) => setY(event.target.value)} 
          />
        </Form.Group>

        <Button 
          variant="success"
          type="submit"
          onClick={(e) => handleGraph(e)}
        >
          Update and Save
        </Button>
      </Form>

      <LineChart l={l} d={d} title={title}/>
    </div>
  );
};

export default Profile;
