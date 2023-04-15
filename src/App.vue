<template>
  <div class="container">
    <NavBar :user="userStore.getUser"></NavBar>
    <RouterView />
    <AppFooter></AppFooter>
  </div>
  
</template>

<script>
import { RouterView } from 'vue-router';
import NavBar from "./components/NavBar.vue";
import AppFooter from "./components/AppFooter.vue";
import { mapStores } from 'pinia';
import { useUserStore } from './stores/userStore';

export default {
  name: "App",
  components: {
    RouterView,
    NavBar,
    AppFooter
  },
  computed: {
    ...mapStores(useUserStore)
  },
  mounted() {
    console.log("App:", this.userStore.isAuthenticated);
  }
}
</script>

<style scoped>
</style>
