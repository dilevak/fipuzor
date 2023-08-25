<template>
    <form name="signup-form">
      <div class="mb-3">
        <label for="username">Username: </label>
        <input type="text" id="username" v-model="input.username" />
      </div>
      <div class="mb-3">
        <label for="email">Email: </label>
        <input type="email" id="email" v-model="input.email" />
      </div>
      <div class="mb-3">
        <label for="password">Password: </label>
        <input type="password" id="password" v-model="input.password" />
      </div>
      <button class="btn btn-outline-success" type="submit" @click.prevent="signup()">
        Signup
      </button>
      <p>Already have an account? <router-link to="/login" class="btn btn-primary">Login</router-link></p>
      
      <p v-if="signupStatusMessage">{{ signupStatusMessage }}</p>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SignUpForm',
    data() {
      return {
        input: {
          username: '',
          email: '',
          password: '',
        },
        signupStatusMessage: '',
      };
    },
    methods: {
      async signup() {
        try {
          if (this.input.username !== '' && this.input.email !== '' && this.input.password !== '') {
            const response = await axios.post('https://peaceful-savannah-87884-a889c5914717.herokuapp.com/api/signup', {
              username: this.input.username,
              email: this.input.email,
              password: this.input.password,
            });
  
            if (response.data.success) {
              console.log('User registered');
              this.signupStatusMessage = 'User registered';
  
              //Ako je signup uspjesan prebaci na login
              this.$router.push('/login');
            } else {
              console.log('Registration failed');
              this.signupStatusMessage = 'Registration failed';
            }
          } else {
            console.log('Username, Email, and Password cannot be empty');
            this.signupStatusMessage = 'Username, Email, and Password cannot be empty';
          }
        } catch (error) {
          console.error('An error occurred:', error);
          this.signupStatusMessage = 'An error occurred';
        }
      },
    },
  };
  </script>  
