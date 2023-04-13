<template>
    <div v-if="registered" class="form-signin w-100 m-auto">
        <h1 class="h3 mb-3 fw-normal">You have been registered successfully</h1>
        <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" @click.prevent="loginUser()">Login</button>
    </div>
    <div v-else class="form-signin w-100 m-auto">
        
      <h1 class="h3 mb-3 fw-normal">Please Register</h1>

      <div class="form-floating">
        <input v-model="firstname" type="firstname" class="form-control"  id="floatingInput" placeholder="" />
        <label for="floatingInput">First Name</label>
      </div>

      <div class="form-floating">
        <input v-model="lastname" type="lastname" class="form-control"  id="floatingInput" placeholder="" />
        <label for="floatingInput">Last Name</label>
      </div>

      <div class="form-floating">
        <input v-model="email" type="email" class="form-control"  id="floatingInput" placeholder="name@example.com"        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      
      <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" @click.prevent="registerUser()">Register</button>
  </div>
</template>

<script>
    import { register, update } from '../data/userRepository';

    export default {
        name: "RegisterView",
        data() {
            return {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                registered: false
            };
        }, 
        methods: {
            registerUser() {
                register(this.email, this.password).then((auth) => {
                    console.log(auth);
                    update(this.firstname, this.lastname)
                    .then(() => {
                        console.log("User Profile Updated");
                        // this.$router.push({name: "home"});
                        this.registered = true;
                    })
                    .catch(error => console.log(error))
                }).catch((error) => {
                    console.log(error);
                })
            },
            loginUser() {
                this.$router.push({name: "login"});
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