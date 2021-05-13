/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      profilePictureKey
      name
      namelowercase
      age
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      profilePictureKey
      name
      namelowercase
      age
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const createFollowRequest = /* GraphQL */ `
  mutation CreateFollowRequest(
    $input: CreateFollowRequestInput!
    $condition: ModelFollowRequestConditionInput
  ) {
    createFollowRequest(input: $input, condition: $condition) {
      id
      fromID
      toID
      requestedOn
    }
  }
`;
export const createFollowRelationship = /* GraphQL */ `
  mutation CreateFollowRelationship(
    $input: CreateFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    createFollowRelationship(input: $input, condition: $condition) {
      id
      byID
      whoID
      requestedOn
    }
  }
`;
export const deleteFollowRequest = /* GraphQL */ `
  mutation DeleteFollowRequest(
    $input: DeleteFollowRequestInput!
    $condition: ModelFollowRequestConditionInput
  ) {
    deleteFollowRequest(input: $input, condition: $condition) {
      id
      fromID
      toID
      requestedOn
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFollowRelationship = /* GraphQL */ `
  mutation DeleteFollowRelationship(
    $input: DeleteFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    deleteFollowRelationship(input: $input, condition: $condition) {
      id
      byID
      whoID
      requestedOn
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createExperience = /* GraphQL */ `
  mutation CreateExperience(
    $input: CreateExperienceInput!
    $condition: ModelExperienceConditionInput
  ) {
    createExperience(input: $input, condition: $condition) {
      id
      ownerID
      name
      location {
        lat
        lon
      }
      pictureKey
      story
      tags
      createdAt
      updatedAt
    }
  }
`;
export const updateExperience = /* GraphQL */ `
  mutation UpdateExperience(
    $input: UpdateExperienceInput!
    $condition: ModelExperienceConditionInput
  ) {
    updateExperience(input: $input, condition: $condition) {
      id
      ownerID
      name
      location {
        lat
        lon
      }
      pictureKey
      story
      tags
      createdAt
      updatedAt
    }
  }
`;