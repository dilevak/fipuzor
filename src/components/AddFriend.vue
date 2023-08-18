<template>
  <div class="add-friend">
    <h2>Add Friend</h2>
    <input v-model="searchEmail" placeholder="Enter friend's email">
    <button @click="searchFriend">Search</button>
    <ul v-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.userID">
        {{ result.username }} ({{ result.email }})
        <button @click="addFriend(result.email)">Add</button>
      </li>
    </ul>
    <p v-else>No results found</p>

    <button class="close-button" @click="closeAddFriend">Close</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['userId'],

  data() {
    return {
      searchEmail: '',
      searchResults: [],
      message: '',
    };
  },
  methods: {
    async searchFriend() {
      try {
        const response = await axios.get(`http://localhost:3000/api/search-friends/${this.searchEmail}`);
        if (response.data.success) {
          this.searchResults = response.data.results;
        } else {
          this.searchResults = [];
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
    async addFriend(friendEmail) {
      try {
        //console.log('Adding friend:', this.userId, friendEmail); //Logiraj sta saljemo

        const response = await axios.post('http://localhost:3000/api/add-friend', {
          userID: this.userId,
          friendEmail: friendEmail,
        });

        //console.log('Backend response:', response.data); //prikazi backend odgovor

        if (response.data.success) {
          this.message = 'Friend added successfully';
        } else {
          this.message = 'Failed to add friend. Please try again.';
        }
      } catch (error) {
        console.error('An error occurred:', error);
        this.message = 'An error occurred. Please try again later.';
      }
    },

    closeAddFriend() {
      //Zatvori popup
      this.$emit('close-modal');
      this.message = ''; //ocisti poruku
    },
  },
};
</script>

<style scoped>
.close-button {
  background-color: #ccc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
