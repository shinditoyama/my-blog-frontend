import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  {
    categories {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_CATEGORY_SLUG = gql`
  {
    categories {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
