<script>
export default {
  name: "App",
  data(){
    return {
      menuItems: [
          { title: 'Home', path: '/' },
          { title: 'Search', path: '/search' },
          { title: 'Create movie', path: '/create' }
     ]
    }
  },
};

</script>

<template>

  <v-container justify="center">
    <v-app>
    <v-toolbar app>
      <v-toolbar-items>
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-divider class="mb-2"></v-divider>

    <v-content>
      <router-view></router-view>
    </v-content>

    </v-app>

  </v-container>
  

</template>

<style scoped>

</style>
