<template>
  <v-container fluid>
    <v-row align="center" justify="start">
      <v-col cols="12">
        <v-btn
          class="mr-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="placeOrder"
        >발주확인</v-btn>
        <v-btn
          class="ma-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="exportOrder"
        >발주확인 완료</v-btn>
        <v-btn
          class="ma-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="alpsUploadOrder"
        >등록</v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <ProgressMessage :items="processMessage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      loading: false,
      processMessage: []
    };
  },
  created() {
    // this.socketId = uuidv1();
    this.$socket.on("orderProcess:log", data => {
      this.processMessage.push(data);
    });
  },
  methods: {
    async placeOrder() {
      this.processMessage = [];
      this.loading = true;
      const {
        data: { resultList }
      } = await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/smartStore/placeOrder`,
        { params: { socketId: this.$socket.id } }
      );
      this.loading = false;
    },

    async exportOrder() {
      this.processMessage = [];
      this.loading = true;
      const {
        data: { resultList }
      } = await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/smartStore/orderList`,
        { params: { socketId: this.$socket.id } }
      );
      console.log(resultList);
      this.loading = false;
    },

    alpsUploadOrder() {}
  }
};
</script>
<style></style>
