<template>
  <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor.png">
  </div>
  
  <div class="button-container">
  <router-link to="/Login" class="big-button login-button">Login</router-link>
  <router-link to="/Signup" class="big-button signup-button">Signup</router-link>
  </div>

</template>



<script>

</script>

<style>
/* Custom styleovi za divove*/
.button-container {
  display: flex;
  justify-content: center; /*Centriraj horizontalno*/
  margin-top: 20px;
}

.home {
  display: flex;
  justify-content: center; /*Centriraj horizontalno*/
  margin-top: 20px;
}

.big-button {
  display: inline-block;
  padding: 15px 40px;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px; /* Adjust this value to control the spacing between buttons */
}

/* Styling for Login button */
.login-button {
  background-color: #007bff;
}

/* Styling for Signup button */
.signup-button {
  background-color: #28a745;
}
</style>





