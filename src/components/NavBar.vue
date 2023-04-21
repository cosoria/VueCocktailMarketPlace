<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Cocktails Marketplace</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink :to="{name: 'home'}" class="nav-link">Home</RouterLink>
            <!-- <a class="nav-link active" href="/"
              >Home
              <span class="visually-hidden">(current)</span>
            </a> -->
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'catalog'}" class="nav-link">Catalog</RouterLink>
          </li>
          <li class="nav-item" v-if="userStore.isAuthenticated">
            <RouterLink :to="{name: 'inventory'}" class="nav-link">Inventory</RouterLink>
          </li>
          <li class="nav-item" v-if="!userStore.isAuthenticated">
            <RouterLink :to="{name: 'cart'}" class="nav-link">Shopping Cart</RouterLink>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >Dropdown</a
            >
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Separated link</a>
            </div>
          </li> -->
        </ul>
        <form class="d-flex">
          <input class="form-control me-sm-2" type="search" placeholder="Search" />
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          <span v-if="userStore.isAuthenticated" class="text-white m-2">{{ userStore.getUser.email }}</span>
          <button v-if="!userStore.isAuthenticated" class="btn btn-secondary m-2 my-sm-0" type="submit" @click.prevent="loginClicked">Login</button>
          <button v-if="!userStore.isAuthenticated" class="btn btn-secondary m-2 my-sm-0" type="submit" @click.prevent="registerClicked">Register</button>
          <button v-if="userStore.isAuthenticated" class="btn btn-secondary m-2 my-sm-0" type="submit" @click.prevent="logoutClicked">Logout</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
  import { logout } from '../data/userRepository';
  import { mapStores } from 'pinia';
  import { useUserStore } from '../stores/userStore';
  import { RouterLink } from 'vue-router';  

  export default {
      name: "NavBar",
      props: {
        user: {
          type: Object,
          required: false,
          default: null
        }
      },
      computed: {
        ...mapStores(useUserStore)
      },
      methods: {
        loginClicked() {
          this.$router.push({name: "login"});
        },
        registerClicked() {
          this.$router.push({name: "register"});
        },
        logoutClicked() {
          logout().then(() => {
            this.userStore.logout();
            this.$router.push({name: "home"});
          }).catch((error) => {
            console.log(error)
          });
        },
      }
  }
</script>

<style scoped>
</style>
