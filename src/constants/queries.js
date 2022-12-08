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

export const GET_GENRES = gql`
  query {
    genres {
        id
        genre
    }
  }
`;

export const GET_ACTORS = gql`
  query {
    actors {
        id
        firstName
        lastName
    }
  }
`;

export const GET_DIRECTORS = gql`
  query {
    directors {
        id
        firstName
        lastName
    }
  }
`;

export const SEARCH_MOVIE = gql`
  query findMovie($term: String!) {
    movie(term: $term) {
      name
      synopsis
    }
  }
`;

export const SEARCH_ACTOR = gql`
  query findActor($term: String!) {
    actor(term: $term) {
      firstName
      lastName
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation createMovieMutation($name: String!, $year: Int, $ageLimit: Int, $rating: Int, $synopsis: String!, $genres: String, $actors: String, $directorId: String) {
    createMovie(movie: {
      name: $name,
      year: $year,
      ageLimit: $ageLimit,
      rating: $rating,
      synopsis: $synopsis,
      genresIds: [$genres],
      actorsIds: [$actors],
      directorId: $directorId
    }
    ) {
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
`