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


export const ADD_GRAPH = gql`
  mutation addGraph($id: String, $title:String, $labels:String, $data:String){
    addGraph(id:$id, title:$title, labels:$labels, data:$data){
      _id
      username
      graphs{
        id
        title
        labels
        data
      }
    }
  }
`;

export const UPDATE_GRAPH = gql`
mutation updateGraph($id: String, $title:String, $labels:String, $data:String){
  updateGraph(id:$id, title:$title, labels:$labels, data:$data){
    id
    title
    labels
    data
  }
}
`

export const REMOVE_GRAPH = gql`
  mutation removeGraph($id:String){
    removeGraph(id:$id){
      id
    }
  }
`
;
