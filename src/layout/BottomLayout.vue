<template>
  <v-app id="inspire">
    <AppBar />
    <v-content>
      <slot />
    </v-content>
    <v-bottom-navigation @change="goto" v-model="bottomNav" color="primary" grow fixed>
      <v-btn value="order">
        <span>주문</span>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn value="invoice">
        <span>송장</span>
        <v-icon>mdi-briefcase-check</v-icon>
      </v-btn>
      <v-btn value="profile">
        <span>프로필</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
export default {
  name: "bottomLayout",
  data() {
    return {
      bottomNav: "order"
    };
  },
  methods: {
    goto() {
      this.$router.push({ name: this.bottomNav });
    }
  }
};
</script>