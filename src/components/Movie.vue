
<script>
import { GET_MOVIES } from "../constants/queries";
export default {
  name: "Movie",
  data() {
    return {
      movies: [],
      loading: 0
    };
  },
  apollo: {
    movies: {
        query: GET_MOVIES
      }
  }
};
</script>

<template>
  <h4 v-if="loading">Loading...</h4>
  <v-row no-gutters justify="start">
    <v-col v-for="item in movies" :key="item.id">
      <v-sheet class="pa-1">

        <v-card min-width="300" max-width="400">

          <v-card-item>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>Director: {{ item.director?.firstName }} {{ item.director?.lastName }}</v-card-subtitle>
            <v-card-subtitle>Rating: {{ item.rating }}</v-card-subtitle>
            <v-card-subtitle>Age limit: {{ item.ageLimit }}</v-card-subtitle>
            <v-card-subtitle>Year: {{ item.year }}</v-card-subtitle>
            <v-card-subtitle>Genre: <span v-for="(genre_item, index) in item.genres" :key="index">{{ genre_item.genre }}<template v-if="index < item.genres.length - 1">, </template> </span></v-card-subtitle>
          </v-card-item>

          <v-card-text>
            {{ item.synopsis }}
          </v-card-text>
          <v-card-text>
            <p>Actors:</p>
            <span v-for="(actor_item, index) in item.actors" :key="index">{{ actor_item.firstName }} {{ actor_item.lastName }}<template v-if="index < item.actors.length - 1">, </template> </span>
          </v-card-text>

          </v-card>

      </v-sheet>
    </v-col>
  </v-row>

</template>

<style scoped>

</style>