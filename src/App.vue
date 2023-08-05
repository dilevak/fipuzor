<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id="app">
    <!-- Your other content here -->
    <home-page></home-page> <!-- Add the home-page component -->
  </div>
</template>

<script>
import HomePage from './components/home-page.vue'; // Adjust the path as needed

export default {
  name: 'App',
  components: {
    HomePage, // Register the home-page component
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
}
</style>
