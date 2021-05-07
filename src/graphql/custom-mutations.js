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
      age
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      profilePictureKey
      name
      age
      isActive
      createdAt
      updatedAt
      owner
      experiences {
        items {
          id
          ownerID
          name
          pictureKey
          story
          tags
          createdAt
          updatedAt
        }
        nextToken
      }
      requests {
        items {
          id
          fromID
          toID
          requestedOn
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      sentRequests {
        items {
          id
          fromID
          toID
          requestedOn
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      follows {
        items {
          id
          byID
          whoID
          requestedOn
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      followers {
        items {
          id
          byID
          whoID
          requestedOn
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
      owner {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
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
      owner {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
    }
  }
`;
export const deleteExperience = /* GraphQL */ `
  mutation DeleteExperience(
    $input: DeleteExperienceInput!
    $condition: ModelExperienceConditionInput
  ) {
    deleteExperience(input: $input, condition: $condition) {
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
      owner {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
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
      createdAt
      updatedAt
      from {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      to {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      owner
    }
  }
`;
export const updateFollowRequest = /* GraphQL */ `
  mutation UpdateFollowRequest(
    $input: UpdateFollowRequestInput!
    $condition: ModelFollowRequestConditionInput
  ) {
    updateFollowRequest(input: $input, condition: $condition) {
      id
      fromID
      toID
      requestedOn
      createdAt
      updatedAt
      from {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      to {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      owner
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
      from {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      to {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      owner
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
      createdAt
      updatedAt
      by {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      who {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      owner
    }
  }
`;
export const updateFollowRelationship = /* GraphQL */ `
  mutation UpdateFollowRelationship(
    $input: UpdateFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    updateFollowRelationship(input: $input, condition: $condition) {
      id
      byID
      whoID
      requestedOn
      createdAt
      updatedAt
      by {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      who {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
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
      by {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      who {
        id
        profilePictureKey
        name
        age
        isActive
        createdAt
        updatedAt
        owner
        experiences {
          nextToken
        }
        requests {
          nextToken
        }
        sentRequests {
          nextToken
        }
        follows {
          nextToken
        }
        followers {
          nextToken
        }
      }
      owner
    }
  }
`;
