<template>
    
  <Slide
    :closeOnNavigation="true"
    :noOverlay="true">
    
    <h2>Hello {{ loggedInUsername }}</h2>
    <router-link to="/about">
      <ul class="menu-list">
        <li>About</li>
      </ul>
    </router-link>
    <a id="Logout" href="#">
      <ul class="menu-list">
        <li @click="logout">Logout</li>
      </ul>
    </a>
    <!--Dodaj Frienda-->
    <a id="AddFriend" href="#">
      <ul class="menu-list">
        <li @click="openAddFriend">Add Friends</li>
      </ul>
    </a>
    <!--Friend Lista-->
    <a id="FriendList" href="#">
      <ul class="menu-list">
        <li @click="openFriendList">Friend List</li>
      </ul>
    </a>
    
    <!--Prikazi friend listu -->
    <div v-if="showFriendList">
      <ul>
        <li v-for="friend in friends" :key="friend._id">{{ friend.username }}</li>
      </ul>
    </div>
  </Slide>

  <div class="home">
  <img alt="Fipuzor Logo" src="../assets/logo_fipuzor_smaller.png">
  </div>
  
 <h2>Welcome to Fipuzor dashboard</h2>

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
        <div class="card-details">
        <!--QRCodeGenerator koja prikazuje generirani QR kod iz cardNumbera kad je kartica expandana-->
        <p v-if="card.expanded" class="card-number"></p>
        <QRCodeGenerator v-if="card.expanded" :card-number="card.cardNumber" />
      </div>

      </div>
      <!-- Ako nema dodanih kartica prikazi ovo -->
      <div v-if="cards.length === 0" class="empty-card">
        No cards added yet.
      </div>
      <div class="added-cards-text-square">Added Cards</div>
    </div>
 
  <!-- Add friend -->
  <div v-if="showAddFriend" class="overlay">
    <div class="popup">
       <AddFriend :user-id="userID" @close-modal="closeAddFriend" />
    </div>
 
</div>
  </div>
  <!-- Add card botun -->
  <button class="btn btn-success btn-circle" @click="openAddCard"><i class="bi bi-plus"></i></button>
  <!-- Share card botun -->
  <button class="btn btn-primary btn-circle" @click="openSharePopup"><i class="bi bi-share"></i></button>


  <!-- AddCard komponenta nakon pritiska "Add Card" botuna -->
  <div v-if="showAddCard" class="add-card-overlay">
    <AddCard @card-added="handleCardAdded" @close-modal="closeAddCard" />
  </div>

  <!-- Share Card Popup prozor -->
<div v-if="showSharePopup" class="overlay">
  <div class="popup">
    <h2>Share Card</h2>
    <select v-model="selectedCard" class="card-dropdown">
      <option v-for="card in cards" :key="card.cardNumber" :value="card.cardNumber">
        {{ card.name }} - {{ card.cardNumber }}
      </option>
    </select>
    <select v-model="selectedFriend" class="friend-dropdown">
      <option v-for="friend in friends" :key="friend._id" :value="friend.username">
        {{ friend.username }}
      </option>
    </select>
    <button class="btn btn-primary" @click="shareCardWithFriend">Share</button>
    <button class="btn btn-danger" @click="closeSharePopup">Cancel</button>
  </div>
</div>
<!--Prikaz sheranih kartica logiranom useru-->
<div class="shared-card-container-wrapper">
  <div class="shared-card-container">
    <div
      v-for="(sharedCard, index) in sharedCards"
      :key="index"
      :class="{ 'loyalty-card': true, 'expanded': sharedCard.expanded }"
      @click="toggleCardExpansion(sharedCard)"
    >
      <img :src="sharedCard.logo" alt="Card Logo" class="card-logo">
      <h3>{{ sharedCard.name }}</h3>
      <p>Card Number: {{ sharedCard.cardNumber }}</p>
      <p>Expire Date: {{ sharedCard.expireDate }}</p>
      <div class="card-details">
        <p v-if="sharedCard.expanded" class="card-number"></p>
        <QRCodeGenerator v-if="sharedCard.expanded" :card-number="sharedCard.cardNumber" />
      </div>
    </div>
    <div v-if="sharedCards.length === 0" class="empty-card">
      No shared cards available.
    </div>
    <div class="shared-cards-text-square">Shared Cards</div>
  </div>
</div>



      <!--Status o sheranoj kartici-->
      <div v-if="sharingStatus">{{ sharingStatus }}</div> 
</template>

<script>
import AddCard from "@/components/AddCard.vue"; // Importanje AddCard komponente
import axios from 'axios';
import Cookies from 'js-cookie';
import { mapState, mapMutations } from 'vuex';
import QRCodeGenerator from "@/components/QRCodeGenerator.vue";
// import the CSS transitions you wish to use, in this case we are using `Slide`
import { Slide } from 'vue3-burger-menu';
import AddFriend from "@/components/AddFriend.vue";

export default {
  computed: {
    ...mapState(['userID', 'cards', 'isAuthenticated']),
  },

  components: {
    AddCard,
    QRCodeGenerator,
    Slide,
    AddFriend

  },
  data() {
    return {
      showAddCard: false,
      cards: [],
      loggedInUsername: '',
      userID: '', //Storanje userID-a
      showMenu: false,
      showAddFriend: false,
      friends: [],
      showFriendList: false,
      showSharePopup: false,
      //sharingStatus: "", //incijalizacija statusa
      sharingStatus: '',
      sharedCards: [],
    };
  },
  created() {
    // Dohvacanje username-a iz browser cookija
    this.loggedInUsername = Cookies.get('loggedInUsername');
    this.userID = Cookies.get('userID');
    this.fetchUserCards();
    this.fetchFriendList();
    this.fetchSharedCards();
  },
  methods: {
  ...mapMutations(['setIsAuthenticated', 'setUserID', 'addCard']),

    async fetchUserCards() {
      try {
        console.log('Fetching user cards for userID:', this.userID); //Test linija
        const response = await axios.get('https://peaceful-savannah-87884-a889c5914717.herokuapp.com/api/cards/' + this.userID);
    if (response.data.success) {
      this.cards = response.data.cards;

      for (const card of this.cards) {
        card.expanded = false;
        card.qrCodeDataURL = await this.generateQRCode(card.cardNumber);
      }
    } else {
        // Handle error
        }
        } catch (error) {
        // Handle error
        }
    },

  async login() {
      try {
        const response = await axios.post('https://peaceful-savannah-87884-a889c5914717.herokuapp.com/api/login', {
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
    
    //Validacija cardNumber polja - limitirano samo na brojeve
    if (!/^\d+$/.test(newCard.cardNumber)) {
    console.log('Invalid card number');
    return;
    } 
    
    axios.post('https://peaceful-savannah-87884-a889c5914717.herokuapp.com/api/cards', newCard)
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
      console.log('toggleMenu method called');
      this.showMenu = !this.showMenu;
    },
    //Logout i redirect na pocetnu/login, clear cookies??
    logout() {
      Cookies.remove('loggedInUsername');
      Cookies.remove('userID');
      this.setIsAuthenticated(false); // Set isAuthenticated to false
      this.setUserID(null);
      this.cards = [];
      this.$router.push('/login');
    },
  
      openAddFriend() {
      this.showAddFriend = true;
      },
      closeAddFriend() {
      this.showAddFriend = false;
  },

  openFriendList() {
      this.fetchFriendList(); // Fetch the friend list
      this.showFriendList = true; // Show the friend list
    },

  //Dohvacanje friend list
async fetchFriendList() {
  try {
    console.log('Fetching friend list for userID:', this.userID); // Test line
    const response = await axios.get(`https://peaceful-savannah-87884-a889c5914717.herokuapp.com/api/friend-list/${this.userID}`);
    if (response.data.success) {
      this.friends = response.data.friends;
      this.showFriendList = true; // Show the friend list when fetched
    } else {
      this.friends = [];
      this.showFriendList = false;
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
},
    openSharePopup() {
    // Reset selected values for sharing
    this.selectedCard = null;
    this.selectedFriend = null;
    this.showSharePopup = true;
    },

    closeSharePopup() {
    this.showSharePopup = false;
    },

    shareCardWithFriend() {
  if (this.selectedCard && this.selectedFriend) {
    console.log('Selected card:', this.selectedCard);
    const requestData = {
      username: this.loggedInUsername,
      friendUsername: this.selectedFriend,
      cardId: this.selectedCard.toString(), //Convertaj cardId u string radi backend errora
    };

    console.log('Data Sent from Frontend:', requestData);

    axios
      .post('https://peaceful-savannah-87884-a889c5914717.herokuapp.com/api/share-card', requestData)
      .then((response) => {
        if (response.data.success) {
          console.log('Card shared successfully:', response.data.message);
          this.sharingStatus = "Card shared successfully!";
          this.clearSharingStatusAfterDelay(); //Pozivanje metode za clear statusa
          this.closeSharePopup();
        } else {
          console.log('Failed to share card:', response.data.message);
          this.sharingStatus = "Failed to share card.";
          this.clearSharingStatusAfterDelay(); //Pozivanje metode za clear statusa
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        this.sharingStatus = "An error occurred.";
        this.clearSharingStatusAfterDelay(); //Pozivanje metode za clear statusa
      });
  }
},
clearSharingStatusAfterDelay() {
      setTimeout(() => {
        this.sharingStatus = ''; //Makni status/info nakon nekog cremena
      }, 2000); //milisekunde
    },

    async fetchSharedCards() {
  try {
    console.log('Fetching shared cards for friendId:', this.userID);
    const response = await axios.get(`https://peaceful-savannah-87884-a889c5914717.herokuapp.com/api/shared-cards/${this.userID}`);
    if (response.data.success) {
      this.sharedCards = response.data.sharedCards;
      for (const sharedCard of this.sharedCards) {
        sharedCard.expanded = false;
        // You might also want to generate QR codes or perform other tasks here
      }
    } else {
      console.log('No shared cards found for friendId:', this.userID);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
},
},

  beforeRouteEnter(to, from, next) {
    if (Cookies.get('userID')) {
      next(); // User is authenticated, proceed to the dashboard
    } else {
      next('/login'); // User is not authenticated, redirect to login
    }
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

.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.qr-code-left {
  margin-right: 1rem; /* Add margin to separate QR code from card details */
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  padding: 10px;
  cursor: pointer;
  color: #fff; /* Set the text color for menu items */
  transition: background-color 0.3s ease-in-out; /* Add transition for smooth color change */
}

.menu-list li:hover {
  background-color: #555; /* Change the background color on hover */
}

/* Overlay style za Addfriend popup */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/*Popup style*/
.popup {
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.card-dropdown,
.friend-dropdown {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.share-confirm-button,
.share-cancel-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

</style>
