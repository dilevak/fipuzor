<template>
  <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor_smaller.png">
  </div>
  
  <h2>Welcome to Fipuzor Card Dashboard</h2>
  
  <!-- Kontenjer za prikaz kartice - @click event -->
  <div class="card-container">
    <div
      v-for="(card, index) in cards"
      :key="index"
      :class="{ 'loyalty-card': true, 'expanded': card.expanded }"
      @click="toggleCardExpansion(card)"
    >
      <img :src="card.logo" alt="Card Logo" class="card-logo">
      <h3>{{ card.name }}</h3>
      <p>Card Number: {{ card.cardNumber }}</p>
      <p>Expire Date: {{ card.expireDate }}</p>
    </div>
    <!-- Ako nema dodanih kartica prikazi ovo -->
    <div v-if="cards.length === 0" class="empty-card">
      No cards added yet.
    </div>
  </div>

  <!-- Add card botun -->
  <button class="btn btn-success btn-circle" @click="openAddCard"><i class="bi bi-plus"></i></button>

  <!-- AddCard komponenta nakon pritiska "Add Card" botuna -->
  <div v-if="showAddCard" class="add-card-overlay">
    <AddCard @card-added="handleCardAdded" @close-modal="closeAddCard" />
  </div>
</template>

<script>
import AddCard from "@/components/AddCard.vue"; // Importanje AddCard komponente

export default {
  components: {
    AddCard,
  },
  data() {
    return {
      showAddCard: false,
      cards: [],
      
    };
  },
  methods: {
    

    openAddCard() {
      this.showAddCard = true;
    },

    closeAddCard() {
      this.showAddCard = false;
    },

    toggleCardExpansion(card) {
      card.expanded = !card.expanded;
    },

    handleCardAdded(newCardData) {
    const newCard = {
      name: newCardData.selectedStore + " Card", //Ime odabranog stora (from event data)  + Card
      cardNumber: newCardData.cardNumber,
      expireDate: newCardData.expireDate,
      logo: this.getLogoPath(newCardData.selectedStore), //ime odobranog stora (from event data) za postavljanje loga automatski
      expanded: false,
    };
      //Dodaj novu karticu u array
      this.cards.push(newCard);

      //Zatvori nakon dodavanja kartice
      this.showAddCard = false;
    },
    //Funkcija za dobivanje patha prema logu nakon odabranog stora
    getLogoPath(store) {
      return require(`@/assets/CardLogos/${store.toLowerCase()}.png`);
    },
  },
};
</script>

<!--.cards-container kontenjer za storanje kartica-->
<!--.add-card-overlay style ya prikay add card metode nakon pritiska na gumb-->
<!--Display:flex poslozi kartice u red, overflow-x: auto skrolanje preko sirine kontenjera-->
<!--.loyalty-card kontenjer za jednu karticu (cursor: pointer mjenja kursor kod hoveranja iznad kartice)-->
<!--.loyalty-card.ecpanded stajling kartice nakon expanda-->
<style scoped>
.add-card-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Place above other content */
}
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

.empty-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-right: 1rem;
  width: 300px;
  flex-shrink: 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #6c757d;
}
</style>