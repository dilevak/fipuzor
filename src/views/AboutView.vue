<template>
    <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor.png">
    </div>
    <Slide
    :closeOnNavigation="true"
    :noOverlay="true">
    
    <h2>Hello {{ loggedInUsername }}</h2>
    <router-link to="/dashboard">
      <ul class="menu-list">
        <li>Back to Dashboard</li>
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


  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="about"> 
          <p class="lead">
            Fipuzor is a loyalty card Vault. It got its name from the Faculty of Informatics in Pula,
            abbreviated as FIPU and the word trezor (eng. Vault).
            FIPU+Trezor=Fipuzor.
          </p>
          <p>
            Forget about carrying multiple cards. Forget your wallet,
            or keep it ultralight for valuables. With this essential everyday app,
            you can replace multiple plastic cards with just one app.
          </p>
          <p>
            Manually add card info to the app, and you will be able to use stored cards
            at the checkout register by just showing the QR code of the stored card so the cashier can scan it.
          </p>
          <p>
            Cards from these stores are currently supported:
          </p>
          <ul class="list-unstyled">
            <li><a href="https://www.bauhaus.hr/">Bauhaus</a></li>
            <li><a href="https://www.bipa.hr/">Bipa</a></li>
            <li><a href="https://www.dm.hr/">DM</a></li>
            <li><a href="https://www.interspar.hr/">Interspar</a></li>
            <li><a href="https://www.kaufland.hr/">Kaufland</a></li>
            <li><a href="https://www.konzum.hr/">Konzum</a></li>
            <li><a href="https://www.lidl.hr/">Lidl</a></li>
            <li><a href="https://www.mueller.hr/">Muller</a></li>
            <li><a href="https://www.pevex.hr/">Pevex</a></li>
            <li><a href="https://www.plodine.hr/">Plodine</a></li>
            <li><a href="https://www.spar.hr/">Spar</a></li>
            <li><a href="https://www.zoocity.hr/">Zoocity</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue3-burger-menu'

export default {
  name: 'AboutView',
  components: {
  Slide,
},

};
</script>

<style scoped>
.about {
  margin-bottom: 3rem;
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


</style>
