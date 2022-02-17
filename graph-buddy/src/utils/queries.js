import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      graphs {
        _id
        title
        labels
        data
      }
    }
  }
`
;
