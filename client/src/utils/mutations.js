import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
  login(email: $email, password: $password){
    token
    user {
      _id
      username
      email
      notes {
        _id
        title
        body
        createdAt
        isPublic
      }
      lists {
        _id
        title
        listItems
        createdAt
        isPublic
        isOrdered
      }
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

export const ADD_NOTE = gql`
mutation AddNote($titleAN: String!, $bodyAN: String!, $isPublicAN: Boolean!) {
  addNote(title: $titleAN, body: $bodyAN, isPublic: $isPublicAN) {
    _id
    username
    notes {
      _id
      title
      body
      createdAt
      isPublic
    }
  }
}
`;

export const DELETE_NOTE = gql`
mutation DeleteNote($noteIdDN: ID!) {
  deleteNote(noteId: $noteIdDN) {
    _id
    username
    notes {
      _id
      title
      body
      createdAt
      isPublic
    }
  }
}
`;

export const EDIT_NOTE = gql`
mutation EditNote($noteIdEN: ID!, $titleEN: String!, $bodyEN: String!, $isPublicEN: Boolean!) {
  editNote(noteId: $noteIdEN, title: $titleEN, body: $bodyEN, isPublic: $isPublicEN) {
    _id
    username
    notes {
      _id
      title
      body
      createdAt
      isPublic
    }
  }
}
`;

export const ADD_LIST = gql`
mutation AddList($titleAL: String!, $listItemsAL: [String]!, $isPublicAL: Boolean!, $isOrderedAL: Boolean!) {
  addList(title: $titleAL, listItems: $listItemsAL, isPublic: $isPublicAL, isOrdered: $isOrderedAL) {
    _id
    username
    lists {
      _id
      title
      createdAt
      isPublic
      isOrdered
      listItems
    }
  }
}
`;


export const DELETE_LIST = gql`
mutation DeleteList($listIdDL: ID!) {
  deleteList(listId: $listIdDL) {
    _id
    username
    lists {
      _id
      title
      listItems
      createdAt
      isPublic
      isOrdered
    }
  }
}
`;

export const EDIT_LIST = gql`
mutation EditList($listIdEL: ID!, $titleEL: String!, $listItemsEL: [String]!, $isPublicEL: Boolean!, $isOrdered: Boolean!) {
  editList(listId: $listIdEL, title: $titleEL, listItems: $listItemsEL, isPublic: $isPublicEL, isOrdered: $isOrdered) {
    _id
    username
    lists {
      _id
      title
      listItems
      createdAt
      isPublic
      isOrdered
    }
  }
}
`;

