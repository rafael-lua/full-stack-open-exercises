import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBookMutation(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      },
      published
    }    
  }
`

export const SET_BIRTH = gql`
  mutation setBirthMutation(
    $name: String!,
    $setBornTo: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name,
      born
    }    
  }
`

export const LOGIN = gql`
  mutation loginMutation(
    $username: String!,
    $password: String!
  ) {
    login (
      username: $username,
      password: $password
    ) {
      value
    }
  }
`