<template>
    <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor.png">
  </div>
  <!--Forma za login i login botun-->
  <!--Pomocu v-modela cemo bindati input i moći ćemo pohraniti te varijable i pristupiti im kroz kod.-->
  <form name="login-form">
    <div class="mb-3">
      <label for="username">Username: </label>
      <input type="text" id="username" v-model="input.username" />
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="input.password" />
    </div>
    <button class="btn btn-outline-dark" type="submit" @click.prevent="login()">
      Login
    </button>

    <p>Don't have an account yet? <router-link to="/Signup" class="btn btn-outline-dark" exact>Signup</router-link></p>
    
    <!-- Prikaz login status poruke korisniku -->
    <p v-if="loginStatusMessage">{{ loginStatusMessage }}</p>
  </form>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
      loginStatusMessage: '', //Za spremanje login status poruke
    };
  },
  methods: {
    login() {
      // Make sure both username and password are not empty
      if (this.input.username !== '' && this.input.password !== '') {
        console.log('authenticated');
        this.loginStatusMessage = ''; //Ne prikazivanje "authenticated" statusa useru
      } else {
        console.log('Username and Password cannot be empty');
        this.loginStatusMessage = 'Username and Password cannot be empty'; // Greska koja se ispisuje korisniku
      }
    },
  },
};
</script>
