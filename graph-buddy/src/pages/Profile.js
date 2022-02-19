import React, { useEffect, useState } from 'react';
import {useQuery} from '@apollo/client'
import {QUERY_ME} from '../utils/queries'
import {Form, Button, Offcanvas} from 'react-bootstrap'
import LineChart from '../components/Charts/LineChart'
import ChartEditor from '../components/ChartEditor';


import Auth from '../utils/auth';

const Profile = () => {

  const {loading, data} = useQuery(QUERY_ME)
  const graphData = data?.me || {}

  const [show, setShow] = useState(false);
  const [currentGraph, setCurrentGraph] = useState({
    id:'',
    title:'',
    labels:[],
    data:[]
    })
  const [graphHistory, setGraphHistory] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    if(!loading){
      setGraphHistory(graphData.graphs)
    }
  },[loading])
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNew = () => {
    setCurrentGraph({
      id:'',
      title:'',
      labels:[],
      data:[]
      })
      setTitle('')
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
      <div style={{marginBottom:'2rem'}}>
      <Button 
        variant="primary" 
        onClick={handleShow}>
        Graph List
      </Button>
      <Button 
        variant="outline-primary" 
        onClick={() => handleNew()}
        style={{marginLeft:'2rem'}}>
        New Graph
      </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose}  placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!loading && graphHistory.map((el) => (
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} key={el._id}>
                <p>{el.title}: {el.labels.length} data points</p>
                <Button 
                variant="success"
                onClick={() => {
                  setCurrentGraph(el)
                  setTitle(el.title)
                }}
                >Update</Button>
                <Button 
                variant="danger"
                onClick={() => {
                  let thisId = el.id
                  const filteredArr = graphHistory.filter((el) => el.id !== thisId)
              
                  setGraphHistory(filteredArr)
                }}
                >Delete</Button>
              </div>)
            )}
        </Offcanvas.Body>
      </Offcanvas>

      <ChartEditor currentGraph={currentGraph} setCurrentGraph={setCurrentGraph} setGraphHistory={setGraphHistory} graphHistory={graphHistory} title={title} setTitle={setTitle}/>

    </div>
  );
};

export default Profile;
