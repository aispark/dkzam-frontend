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
        >발주확인목록</v-btn>
        <v-btn
          class="ma-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="alpsUploadOrder"
        >등록</v-btn>
        <v-btn
          class="ma-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="importOrder"
        >발주확인파일</v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <ProgressMessage :items="processMessage" :loading="loading" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="item.productOrderId"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title font-weight-bold">{{item.productOrderAddressName}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="deleteOrder(index)">
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item v-for="header in headers" :key="item[header.value]">
              <v-list-item-content>{{header.text}}:</v-list-item-content>
              <v-list-item-content
                class="align-end list-item-content"
                :class="quantityAccent(header.value, item[header.value])"
              >{{item[header.value]}}</v-list-item-content>
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
      processMessage: [],
      items: [],
      headers: [
        { text: "수취인", value: "productOrderAddressName" },
        { text: "연락처", value: "productOrderAddressTelno1" },
        { text: "상품명", value: "oproductOrderProductProductName" },
        { text: "옵션", value: "oproductOrderProductOptionContents" },
        { text: "수량", value: "productOrderDetailOrderQuantity" },
        { text: "메모", value: "productOrderMemo" }
      ]
    };
  },
  created() {
    console.log("build");
    this.$socket.on("orderProcess:log", data => {
      this.processMessage.push(data);
    });
  },
  computed: {
    quantityAccent() {
      return (key, quantity) => {
        if (key === "productOrderDetailOrderQuantity") {
          return { "text-accent": quantity > 1 };
        }
        return {};
      };
    }
  },
  mounted() {},
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
      this.items = resultList;
      this.loading = false;
    },

    async alpsUploadOrder() {
      this.processMessage = [];
      this.loading = true;
      await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/alps/uploadOrder`,
        {
          params: {
            socketId: this.$socket.id,
            items: this.items.map(item => item.productOrderId)
          }
        }
      );
      this.loading = false;
    },

    async importOrder() {
      this.processMessage = [];
      this.loading = true;
      const {
        data: { resultList }
      } = await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/smartStore/importOrderList`,
        { params: { socketId: this.$socket.id } }
      );
      this.items = resultList;
      this.loading = false;
    },

    deleteOrder(index) {
      this.items.splice(index, 1);
    }
  }
};
</script>
<style>
.list-item-content {
  flex-grow: 2;
}

.text-accent {
  color: var(--v-primary-base);
  font-weight: 900;
}
</style>
