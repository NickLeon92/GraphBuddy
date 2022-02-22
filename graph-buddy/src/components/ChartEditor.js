import React, {useState} from 'react';
import {useMutation} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import {Container, Form, Button, FormGroup} from 'react-bootstrap'
import LineChart from './Charts/LineChart';
import { ADD_GRAPH, UPDATE_GRAPH } from '../utils/mutations';

const ChartEditor = ({currentGraph, setCurrentGraph, setGraphHistory, graphHistory, title, setTitle}) => {
    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [updateGraph] = useMutation(UPDATE_GRAPH)
    const [addGraph] = useMutation(ADD_GRAPH)
  
    const handleGraph = async (e) => {
      e.preventDefault()
      if(title !==''){

        let db_X = 'N/A'
        let db_Y = 0
        const updatedGraph = {...currentGraph}
        if(x !== '' && y !== ''){
          updatedGraph.labels.push(x)
          updatedGraph.data.push(y)
          db_X = x
          db_Y = y
        }
        updatedGraph.title = title

        setCurrentGraph(updatedGraph)


        if(currentGraph.id === ''){
            updatedGraph.id = uuidv4()
            setGraphHistory((prev) => [...prev, updatedGraph])
            console.log('added graph array: ', updatedGraph.id,db_X,db_Y,title)
        }
        else if (updatedGraph.title !== currentGraph.title || (x !== '' && y !== '')){
            const updatedArr = graphHistory.map((el) =>{
                if(el.id===updatedGraph.id){
                    return el = updatedGraph
                }
                else{
                    return el
                }
            })
            console.log('updated graph array: ', updatedGraph.id,db_X,db_Y,title)
            setGraphHistory(updatedArr)
        }
        console.log('finish')

        setX('')
        setY('')
      }
    }
    return (
        <Container>

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
        <LineChart l={currentGraph.labels} d={currentGraph.data} title={currentGraph.title}/>

        </Container>
    );
};

export default ChartEditor;