<template>
  <div v-if="registered" class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">You have been registered successfully</h1>
    <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" @click.prevent="loginUser()">
      Login
    </button>
  </div>
  <div v-else class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Please Register</h1>

    <label for="firstname" class="form-label mt-3">First name</label>
    <input v-model="firstname" type="text" class="form-control" id="firstname" required="" />
    <div class="invalid-feedback">Valid first name is required.</div>

    <label for="lastname" class="form-label  mt-3">Last Name</label>
    <input v-model="lastname" type="text" class="form-control" id="lastname" required="" />
    <div class="invalid-feedback">Valid last name is required.</div>

    <label for="email" class="form-label mt-3">Email</label>
    <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com" required="" />
    <div class="invalid-feedback">Valid email is required.</div>

    <label for="password" class="form-label mt-3">Password</label>
    <input v-model="password" type="password" class="form-control" id="password" required="" />
    <div class="invalid-feedback">Valid password is required.</div>
    
    <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" @click.prevent="registerUser()">
      Register
    </button>
  </div>
</template>

<script>
import { register, update } from '../data/userRepository'

export default {
  name: 'RegisterView',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      registered: false
    }
  },
  methods: {
    registerUser() {
      register(this.email, this.password)
        .then((auth) => {
          console.log(auth)
          update(this.firstname, this.lastname)
            .then(() => {
              console.log('User Profile Updated')
              // this.$router.push({name: "home"});
              this.registered = true
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loginUser() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 550px;
  padding: 15px;
}
</style>
