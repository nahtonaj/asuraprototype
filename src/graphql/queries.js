/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSlangProfile = /* GraphQL */ `
  query GetSlangProfile($id: ID!) {
    getSlangProfile(id: $id) {
      id
      profilePictureKey
      picture1Key
      picture2Key
      picture3Key
      name
      age
      isActive
      matches
      createdAt
      updatedAt
    }
  }
`;
export const listSlangProfiles = /* GraphQL */ `
  query ListSlangProfiles(
    $filter: ModelSlangProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSlangProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profilePictureKey
        picture1Key
        picture2Key
        picture3Key
        name
        age
        isActive
        matches
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
