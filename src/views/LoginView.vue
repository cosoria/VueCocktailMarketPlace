<template>
  <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <h3 class="h4 mb-3 fw-normal">{{ error }}</h3>

    <label for="email" class="form-label mt-3">Email</label>
    <input
      v-model="email"
      type="email"
      class="form-control"
      id="email"
      placeholder="name@example.com"
      required=""
    />
    <div class="invalid-feedback">Valid email is required.</div>

    <label for="password" class="form-label mt-3">Password</label>
    <input v-model="password" type="password" class="form-control" id="password" required="" />
    <div class="invalid-feedback">Valid password is required.</div>

    <div class="form-check mt-3">
      <input type="checkbox" class="form-check-input" id="save-info" />
      <label class="form-check-label" for="save-info"> Remember me</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" @click.prevent="loginUser()">
      Sign in
    </button>
  </div>
</template>

<script>
import { login } from '../data/userRepository'
import { mapStores } from 'pinia'
import { useUserStore } from '../stores/userStore'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    loginUser() {
      if (this.email && this.password) {
        console.log('Login User')
        login(this.email, this.password)
          .then((auth) => {
            console.log(auth)
            this.userStore.login(auth.uid, auth.email, auth.displayName)
            console.log('Login: ', this.userStore.getUser)
            this.$router.push({ name: 'home' })
          })
          .catch((error) => {
            console.log(error)
            this.error = 'Invalid email or password'
          })
      }
    }
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}
</style>
