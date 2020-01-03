<template>
  <v-container fluid>
    <v-row align="center" justify="start">
      <v-col cols="12">
        <v-btn
          class="mr-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="exportInvoice"
          >송장 목록</v-btn
        >
        <v-btn
          class="ma-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="uploadInvoice"
          >등록</v-btn
        >
        <v-btn
          class="ma-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="importInvoice"
          >송장파일</v-btn
        >
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
        :key="item.invNo"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title font-weight-bold">{{
                item.acperNm
              }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="deleteInvoice(index)">
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item v-for="header in headers" :key="item[header.value]">
              <v-list-item-content>{{ header.text }}:</v-list-item-content>
              <v-list-item-content class="align-end list-item-content">{{
                item[header.value]
              }}</v-list-item-content>
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
        { text: "주문번호", value: "orderNo" },
        { text: "연락처", value: "acperTel" },
        { text: "상품명", value: "gdsNm" },
        { text: "송장번호", value: "invoiceNo" }
      ]
    };
  },

  created() {
    this.$socket.on("invoiceProcess:log", data => {
      this.processMessage = [];
      this.processMessage.push(data);
    });
  },
  methods: {
    async uploadInvoice() {
      this.processMessage = [];
      this.loading = true;

      const {
        data: { resultList }
      } = await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/smartStore/uploadInvoice`,
        {
          params: {
            socketId: this.$socket.id,
            items: this.items.map(item => item.invoiceNo)
          }
        }
      );
      this.loading = false;
    },

    async exportInvoice() {
      this.processMessage = [];
      this.loading = true;
      const {
        data: { resultList }
      } = await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/alps/invoiceList`,
        { params: { socketId: this.$socket.id } }
      );
      this.items = resultList;
      this.loading = false;
    },

    async importInvoice() {
      this.processMessage = [];
      this.loading = true;
      const {
        data: { resultList }
      } = await this.$axios.get(
        `${process.env.VUE_APP_WEBSOCKET}/alps/importInvoiceList`,
        { params: { socketId: this.$socket.id } }
      );
      this.items = resultList;
      this.loading = false;
    },

    deleteInvoice(index) {
      this.items.splice(index, 1);
    }
  }
};
</script>
<style>
.list-item-content {
  flex-grow: 2;
}
</style>
