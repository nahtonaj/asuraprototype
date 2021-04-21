/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createSlangProfile = /* GraphQL */ `
  mutation CreateSlangProfile(
    $input: CreateSlangProfileInput!
    $condition: ModelSlangProfileConditionInput
  ) {
    createSlangProfile(input: $input, condition: $condition) {
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
export const updateSlangProfile = /* GraphQL */ `
  mutation UpdateSlangProfile(
    $input: UpdateSlangProfileInput!
    $condition: ModelSlangProfileConditionInput
  ) {
    updateSlangProfile(input: $input, condition: $condition) {
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
export const deleteSlangProfile = /* GraphQL */ `
  mutation DeleteSlangProfile(
    $input: DeleteSlangProfileInput!
    $condition: ModelSlangProfileConditionInput
  ) {
    deleteSlangProfile(input: $input, condition: $condition) {
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
