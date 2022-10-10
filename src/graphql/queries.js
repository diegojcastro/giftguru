/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGift = /* GraphQL */ `
  query GetGift($id: ID!) {
    getGift(id: $id) {
      id
      name
      description
      imgUrl
      createdAt
      updatedAt
    }
  }
`;
export const listGifts = /* GraphQL */ `
  query ListGifts(
    $filter: ModelGiftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        imgUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
