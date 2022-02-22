import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_GRAPH = gql`
  mutation updateGraph($graphId:String, $title:String, $labels:String, $data:Int){
    updateGraph(graphId:$graphId, title:$title, labels:$labels, data:$data){
      username
      graphs{
        title
      }
    }
  }
`

export const REMOVE_GRAPH = gql`
  mutation removeGraph($graphId:String){
    removeGraph(graphId:$graphId){
      username
      graphs{
        id
        title
      }
    }
  }
`
;
