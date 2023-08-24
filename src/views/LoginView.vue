<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>

<template>
  <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor.png">
  </div>
  <!-- Forma za login i login botun -->
  <!-- Pomocu v-modela cemo bindati input i moći ćemo pohraniti te varijable i pristupiti im kroz kod. -->
  <form name="login-form">
    <div class="mb-3">
      <label for="username">Username: </label>
      <input type="text" id="username" v-model="input.username" />
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="input.password" />
    </div>
    <button class="btn btn-primary" type="submit" @click.prevent="login">Login</button>

    <p>Don't have an account yet? <router-link to="/Signup" class="btn btn-success" exact>Signup</router-link></p>
    
    <!-- Prikaz login status poruke korisniku -->
    <p v-if="loginStatusMessage">{{ loginStatusMessage }}</p>
  </form>
</template>


<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { mapMutations } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
      loginStatusMessage: '', // Za spremanje login status poruke
    };
  },
  methods: {
    ...mapMutations(['setUserID', 'addCard', 'setIsAuthenticated']),
    async login() {
      try {
        const response = await axios.post('https://peaceful-savannah-87884-a889c5914717.herokuapp.com/api/login',
          {
          username: this.input.username,
          password: this.input.password,
          },
          {
          withCredentials: true,
          }
          );


        if (response.data.success) {
          this.setIsAuthenticated(true);
          this.loginStatusMessage = `Login successful!`;
          this.loggedInUsername = this.input.username;
          Cookies.set('loggedInUsername', this.loggedInUsername);
          this.setUserID(response.data.userID); // Store the user ID in Vuex
          console.log('UserID from response:', response.data.userID);
          Cookies.set('userID', response.data.userID);
          console.log('UserID cookie set:', Cookies.get('userID'));
          this.$router.push('/dashboard');
        } else {
          //Login failed, show error message
          this.loginStatusMessage = 'Login failed';
        }

      } catch (error) {
        this.loginStatusMessage = 'An error occurred';
        console.error('An error occurred:', error);
      }
    },
  },
};
</script>
