import gql from 'graphql-tag'

export const GET_MOVIES = gql`
  query {
    movies {
        name
        year
        ageLimit
        rating
        synopsis
        genres{
            genre
        }
        actors{
            firstName
            lastName
        }
        director{
            firstName
            lastName
        }
    }
  }
`;