<template>
    <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor.png">
  </div>
    <!--Forma za signup i signup botun-->
   <!--Pomocu v-modela cemo bindati input i moći ćemo pohraniti te varijable i pristupiti im kroz kod.-->
  <form name="signup-form">
    <div class="mb-3">
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="input.email" />
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="input.password" />
    </div>
    <button class="btn btn-outline-dark" type="submit" @click.prevent="signup()">
      Signup
    </button>
    <p>Already have an account? <router-link to="/login" class="btn btn-outline-dark">Login</router-link></p>
    
    <!-- Test for printing email/password variables -->
    <!--<p>Email is: {{ input.email }}</p> -->
    <!--<p>Password is: {{ input.password }}</p> -->

    <!-- Display signup status message to the user -->
    <p v-if="signupStatusMessage">{{ signupStatusMessage }}</p>
  </form>
</template>

<script>
export default {
  name: 'SignupView',
  data() {
    return {
      input: {
        email: '',
        password: '',
      },
      signupStatusMessage: '', // To store the signup status message
    };
  },
  methods: {
    signup() {
      // Make sure both email and password are not empty
      if (this.input.email !== '' && this.input.password !== '') {
        console.log('registered');
        this.signupStatusMessage = ''; // Don't display the "registered" status to the user
      } else {
        console.log('Email and Password cannot be empty');
        this.signupStatusMessage = 'Email and Password cannot be empty'; // Error message displayed to the user
      }
    },
  },
};
</script>