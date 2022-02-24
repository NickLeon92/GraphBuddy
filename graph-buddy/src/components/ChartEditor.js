import React, {useState, useRef, useEffect} from 'react';
import {useMutation} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import {Container, Form, Button, FormGroup} from 'react-bootstrap'
import LineChart from './Charts/LineChart';
import { ADD_GRAPH, UPDATE_GRAPH } from '../utils/mutations';

const ChartEditor = ({currentGraph, setCurrentGraph, setGraphHistory, graphHistory, title, setTitle}) => {
    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [updateGraph, {error}] = useMutation(UPDATE_GRAPH)
    const [addGraph] = useMutation(ADD_GRAPH)
    const labelsRef = useRef()
    const dataRef = useRef()
  
    const handleGraph = async (e) => {
      console.log('saving...', labelsRef.current.value, dataRef.current.value)
      e.preventDefault()
      if(title !==''){
        
        let db_X = 'N/A'
        let db_Y = '0'
        const num = y
        const string = x
        const updatedGraph = {...currentGraph}
        if(x !== '' && y !== ''){
          console.log(x,y,updatedGraph)
          updatedGraph.labels = [...updatedGraph.labels, x]
          updatedGraph.data = [...updatedGraph.data, y]
          db_X = x
          db_Y = y
        }
        updatedGraph.title = title

        setCurrentGraph(updatedGraph)
        
        console.log('handling save for id: ', currentGraph.id, 'and title: ', title)


        if(currentGraph.id === ''){
            updatedGraph.id = uuidv4()
            setGraphHistory((prev) => [...prev, updatedGraph])
            console.log('added graph array: ', updatedGraph.id,db_X,db_Y,title)

            try{
              const {data} = await addGraph({
                variables: {
                  id: updatedGraph.id,
                  title: title,
                  labels: db_X,
                  data: db_Y
                }
              })
              console.log(data)
            } catch (err){
              console.log('errors found: ', err)
            }
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
            console.log('updated graph array: ', currentGraph.id,db_X,db_Y,title)
            setGraphHistory(updatedArr)
            try{
              const {data} = await updateGraph({
                variables: {
                  id: currentGraph.id,
                  title: title,
                  labels: db_X,
                  data:  db_Y,
                }
              })
              console.log(data)
            } catch (err){
              console.log('errors found: ', err)
            }
        }
        console.log('finish')

        setX('')
        setY('')
      }
    }

    const handleGrapher = async (e) => {
      e.preventDefault()
      setX('')
      setY('')
      console.log(currentGraph)
      console.log(labelsRef.current.value, dataRef.current.value)
      try{
        const {data} = await addGraph({
          variables: {
            id: uuidv4(),
            title: title,
            labels: x,
            data: y,
          },
        })
      }catch(err){
        console.log(err)
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
              Name your chart..
            </Form.Text>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>New Data Label</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter data point label..."
              value={x} 
              onChange={(event) => setX(event.target.value)}
              ref={labelsRef}
            />
            <Form.Text className="text-muted">
              Name this data entry... 
            </Form.Text>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Value</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Number Value"
              value={y}
              onChange={(event) => setY(event.target.value)}
              ref={dataRef}
            />
            <Form.Text className="text-muted">
              Enter value of data entry.. 
            </Form.Text>
          </Form.Group>
  
          <Button 
            variant="success"
            onClick={(e) => handleGraph(e)}
          >
            Update and Save
          </Button>
          {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
        </Form>
        <LineChart l={currentGraph.labels} d={currentGraph.data} title={currentGraph.title}/>

        </Container>
    );
};

export default ChartEditor;