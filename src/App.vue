<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h2>Coffee Abacus</h2>
    </v-app-bar>
    <v-content>
      <Calculator />
    </v-content>
  </v-app>
</template>

<script>
import Calculator from "@/components/Calculator.vue";
// import HowToUse from "@/components/HowToUse.vue";

export default {
  name: "App",

  components: {
    Calculator
  },

  data: () => ({
    //
  }),
  metaInfo: {
    // Children can override the title.
    title: "Coffee Abacus",
    // Result: My Page Title ← My Site
    // If a child changes the title to "My Other Page Title",
    // it will become: My Other Page Title ← My Site
    titleTemplate: "%s ← My Site",
    // Define meta tags here.
    meta: [
      { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Coffee Calculator For Pourover and Espresso. Dial In Exactally How Much Water and Coffee You Need to Make the Prefect Cup."
      }
    ],
    link: [
      { rel: "canonical", href: "https://www.coffeeabacus.com" }
    ]
  }
};
</script>
<style scoped>
.clac {
  margin: auto;
  width: 50%;
  border: 13px solid green;
  padding: 10px;
}
</style>