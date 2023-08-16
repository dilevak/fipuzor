import { createStore } from 'vuex';

export default createStore({
  state: {
    userID: null,
    cards: [],
  },
  mutations: {
    setUserID(state, userID) {
      state.userID = userID;
    },
    addCard(state, card) {
      state.cards.push(card);
    },
  },
});