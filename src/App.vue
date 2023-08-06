<template>
   <!-- <h1>Welcome to</h1>-->
  <img alt="Vue logo" src="./assets/logo_fipuzor.png">
  <div id="app">
    <!-- Your other content here -->
    <home-page></home-page> <!-- Add the home-page component -->
  </div>
  <LoginView/>
  <SignupView/>
</template>

<script>
import LoginView from './components/LoginView.vue'


export default {
  name: 'App',
  components: {
    LoginView,
    
  },
  // ... other options and logic
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #4f9d5d;

}
</style>
