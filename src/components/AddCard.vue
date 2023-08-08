<template>
    <div>
      <h3>Add New Card</h3>
      <form @submit.prevent="submitForm">
        <label for="newCardNumber">Card Number:</label>
        <input v-model="newCardNumber" id="newCardNumber" type="text" required>
        <button type="submit">Add Card</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newCardNumber: "",
      };
    },
    methods: {
      submitForm() {
        // Validate and process the new card number
        // Update the cardNumber and points data in the parent component
        this.$emit("card-added", this.newCardNumber);
        this.newCardNumber = ""; // Reset input
      },
    },
  };
  </script>
  