<script>
import { GET_GENRES, GET_ACTORS, GET_DIRECTORS, CREATE_MOVIE } from "../constants/queries";
import { useMutation } from '@vue/apollo-composable'

export default {
  name: "Create",
  data() {
    return {
      movie: {},
      newMovie: {},
      genresItem: [],
      actorsItem: [],
      directorsItem: [],
      nameInput: '',
      yearInput: '',
      ageLimitInput: '',
      ratingInput: '',
      synopsisText: '',
      genresSelected: '',
      genresInput: [],
      actorsSelected: '',
      actorsInput: [],
      directorSelected: '',
      directorInput: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      synopsisRules: [
        v => !!v || 'Synopsis is required'
      ],
      formSubmitted: false
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
    directorsItem: {
        query() {
          return GET_DIRECTORS
        },
        update: data => {
            const getDirecors = []
            data.directors.map((director_item, index) => {
              let newObj = new Object();
              newObj.name = `${director_item.firstName} ${director_item.lastName}`
              newObj.id = director_item.id
              getDirecors[index] = newObj
            })
            return getDirecors;
        }
    }
  },
  methods: {
    createMovie() {
      this.$apollo.mutate({
        mutation: CREATE_MOVIE,
        variables: {
          name: this.nameInput,
          year: this.yearInput,
          ageLimit: this.ageLimitInput,
          rating: this.ratingInput,
          synopsis: this.synopsisText,
          genresIds: this.genresInput,
          actorsIds: this.actorsInput,
          directorId: this.directorInput
        },
        update: (cache, result) => {
          this.formSubmitted = true
          this.newMovie = result.data.createMovie
        }
      })
    }
  },
  watch: {
    actorsSelected(newSelected, oldSelected) {
      if(newSelected) {
        const getActors = []
        getActors[0] = newSelected.id
        this.actorsInput = getActors;
      }
    },
    genresSelected(newSelected, oldSelected) {
      if(newSelected) {
        const getGenres = []
        getGenres[0] = newSelected.id
        this.genresInput = getGenres;
      }
    },
    directorSelected(newSelected, oldSelected) {
      if(newSelected) {
        this.directorInput = newSelected.id;
      }
    },
  }
};
</script>

<template>

    <v-form ref="form" v-if="!formSubmitted">

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

        <v-autocomplete
            v-model="genresSelected"
            :items="genresItem"
            item-title="genre"
            item-value="id"
            label="Genres"
            return-object
            :menu-props='{ maxHeight: 200}'
        ></v-autocomplete>

        <v-autocomplete
            v-model="actorsSelected"
            :items="actorsItem"
            item-title="name"
            item-value="id"
            label="Actors"
            return-object
            :menu-props='{ maxHeight: 200}'
        ></v-autocomplete>

        <v-autocomplete
            v-model="directorSelected"
            :items="directorsItem"
            item-title="name"
            item-value="id"
            label="Director"
            return-object
            :menu-props='{ maxHeight: 200}'
        ></v-autocomplete>

        <v-btn @click="createMovie()">Create movie</v-btn>

    </v-form>

    <div v-if="formSubmitted">
      <h3>Movie created</h3>
      <v-row no-gutters justify="start">
        <v-col>
          <v-sheet class="pa-1">

            <v-card min-width="300" max-width="400">

              <v-card-item>
                <v-card-title>{{ newMovie.name }}</v-card-title>
                <v-card-subtitle>Director: {{ newMovie.director?.firstName }} {{ newMovie.director?.lastName }}</v-card-subtitle>
                <v-card-subtitle>Rating: {{ newMovie.rating }}</v-card-subtitle>
                <v-card-subtitle>Age limit: {{ newMovie.ageLimit }}</v-card-subtitle>
                <v-card-subtitle>Year: {{ newMovie.year }}</v-card-subtitle>
                <v-card-subtitle>Genre: <span v-for="(genre_item, index) in newMovie.genres" :key="index">{{ genre_item.genre }}<template v-if="index < newMovie.genres.length - 1">, </template> </span></v-card-subtitle>
              </v-card-item>

              <v-card-text>
                {{ newMovie.synopsis }}
              </v-card-text>
              <v-card-text>
                <p>Actors:</p>
                <span v-for="(actor_item, index) in newMovie.actors" :key="index">{{ actor_item.firstName }} {{ actor_item.lastName }}<template v-if="index < newMovie.actors.length - 1">, </template> </span>
              </v-card-text>

              </v-card>

          </v-sheet>
        </v-col>
      </v-row>
    </div>
    
</template>

<style scoped>

</style>