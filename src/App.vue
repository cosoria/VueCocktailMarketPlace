<template>
  <div class="container">
    <NavBar></NavBar>
    <RouterView />
    <AppFooter></AppFooter>
  </div>
  
</template>

<script>
import { RouterView } from 'vue-router';
import NavBar from "./components/NavBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    RouterView,
    NavBar,
    AppFooter
  }
}
</script>

<style scoped>
</style>
