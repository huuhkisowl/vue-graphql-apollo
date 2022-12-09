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

export const SEARCH_MOVIE_BY_ACTOR = gql`
  query findMovieByActor($id: String!) {
    moviesByActorId(id: $id) {
      name
      synopsis
      actors{
        firstName
        lastName
      }
    }
  }
`;

export const SEARCH_MOVIE_BY_GENRE = gql`
  query findMovieByGenre($id: String!) {
    moviesByGenreId(id: $id) {
      name
      synopsis
      genres{
        genre
      }
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation createMovieMutation($name: String!, $year: Int, $ageLimit: Int, $rating: Int, $synopsis: String!, $genresIds: [String], $actorsIds: [String], $directorId: String) {
    createMovie(movie: {
      name: $name,
      year: $year,
      ageLimit: $ageLimit,
      rating: $rating,
      synopsis: $synopsis,
      genresIds: $genresIds,
      actorsIds: $actorsIds,
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