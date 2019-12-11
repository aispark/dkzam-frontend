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
        >발주확인 목록</v-btn>
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
        <ProgressMessage :items="processMessage" :isShow="isShow" :loading="loading" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in items" :key="item.productOrderId" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title class="subheading font-weight-bold">{{item.productOrderAddressName}}</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>수취인:</v-list-item-content>
              <v-list-item-content class="align-end">{{item.productOrderAddressName}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>연락처:</v-list-item-content>
              <v-list-item-content class="align-end">{{item.productOrderAddressTelno1}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>상품명:</v-list-item-content>
              <v-list-item-content class="align-end">{{item.oproductOrderProductProductName}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>옵션:</v-list-item-content>
              <v-list-item-content class="align-end">{{item.oproductOrderProductOptionContents}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>수량:</v-list-item-content>
              <v-list-item-content class="align-end">{{item.productOrderDetailOrderQuantity}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>메모:</v-list-item-content>
              <v-list-item-content class="align-end">{{item.productOrderMemo}}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
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
      isShow: true,
      processMessage: [],
      items: []
    };
  },
  created() {
    // this.socketId = uuidv1();
    // console.log("process.env.VUE_APP_WEBSOCKET", process.env.VUE_APP_WEBSOCKET);
    this.$socket.on("orderProcess:log", data => {
      this.processMessage.push(data);
    });
  },
  mounted() {},
  methods: {
    async placeOrder() {
      this.processMessage = [];
      this.loading = true;
      this.isShow = true;
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
      this.isShow = true;
      const {
        data: { resultList }
      } = await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/smartStore/orderList`,
        { params: { socketId: this.$socket.id } }
      );
      this.items = resultList;
      // this.items = [
      //   {
      //     productOrderId: 1,
      //     productOrderAddressName: 2,
      //     productOrderAddressTelno1: 3,
      //     productOrderAddressTelno2: 3,
      //     productOrderAddressZipcode: 3,
      //     productOrderAddressAddress: 3,
      //     oproductOrderProductProductName: 3,
      //     oproductOrderProductOptionContents: 3,
      //     productOrderDetailOrderQuantity: 3,
      //     productOrderMemo: 3
      //   }
      // ];
      this.loading = false;
    },

    async alpsUploadOrder() {
      this.processMessage = [];
      this.loading = true;
      this.isShow = true;
      await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/alps/uploadOrder`,
        { params: { socketId: this.$socket.id } }
      );
      this.loading = false;
    }
  }
};
</script>
<style></style>
