<template>
  <div class="qr-code">
    <img v-if="qrCodeData" :src="qrCodeData" alt="QR Code" class="qr-code-img">
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  props: {
    cardNumber: String,
  },
  data() {
    return {
      qrCodeData: '',
    };
  },
  watch: {
    cardNumber: {
      immediate: true,
      handler(newCardNumber) {
        this.generateQRCode(newCardNumber);
      },
    },
  },
  methods: {
    async generateQRCode(cardNumber) {
      try {
        const qrCodeDataURL = await QRCode.toDataURL(cardNumber);
        this.qrCodeData = qrCodeDataURL;
      } catch (error) {
        console.error('Error generating QR code:', error);
        this.qrCodeData = null;
      }
    },
  },
};
</script>

<style scoped>
.qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
}
.qr-code-img {
  max-width: 100%;
  height: auto;
}
</style>
