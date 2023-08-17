<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="about">
          <h1 class="display-4">Fipuzor</h1>
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
export default {
  name: 'AboutView',
};
</script>

<style scoped>
.about {
  margin-bottom: 3rem;
}
</style>
