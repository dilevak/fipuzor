<template>
  <div class="home">
    <img alt="Fipuzor Logo" src="../assets/logo_fipuzor.png">
  </div>
  <SignUp/>
</template>

<script>
import SignUp from "@/components/SignUpForm.vue"; // Importanje Signup komponente

export default {
  name: 'SignupView',
  components: {
    SignUp,
  },
};
</script>