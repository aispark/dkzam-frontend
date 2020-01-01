<template>
  <v-app id="inspire">
    <AppBar />
    <v-content>
      <slot />
    </v-content>
    <v-bottom-navigation
      app
      @change="goto"
      v-model="$store.state.bottomNav"
      color="primary"
      grow
      fixed
    >
      <v-btn value="order">
        <span>주문</span>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn value="invoice">
        <span>송장</span>
        <v-icon>mdi-briefcase-check</v-icon>
      </v-btn>
      <v-btn value="externalOrder">
        <span>지정주문</span>
        <v-icon>mdi-cart-arrow-down</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
export default {
  name: "bottomLayout",
  data() {
    return {};
  },
  mounted() {
    // this.bottomNav = this.$route.name;
  },
  methods: {
    goto() {
      this.$router.push({ name: this.$store.state.bottomNav });
    }
  }
};
</script>
