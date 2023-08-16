<template>
  <div class="home">
  <img alt="Fipuzor Logo" src="../assets/logo_fipuzor_smaller.png">
  </div>
  
 <h2>Hello {{ loggedInUsername }}, Welcome to Fipuzor dashboard</h2>
  
<!-- Hamburger menu button -->
<div class="hamburger-menu" @click="toggleMenu">
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
  </div>
<!-- Dropdown menu -->
<div v-show="showMenu" class="dropdown-menu">
<ul>
<li @click="logout">Logout</li>
<li>About</li>
</ul>
</div>

  <!-- Kontenjer za prikaz kartice - @click event -->
  <div class="card-container-wrapper">
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
      <div class="added-cards-text-square">Added Cards</div>
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
import axios from 'axios';
import Cookies from 'js-cookie';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userID', 'cards']),
  },

  components: {
    AddCard,
  },
  data() {
    return {
      showAddCard: false,
      cards: [],
      loggedInUsername: '',
      userID: '', //Storanje userID-a
      showMenu: false,
    };
  },
  created() {
    // Dohvacanje username-a iz browser cookija
    this.loggedInUsername = Cookies.get('loggedInUsername');
    this.userID = Cookies.get('userID');
    this.fetchUserCards();
  },
  methods: {
  
    async fetchUserCards() {
      try {
        console.log('Fetching user cards for userID:', this.userID); //Test linija
        const response = await axios.get('http://localhost:3000/api/cards/' + this.userID);
        if (response.data.success) {
        this.cards = response.data.cards;
        } else {
        // Handle error
        }
        } catch (error) {
        // Handle error
        }
    },

  async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: this.input.username,
          password: this.input.password,
        });

        if (response.data.success) {
          // Login successful, update the username and redirect to dashboard
          this.loginStatusMessage = 'Login successful';
          this.loggedInUsername = this.input.username; // Store the username
          this.$router.push('/dashboard');
        } else {
          // Login failed, show error message
          this.loginStatusMessage = 'Login failed';
        }
      } catch (error) {
        // Handle error, e.g., show error message
        this.loginStatusMessage = 'An error occurred';
        console.error('An error occurred:', error);
      }
    },
  

    openAddCard() {
      this.showAddCard = true;
    },

    closeAddCard() {
      console.log("Closing add card modal");
      this.showAddCard = false;
    },

    toggleCardExpansion(card) {
      card.expanded = !card.expanded;
    },

    handleCardAdded(newCardData) {
    const newCard = {
      userID: this.userID,
      name: newCardData.selectedStore + " Card", //Ime odabranog stora (from event data)  + Card
      cardNumber: newCardData.cardNumber,
      expireDate: newCardData.expireDate,
      logo: this.getLogoPath(newCardData.selectedStore), //ime odobranog stora (from event data) za postavljanje loga automatski
      expanded: false,
    };
      axios.post('http://localhost:3000/api/cards', newCard)
  .then(response => {
    if (response.data.success) {
      this.cards.push(newCard); // Add the new card to the local array
      console.log('Card added successfully:', response.data.message);
    } else {
      console.log('Failed to add card:', response.data.message);
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

      //Dodaj novu karticu u array
      this.cards.push(newCard);

      //Zatvori nakon dodavanja kartice
      this.showAddCard = false;
    },
    //Funkcija za dobivanje patha prema logu nakon odabranog stora
    getLogoPath(store) {
      return require(`@/assets/CardLogos/${store.toLowerCase()}.png`);
    },
    //Menu
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    //Logout i redirect na pocetnu/login, clear cookies??
    logout() {
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

.card-container-wrapper {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.add-card-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /*Postavljanje iznad svega*/
}
.card-container {
  display: flex; 
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 6rem 1rem;;
  border: 2px solid #0da540;
  border-radius: 8px;
  padding: 1rem;
  flex-grow: 1;
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

.added-cards-text-square {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #199a24;
  color: #fff;
  padding: 0.5rem 1rem;
  border-top-left-radius: 8px;
  font-weight: bold;
  z-index: 1;
}

/*Hamburger meni stil*/
.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
  margin: 1rem;
}

.bar {
  width: 30px;
  height: 4px;
  background-color: #333;
}

/*Dropdown menu stil*/
.dropdown-menu {
  position: absolute;
  top: 60px; /*Podesavanje top pozicije*/
  left: 20px; /*Podesavanje left pozicije*/
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;
  display: none;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f8f9fa;
}
</style>