<template>
  <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor_smaller.png">
  </div>
  <div>
    <h2>Welcome to Fipuzor Card Dashboard</h2>

      <!--Kontenjer za prikaz kartice - @click event-->
    <div class="card-container">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="{ 'loyalty-card': true, 'expanded': card.expanded }"
        @click="toggleCardExpansion(card)"
        >
        <img :src="card.logo" alt="Card Logo" class="card-logo">
        <h3>{{ card.name }} Card</h3>
        <p>Card Number: {{ card.cardNumber }}</p>
        <p>Expire Date: {{ card.expireDate }}</p>
      </div>
    </div>

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
          logo: "/CardLogos/lidl.jpg",
          expanded: false,
        },
        {
          name: "Pevex",
          cardNumber: "9012-8765-1243",
          expireDate: "05/24",
          logo: "/CardLogos/pevex.png",
          expanded: false,
        },
        //Dodaj jos kartica za test prikaza
      ],
    };
  },
  methods: {
    addCard() {
      // Add card komponenta
    },
    //toggle na klik (@click eventom), card.expanded se mjenja klikanjem (pomocu ! operatora) 
    toggleCardExpansion(card) {
      card.expanded = !card.expanded;
    },
  },
};
</script>

<!--.cards-container kontenjer za storanje kartica-->
<!--Display:flex poslozi kartice u red, overflow-x: auto skrolanje preko sirine kontenjera-->
<!--.loyalty-card kontenjer za jednu karticu (cursor: pointer mjenja kursor kod hoveranja iznad kartice)-->
<!--.loyalty-card.ecpanded stajling kartice nakon expanda-->
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
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.loyalty-card.expanded {
  width: 500px;
}

.card-logo {
  max-width: 100px;
  height: auto;
  margin-bottom: 1rem;
}

</style>
