import { createStore } from 'vuex';

export default createStore({
  state: {
    userID: null,
    cards: [],
    isAuthenticated: false,
  },
  mutations: {
    setUserID(state, userID) {
      state.userID = userID;
    },
    addCard(state, card) {
      state.cards.push(card);
    },
    setIsAuthenticated(state, value) {
        state.isAuthenticated = value;
    },
  },
});