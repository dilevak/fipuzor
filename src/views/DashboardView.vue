<template>
  <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor_smaller.png">
  </div>
  <div>
    <h2>Welcome to Fipuzor Card Dashboard</h2>

    <!-- Informacije o karticama -->
    <div class="card-container">
      <div v-for="(card, index) in cards" :key="index" class="loyalty-card">
        <img :src="card.logo" alt="Card Logo" class="card-logo">
        <h3>{{ card.name }} Card</h3>
        <p>Card Number: {{ card.cardNumber }}</p>
        <p>Expire Date: {{ card.expireDate }}</p>
        <!-- Add more loyalty card information here -->
      </div>
    </div>

    <!-- Test botun za dodavanje kartica -->
    <button class="btn btn-success btn-circle" @click="addCard"><i class="bi bi-plus"></i></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          name: "Lidl",
          cardNumber: "1234-5678-9012",
          expireDate: "12/25",
          logo: "../assets/fipuzor_logo.png", //Path prema folderu s "defaultnim" logo-ima trgovina
        },
        {
          name: "Pevex",
          cardNumber: "9012-8765-1243",
          expireDate: "05/24",
          logo: "../assets/fipuzor_logo.png", //Path prema folderu s "defaultnim" logo-ima trgovina
        },
        //Dodaj jos testnih kartica za pregled izgleda
      ],
    };
  },
  methods: {
    addCard() {
      // Add card komponenta
    },
  },
};
</script>

<!-- Dizajn ya prikay kartica -->
<style scoped>
.card-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 1rem;
}

.loyalty-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-right: 1rem;
  width: 300px;
  flex-shrink: 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.card-logo {
  max-width: 100px;
  height: auto;
  margin-bottom: 1rem;
}
</style>