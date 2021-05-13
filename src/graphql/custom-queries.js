export const getUserProfile = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      profilePictureKey
      name
      namelowercase
      age
      xp
      username
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const getUserFollow = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      requests {
        items {
          id
          fromID
          from {
            id
            name
            username
            profilePictureKey
          }
          requestedOn
        }
        nextToken
      }
      sentRequests {
        items {
          id
          toID
          to {
            id
            name
            username
            profilePictureKey
          }
          requestedOn
        }
        nextToken
      }
    }
  }
`;
export const getUserFollowing = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      follows {
        items {
          id
          byID
          whoID
          who {
            name
            username
            id
            profilePictureKey
          }
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
    listUsers(filter: {namelowercase: {beginsWith: $prefix}}, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profilePictureKey
        name
        namelowercase
        age
        xp
        username
        isActive
      }
      nextToken
    }
  }
`;
export const getUserFollowingExperiences = /* GraphQL */`
  query getUserFollowingExperiences(
    $id: ID!
  ) {
    getUser(id: $id) {
      follows {
        items {
          who {
            experiences(sortDirection: DESC, limit: 10) {
              items {
                updatedAt
                name
                id
                createdAt
                location {
                  lat
                  lon
                }
                ownerID
                pictureKey
                story
                tags
              }
            }
          }
        }
      }
    }
  }
`;