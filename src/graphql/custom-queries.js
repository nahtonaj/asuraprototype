export const getUserProfile = /* GraphQL */ `
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
    }
  }
`;
export const getUserFollowers = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
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
export const getUserFollows = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
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
    }
  }
`;
export const listUsersByName = /* GraphQL */ `
  query ListUsers(
    $prefix: String
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: {name: {beginsWith: $prefix}}, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profilePictureKey
        name
        age
        xp
        username
        isActive
      }
      nextToken
    }
  }
`;