/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profilePictureKey
        name
        age
        xp
        username
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      profilePictureKey
      name
      age
      xp
      username
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
export const getExperience = /* GraphQL */ `
  query GetExperience($id: ID!) {
    getExperience(id: $id) {
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
        xp
        username
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
export const listExperiences = /* GraphQL */ `
  query ListExperiences(
    $filter: ModelExperienceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExperiences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          xp
          username
          isActive
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
    }
  }
`;
export const getFollowRequest = /* GraphQL */ `
  query GetFollowRequest($id: ID!) {
    getFollowRequest(id: $id) {
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
        xp
        username
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
        xp
        username
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
export const listFollowRequests = /* GraphQL */ `
  query ListFollowRequests(
    $filter: ModelFollowRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          xp
          username
          isActive
          createdAt
          updatedAt
          owner
        }
        to {
          id
          profilePictureKey
          name
          age
          xp
          username
          isActive
          createdAt
          updatedAt
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const getFollowRelationship = /* GraphQL */ `
  query GetFollowRelationship($id: ID!) {
    getFollowRelationship(id: $id) {
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
        xp
        username
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
        xp
        username
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
export const listFollowRelationships = /* GraphQL */ `
  query ListFollowRelationships(
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowRelationships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          xp
          username
          isActive
          createdAt
          updatedAt
          owner
        }
        who {
          id
          profilePictureKey
          name
          age
          xp
          username
          isActive
          createdAt
          updatedAt
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
