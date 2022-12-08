<script>
import { GET_GENRES, GET_ACTORS, GET_DIRECTORS, CREATE_MOVIE } from "../constants/queries";
export default {
  name: "Create",
  data() {
    return {
      movie: {},
      genresItem: [],
      actorsItem: [],
      directorsItem: [],
      nameInput: '',
      yearInput: '',
      ageLimitInput: '',
      ratingInput: '',
      synopsisText: '',
      genresSelected: '',
      actorsSelected: '',
      directorSelected: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      synopsisRules: [
        v => !!v || 'Synopsis is required'
      ]
    };
  },
  apollo: {
    genresItem: {
        query() {
          return GET_GENRES
        },
        update: data => data.genres      
    },
    actorsItem: {
        query() {
          return GET_ACTORS
        },
        update: data => {
            const getActors = [];
            for(let i = 0; i < data.actors.length; i++) {
                getActors[i] = JSON.parse('{"name":"' + data.actors[i].firstName + ' '+data.actors[i].lastName+'", "id":"' + data.actors[i].id + '"}');
            }
            return getActors;
        }
    },
    directorsItem: {
        query() {
          return GET_DIRECTORS
        },
        update: data => {
            const getDirecors = [];
            for(let i = 0; i < data.directors.length; i++) {
                getDirecors[i] = JSON.parse('{"name":"' + data.directors[i].firstName + ' '+data.directors[i].lastName+'", "id":"' + data.directors[i].id + '"}');
            }
            return getDirecors;
        }
    },
    /*
    movie: {
        mutate() {
            return CREATE_MOVIE
        },
        variables () {
          return {
            name: this.nameInput,
            year: this.yearInput,
            ageLimit: this.ageLimitInput,
            rating: this.ratingInput,
            synopsis: this.synopsisText,
            genresIds: this.genresSelected,
            actorsIds: this.actorsSelected,
            directorId: this.directorSelected
          }
        },
        skip () {
          return !this.nameInput || !this.synopsisText
        },
        update: data => data.createMovie        
    }
    */
  },
  methods: {

  }
};
</script>

<template>

    <v-form ref="form">

        <v-text-field
            v-model="nameInput"
            :rules="nameRules"
            label="Name"
            required
            type="input"
        ></v-text-field>

        <v-text-field
            v-model="synopsisText"
            :rules="synopsisRules"
            label="Synopsis"
            required
            type="text"
        ></v-text-field>

        <v-text-field
            v-model="yearInput"
            label="Year"
            type="input"
        ></v-text-field>

        <v-text-field
            v-model="ageLimitInput"
            label="Age limit"
            type="input"
        ></v-text-field>

        <v-text-field
            v-model="ratingInput"
            label="Rating"
            type="input"
        ></v-text-field>

        <v-select
            v-model="genresSelected"
            :items="genresItem"
            item-title="genre"
            item-value="id"
            return-object
            label="Genres"
        ></v-select>

        <v-select
            v-model="actorsSelected"
            :items="actorsItem"
            item-title="name"
            item-value="id"
            return-object
            label="Actors"
        ></v-select>

        <v-select
            v-model="directorSelected"
            :items="directorsItem"
            item-title="name"
            item-value="id"
            return-object
            label="Director"
        ></v-select>

    </v-form>
    
</template>