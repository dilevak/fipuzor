<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Add New Card</h5>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="newCardStore" class="form-label">Store Name:</label>
          <select v-model="selectedStore" id="newCardStore" class="form-select" required>
            <option value="">Select a store</option>
            <option v-for="store in stores" :key="store">{{ store }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="newCardNumber" class="form-label">Card Number:</label>
          <input v-model="newCardNumber" id="newCardNumber" type="text" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Expire Date:</label>
          <div class="d-flex">
            <select v-model="selectedMonth" class="form-select me-2" required>
              <option value="" disabled>Month</option>
              <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
            </select>
            <select v-model="selectedYear" class="form-select" required>
              <option value="" disabled>Year</option>
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Add Card</button>
      </form>
      <button class="btn btn-secondary" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stores: Array,
  },
  data() {
    return {
      selectedStore: "",
      newCardNumber: "",
      selectedMonth: "",
      selectedYear: "",
    };
  },
  computed: {
    months() {
      return Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    },
    years() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 28 }, (_, i) => (currentYear + i).toString());
    },
    expireDate() {
      return `${this.selectedMonth}/${this.selectedYear}`;
    },
  },
  methods: {
    submitForm() {
      if (this.selectedStore && this.newCardNumber && this.selectedMonth && this.selectedYear) {
        this.$emit("card-added", {
          selectedStore: this.selectedStore,
          cardNumber: this.newCardNumber,
          expireDate: this.expireDate,
        });
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
/* Your CSS styles here */
</style>
