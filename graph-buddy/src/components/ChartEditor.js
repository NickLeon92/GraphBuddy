import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid'
import {Container, Form, Button, FormGroup} from 'react-bootstrap'
import LineChart from './Charts/LineChart';

const ChartEditor = ({currentGraph, setCurrentGraph, setGraphHistory, graphHistory}) => {
    const [x, setX] = useState('')
    const [y, setY] = useState('')
  
    // const [l, setLabels] = useState([])
    // const [d, setData] = useState([])
    const [title, setTitle] = useState('')
  
    const handleGraph = (e) => {
      e.preventDefault()
      if(x !== '' && y && title !==''){
          const check = graphHistory.map(el => el.title)
        // let newlabels = [...l,x]
        // let newdata = [...d,y]
        // setLabels(newlabels)
        // setData(newdata)

        const updatedGraph = {...currentGraph}
        updatedGraph.labels.push(x)
        updatedGraph.data.push(y)
        updatedGraph.title = title

        setCurrentGraph(updatedGraph)


        if(currentGraph.id === ''){
            updatedGraph.id = uuidv4()
            setGraphHistory((prev) => [...prev, updatedGraph])
        }
        else{
            const updatedArr = graphHistory.map((el) =>{
                if(el.id===updatedGraph.id){
                    return el = updatedGraph
                }
                else{
                    return el
                }
            })
        }


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