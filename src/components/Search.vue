<script>
import { SEARCH_MOVIE, GET_ACTORS, GET_GENRES, SEARCH_MOVIE_BY_ACTOR, SEARCH_MOVIE_BY_GENRE } from "../constants/queries";
export default {
  name: "Search",
  data() {
    return {
      movies: [],
      inputMovie: '',
      searchMovie: '',
      moviesByActor: [],
      actorsItem: [],
      actorsSelected: '',
      searchActor: '',
      moviesByGenre: [],
      genresItem: [],
      genresSelected: '',
      searchGenre: '',
    };
  },
  apollo: {
    movies: {
      query() {
        return SEARCH_MOVIE
      },
      variables () {
        return {
          term: this.searchMovie
        }
      },
      skip () {
        return !this.searchMovie
      },
      update: data => data.movie        
    },
    moviesByActor: {
      query() {
        return SEARCH_MOVIE_BY_ACTOR
      },
      variables () {
        return {
          id: this.searchActor
        }
      },
      skip () {
        return !this.searchActor
      },
      update: data => data.moviesByActorId        
    },
    actorsItem: {
      query() {
        return GET_ACTORS
      },
      update: data => {
          const getActors = []
          data.actors.map((actor_item, index) => {
            let newObj = new Object();
            newObj.name = `${actor_item.firstName} ${actor_item.lastName}`
            newObj.id = actor_item.id
            getActors[index] = newObj
          })
          return getActors;
      }
    },
    moviesByGenre: {
      query() {
        return SEARCH_MOVIE_BY_GENRE
      },
      variables () {
        return {
          id: this.searchGenre
        }
      },
      skip () {
        return !this.searchGenre
      },
      update: data => data.moviesByGenreId        
    },
    genresItem: {
      query() {
        return GET_GENRES
      },
      update: data => data.genres 
    },
  },
  methods: {
    onEnterMovie (event) {
      event.preventDefault()
      if(!this.inputMovie)
        this.movies = []
        
      this.clearFields("actor")
      this.clearFields("genre")
      this.searchMovie = this.inputMovie;
    },
    clearFields(type) {
      switch(type) {
        case "movie":
          this.inputMovie = ''
          this.movies = []
          break;
        case "actor":
          this.actorsSelected = ''
          this.moviesByActor = []
          break;
        case "genre":
          this.genresSelected = ''
          this.moviesByGenre = []
          break;
      }
    }
  },
  watch: {
    actorsSelected(newSelected, oldSelected) {
      if(newSelected) {
        this.clearFields("movie")
        this.clearFields("genre")
        this.searchActor = newSelected.id;
      }
    },
    genresSelected(newSelected, oldSelected) {
      if(newSelected) {
        this.clearFields("movie")
        this.clearFields("actor")
        this.searchGenre = newSelected.id;
      }
    },
  }
};
</script>

<template>

    <v-row no-gutters justify="start">

      <v-col cols="4">
        <v-sheet class="pa-1">

          <v-text-field
          label="Find movie name"
          variant="outlined"
          v-model="inputMovie"
          type="input"
          @keydown.enter="onEnterMovie"
        ></v-text-field>

        </v-sheet>
      </v-col>

      <v-col cols="4">
        <v-sheet class="pa-1">

          <v-autocomplete
            v-model="actorsSelected"
            :items="actorsItem"
            item-title="name"
            item-value="id"
            label="Find movie by actor"
            :menu-props='{ maxHeight: 200}'
            variant="outlined"
            return-object
          ></v-autocomplete>

        </v-sheet>
      </v-col>

      <v-col cols="4">
        <v-sheet class="pa-1">

          <v-autocomplete
            v-model="genresSelected"
            :items="genresItem"
            item-title="genre"
            item-value="id"
            label="Find movie by genre"
            :menu-props='{ maxHeight: 200}'
            variant="outlined"
            return-object
          ></v-autocomplete>

        </v-sheet>
      </v-col>
      
    </v-row>

    <v-row no-gutters justify="start">

        <v-col v-for="movieItem in movies" :key="movieItem.id">
          <v-sheet class="pa-1">
            <v-card min-width="300" max-width="400">

              <v-card-item>
                <v-card-title>{{ movieItem.name }}</v-card-title>
              </v-card-item>

              <v-card-text>
                {{ movieItem.synopsis }}
              </v-card-text>

            </v-card>
          </v-sheet>
        </v-col>

        <v-col v-for="movieItem in moviesByActor" :key="movieItem.id">
          <v-sheet class="pa-1">
            <v-card min-width="300" max-width="400">

              <v-card-item>
                <v-card-title>{{ movieItem.name }}</v-card-title>
              </v-card-item>

              <v-card-text>
                {{ movieItem.synopsis }}
              </v-card-text>
              <v-card-text>
                <p>Actors:</p>
                <span v-for="(actor_item, index) in movieItem.actors" :key="index">{{ actor_item.firstName }} {{ actor_item.lastName }}<template v-if="index < movieItem.actors.length - 1">, </template> </span>
              </v-card-text>

            </v-card>
          </v-sheet>
        </v-col>

        <v-col v-for="movieItem in moviesByGenre" :key="movieItem.id">
          <v-sheet class="pa-1">
            <v-card min-width="300" max-width="400">

              <v-card-item>
                <v-card-title>{{ movieItem.name }}</v-card-title>
                <v-card-subtitle>Genre: <span v-for="(genre_item, index) in movieItem.genres" :key="index">{{ genre_item.genre }}<template v-if="index < movieItem.genres.length - 1">, </template> </span></v-card-subtitle>
              </v-card-item>

              <v-card-text>
                {{ movieItem.synopsis }}
              </v-card-text>

            </v-card>
          </v-sheet>
        </v-col>

    </v-row>
    
</template>

<style scoped>

</style>