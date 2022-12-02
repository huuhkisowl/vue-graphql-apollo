
<script>
import { GET_MOVIES } from "../constants/queries";
export default {
  name: "Home",
  data() {
    return {
      movies: []
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
  <div class="container">
    <div class="card">
      <div class="row mt-1">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Movie name</th>
              <th scope="col">Rating</th>
              <th scope="col">Year</th>
              <th scope="col">Synopsis</th>
              <th scope="col">Director</th>
              <th scope="col">Actors</th>
              <th scope="col">Genres</th>
              <th scope="col">AgeLimit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in movies" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.rating }}</td>
              <td>{{ item.year }}</td>
              <td>{{ item.synopsis }}</td>
              <td>{{ item.director.firstName }} {{ item.director.lastName }}</td>
              <td><span v-for="actor_item in item.actors" :key="actor_item.id">{{ actor_item.firstName }} {{ actor_item.lastName }}, </span></td>
              <td><span v-for="genre_item in item.genres" :key="genre_item.id">{{ genre_item.genre }}, </span></td>
              <td>{{ item.ageLimit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>