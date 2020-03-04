<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="primary" dark>
        <h2>Coffee Abacus</h2>
        <!-- <div id="nav">
          <router-link to="/">Home</router-link>|
          <router-link to="/about">About</router-link>
        </div> -->
      </v-app-bar>
      <div id="body">
        <router-view />
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    // Children can override the title.
    title: "Coffee Abacus",
    // Result: My Page Title ← My Site
    // If a child changes the title to "My Other Page Title",
    // it will become: My Other Page Title ← My Site
    titleTemplate: "%s ← Coffee Ratio Calculator",
    // Define meta tags here.
    meta: [
      { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Coffee Calculator For Pourover and Espresso to Dial In The Perfect Ratio. Calculate Exactally How Much Water and Coffee You Need to Make the Prefect Cup."
      },
      // OpenGraph data (Most widely used)
      { property: "og:title", content: "Coffee Calculator" },
      { property: "og:site_name", content: "Coffee Abacus" },
      // The list of types is available here: http://ogp.me/#types
      { property: "og:type", content: "website" },
      // Should the the same as your canonical link, see below.
      { property: "og:url", content: "https://www.coffeeabacus.com" },

      // Often the same as your meta description, but not always.
      {
        property: "og:description",
        content:
          "Coffee Calculator For Pourover and Espresso to Dial In The Perfect Ratio. Calculate Exactally How Much Water and Coffee You Need to Make the Prefect Cup."
      },

      // Twitter card
      { name: "twitter:card", content: "Coffee Calculator" },
      { name: "twitter:site", content: "https://www.coffeeabacus.com" },
      { name: "twitter:title", content: "Coffee Calculator" },
      {
        name: "twitter:description",
        content:
          "Coffee Calculator For Pourover and Espresso to Dial In The Perfect Ratio. Calculate Exactally How Much Water and Coffee You Need to Make the Prefect Cup."
      },

      // Google / Schema.org markup:
      { itemprop: "name", content: "Coffee Calculator" },
      {
        itemprop: "description",
        content:
          "Coffee Calculator For Pourover and Espresso to Dial In The Perfect Ratio. Calculate Exactally How Much Water and Coffee You Need to Make the Prefect Cup."
      },
      { itemprop: "image", content: "https://www.coffeeabacus.com" }
    ],
    link: [{ rel: "canonical", href: "https://www.coffeeabacus.com" }]
  }
};
</script>
<style scoped>
#nav {
  color: black;
}
#body{
  padding-top: 80px;
}
</style>