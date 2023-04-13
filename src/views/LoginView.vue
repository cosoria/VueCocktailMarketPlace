<template>
  <div class="form-signin w-100 m-auto">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <h3 class="h4 mb-3 fw-normal">{{ error }}</h3>
      <div class="form-floating">
        <input v-model="email" type="email" class="form-control"  id="floatingInput" placeholder="name@example.com"        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="checkbox mb-3 mt-5">
        <label><input type="checkbox" value="remember-me" /> Remember me </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="loginUser()">Sign in</button>
  </div>
</template>

<script>
    import { login } from '../data/userRepository';

    export default {
    name: 'LoginView',
    data() {
        return {
            email: "",
            password: "",
            error: ""
        };
    },
    methods: {
        loginUser() {
            if(this.email && this.password) {
                console.log("Login User");
                login(this.email, this.password).then((auth) => {
                    console.log(auth);
                    this.$router.push({name: "home"});
                }).catch((error) => {
                    console.log(error);
                    this.error = "Invalid email or password";
                });
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
