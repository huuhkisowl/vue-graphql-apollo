<script>
import { SEARCH_MOVIE, SEARCH_ACTOR } from "../constants/queries";
export default {
  name: "Search",
  data() {
    return {
      movies: [],
      inputMovie: '',
      searchMovie: '',
      actors: [],
      inputActor: '',
      searchActor: '',
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
      actors: {
        query() {
          return SEARCH_ACTOR
        },
        variables () {
          return {
            term: this.searchActor
          }
        },
        skip () {
          return !this.searchActor
        },
        update: data => data.actor        
      }
  },
  methods: {
    onEnterMovie (event) {
      event.preventDefault()
      if(!this.inputMovie)
        this.movies = []
        
      this.clearFields("actor")
      this.searchMovie = this.inputMovie;
    },
    onEnterActor (event) {
      event.preventDefault()
      if(!this.inputActor)
        this.actors = []

      this.clearFields("movie")
      this.searchActor = this.inputActor;
    },
    clearFields(type) {
      switch(type) {
        case "movie":
          this.inputMovie = ''
          this.movies = []
          break;
        case "actor":
          this.inputActor = ''
          this.actors = []
          break;
      }
    }
  }
};
</script>

<template>

    <v-row no-gutters justify="start">

      <v-col cols="4">
        <v-sheet class="pa-1">

          <v-text-field
          label="Find movie name"
          variant="solo"
          v-model="inputMovie"
          type="input"
          @keydown.enter="onEnterMovie"
        ></v-text-field>

        </v-sheet>
      </v-col>

      <v-col cols="4">
        <v-sheet class="pa-1">

          <v-text-field
          label="Find actor"
          variant="solo"
          v-model="inputActor"
          type="input"
          @keydown.enter="onEnterActor"
        ></v-text-field>
        
        </v-sheet>
      </v-col>
      
    </v-row>

    <v-row no-gutters justify="start">

        <v-col v-for="movieItem in movies" :key="movieItem.id">
          <v-sheet class="pa-1">
            <v-card min-width="300" max-width="400">

              <v-card-item>
                <v-card-title>{{ movieItem.name }}</v-card-title>
                <v-card-subtitle>Genre: <span v-for="(genre_item, index) in movieItem.genres" :key="index">{{ genre_item.genre }}<template v-if="index < item.genres.length - 1">, </template> </span></v-card-subtitle>
              </v-card-item>

              <v-card-text>
                {{ movieItem.synopsis }}
              </v-card-text>

            </v-card>
          </v-sheet>
        </v-col>

        <v-col v-for="actorItem in actors" :key="actorItem.id">
          <v-sheet class="pa-1">
            <v-card min-width="300" max-width="400">

              <v-card-text>
                {{ actorItem.firstName }} {{ actorItem.lastName }}
              </v-card-text>

            </v-card>
          </v-sheet>
        </v-col>

    </v-row>
    
</template>