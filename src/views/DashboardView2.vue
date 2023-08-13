<template>
  <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor_smaller.png">
  </div>
  
  <!-- ... (rest of your code) ... -->
  
  <!-- Add card botun -->
  <button class="btn btn-success btn-circle" @click="openAddCard"><i class="bi bi-plus"></i></button>

  <!-- AddCard komponenta nakon pritiska "Add Card" botuna -->
  <div v-if="showAddCard" class="add-card-overlay">
    <AddCard :stores="stores" @card-added="handleCardAdded" @close-modal="closeAddCard" />
  </div>
</template>

<script>
import AddCard from "@/components/AddCard.vue";
import axios from 'axios';

export default {
  components: {
    AddCard,
  },
  data() {
    return {
      showAddCard: false,
      cards: [],
      stores: ["Bauhaus", "Bipa", "DM", "Interspar", "Kaufland", "Konzum", "Lidl", "Muller", "Pevex", "Plodine", "Spar", "Zoocity"]
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
    async handleCardAdded(newCardData) {
  try {
      //Konvertanje expDate string u Date object js
    const [expMonth, expYear] = newCardData.expireDate.split('/');
    const expDate = new Date(parseInt(expYear), parseInt(expMonth) - 1);

    //Uvijek koristi http://localhost:3000/api/dio_iz router.post('/addcard', (req, res) ide nakon /api
    const response = await axios.post('http://localhost:3000/api/addcard', {
    //userId: this.loggedInUserId, //Dodat kasnije kad se sredi token
      userId: '64d7465eb61bb8386487fc0a',
      storeName: newCardData.selectedStore,
      cardNumber: newCardData.cardNumber,
      expDate: expDate,
    });

    if (response.status === 201) {
      const newCard = {
        name: newCardData.selectedStore + ' Card',
        cardNumber: newCardData.cardNumber,
        expireDate: newCardData.expireDate,
        logo: this.getLogoPath(newCardData.selectedStore),
        expanded: false,
      };

      this.cards.push(newCard);
      this.showAddCard = false;
    } else {
      console.error('Failed to add card. Response:', response);
    }
  } catch (error) {
    console.error('Error adding card:', error);
  }
},
    getLogoPath(store) {
      return require(`@/assets/CardLogos/${store.toLowerCase()}.png`);
    },
  }
};
</script>

<style scoped>
/* Your CSS styles here */
</style>