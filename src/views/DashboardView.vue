<template>
      <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor_smaller.png">
  </div>
    <div>
      <h2>Welcome to Fipuzor Card Dashboard</h2>
  
      <!-- Informacije o karticama -->
      <div>
        <h3>Fipuzor Card Information</h3>
        <p>Card Number: {{ cardNumber }}</p>
        <p>Points: {{ points }}</p>
        <!-- Add more loyalty card information here -->
      </div>
  
      <!-- Test botun za dodavanje kartica -->
      <button class="btn btn-success" @click="addCard">Add Card</button>
  
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cardNumber: "1234-5678-9012", //Testni prikaz kartice
        points: 500 //Testni prikaz bodova
      };
    },
    methods: {
      addCard() {
        //Dodavanje kartice
        //Otvaranje "add card" view-a?
      }
    }
  };
  </script>
  