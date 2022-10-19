import { gql } from "@apollo/client";

export const GET_ALL_ARTICLES = gql`
  {
    articles(sort: "publishedAt:desc") {
      data {
        id
        attributes {
          slug
          title
          description
          publishedAt
          category {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query ($slug: String!) {
    articles(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          publishedAt
          blocks {
            __typename
          }
          cover {
            data {
              attributes {
                formats
              }
            }
          }
          author {
            data {
              attributes {
                name
                avatar {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_CATEGORY = gql`
  query ($slug: String!) {
    articles(
      sort: "publishedAt:desc"
      filters: { category: { slug: { eq: $slug } } }
    ) {
      data {
        id
        attributes {
          slug
          title
          description
          publishedAt
          category {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ARTICLE_SLUG = gql`
  {
    articles {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
