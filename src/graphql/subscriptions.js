/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
          owners
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
          owners
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
          owners
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
          owners
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
          owners
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
          owners
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
          owners
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
          owners
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
          owners
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
          owners
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
          owners
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
          owners
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
export const onCreateExperience = /* GraphQL */ `
  subscription OnCreateExperience {
    onCreateExperience {
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
        namelowercase
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
export const onUpdateExperience = /* GraphQL */ `
  subscription OnUpdateExperience {
    onUpdateExperience {
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
        namelowercase
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
export const onDeleteExperience = /* GraphQL */ `
  subscription OnDeleteExperience {
    onDeleteExperience {
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
        namelowercase
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
export const onCreateFollowRequest = /* GraphQL */ `
  subscription OnCreateFollowRequest {
    onCreateFollowRequest {
      id
      fromID
      toID
      owners
      requestedOn
      createdAt
      updatedAt
      from {
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
        namelowercase
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
export const onUpdateFollowRequest = /* GraphQL */ `
  subscription OnUpdateFollowRequest {
    onUpdateFollowRequest {
      id
      fromID
      toID
      owners
      requestedOn
      createdAt
      updatedAt
      from {
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
        namelowercase
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
export const onDeleteFollowRequest = /* GraphQL */ `
  subscription OnDeleteFollowRequest {
    onDeleteFollowRequest {
      id
      fromID
      toID
      owners
      requestedOn
      createdAt
      updatedAt
      from {
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
        namelowercase
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
export const onCreateFollowRelationship = /* GraphQL */ `
  subscription OnCreateFollowRelationship {
    onCreateFollowRelationship {
      id
      byID
      whoID
      owners
      requestedOn
      createdAt
      updatedAt
      by {
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
        namelowercase
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
export const onUpdateFollowRelationship = /* GraphQL */ `
  subscription OnUpdateFollowRelationship {
    onUpdateFollowRelationship {
      id
      byID
      whoID
      owners
      requestedOn
      createdAt
      updatedAt
      by {
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
        namelowercase
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
export const onDeleteFollowRelationship = /* GraphQL */ `
  subscription OnDeleteFollowRelationship {
    onDeleteFollowRelationship {
      id
      byID
      whoID
      owners
      requestedOn
      createdAt
      updatedAt
      by {
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
        namelowercase
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
