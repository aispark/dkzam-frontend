<template>
  <v-container fluid>
    <v-row align="center" justify="start">
      <v-col cols="12">
        <v-btn
          class="ma-2"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="addOrder()"
        >추가</v-btn>

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
        <file-pond
          name="imgFile"
          ref="pond"
          label-idle="Drop files here..."
          :allow-multiple="false"
          accepted-file-types="image/jpeg, image/png"
          :server="uploadUrl"
          :files="myFiles"
          v-on:init="handleFilePondInit"
        />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <ProgressMessage :items="processMessage" :loading="loading" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in items" :key="`order${index}`" cols="12" sm="6" md="4" lg="3">
        <v-card :key="item.productOrderId">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title font-weight-bold">
                {{
                item.dispatcher
                }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="openOrder(item, index)">
                <v-icon color="grey lighten-1">edit</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0">
              <v-btn icon @click="deleteOrder(index)">
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item
              v-for="(header, headerIndex) in headers"
              :key="`item-${index}-${headerIndex}`"
            >
              <v-list-item-content>{{ header.text }}:</v-list-item-content>
              <v-list-item-content
                class="align-end list-item-content"
                :class="quantityAccent(header.value, item[header.value])"
              >{{ item[header.value] }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">주문폼</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-chip-group
                  v-model="selectedItem.dispatcherCode"
                  active-class="deep-purple--text text--accent-4"
                  mandatory
                >
                  <v-chip value="100">더쿠잼</v-chip>
                  <v-chip value="200">박준혁</v-chip>
                  <v-chip value="300">도쿄의하루</v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                v-for="(header, headerIndex) in headers"
                :key="`dialog-${headerIndex}`"
              >
                <v-combobox
                  v-model="selectedItem[header.value]"
                  :items="imageTexts"
                  @blur="handleAddressBlur(`${header.value}`)"
                  :label="`${header.text}`"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
          <small>*필수값</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="primary darken-1" text @click="updateOrder">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "order",
  components: {
    FilePond
  },
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_WEBSOCKET}/create?socketId=${this.$socket.id}`,
      myFiles: [],
      imageTexts: [],
      dialog: false,
      loading: false,
      processMessage: [],
      items: [],
      selectedItem: {
        dispatcherCode: "100",
        oproductOrderProductOptionContents: "",
        productOrderMemo: ""
      },
      selectedIndex: null,
      headers: [
        { text: "수취인", value: "productOrderAddressName" },
        { text: "연락처", value: "productOrderAddressTelno1" },
        { text: "우편번호", value: "productOrderAddressZipcode" },
        { text: "주소", value: "productOrderAddressAddress" },
        { text: "상세주소", value: "productOrderAddressAddressDetail" },
        { text: "상품명", value: "oproductOrderProductProductName" },
        { text: "옵션", value: "oproductOrderProductOptionContents" },
        { text: "수량", value: "productOrderDetailOrderQuantity" },
        { text: "메모", value: "productOrderMemo" }
      ]
    };
  },
  created() {
    this.$socket.on("recognizeProcess:log", data => {
      this.processMessage = [];
      this.processMessage.push(data);
    });

    this.$socket.on("recognizeProcess:succ", data => {
      this.imageTexts = data;
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
    customFilter(item, queryText, itemText) {
      const textOne = item.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    },

    async alpsUploadOrder() {
      this.processMessage = [];
      this.loading = true;
      await this.$axios.post(
        `${process.env.VUE_APP_WEBSOCKET}/alps/externalUploadOrder`,
        {
          socketId: this.$socket.id,
          items: this.items,
          isExternal: true
        }
      );
      this.loading = false;
    },

    deleteOrder(index) {
      this.items.splice(index, 1);
    },

    addOrder() {
      this.dialog = !this.dialog;
      this.selectedIndex = this.items.length;
    },
    openOrder(item, index) {
      this.dialog = !this.dialog;
      this.selectedItem = { ...item };
      this.selectedIndex = index;
    },

    updateOrder() {
      const [dispatcher] = this.$store.state.dispatchers.filter(
        item => item.dispatcherCode === this.selectedItem.dispatcherCode
      );

      this.items[this.selectedIndex] = { ...dispatcher, ...this.selectedItem };
      this.selectedItem = {};
      this.dialog = false;
    },

    async selectPostNo(addr) {
      const {
        data: {
          results: { juso }
        }
      } = await this.$axios.get(
        `http://www.juso.go.kr/addrlink/addrLinkApi.do`,
        {
          params: {
            keyword: addr,
            confmKey: "devU01TX0FVVEgyMDE5MTIyMTExMTQ0ODEwOTMzNzQ=",
            resultType: "json"
          }
        }
      );
      return juso;
    },

    async handleAddressBlur(key) {
      console.log(this.selectedItem);
      if (key === "productOrderAddressAddress") {
        const [juso] = await this.selectPostNo(this.selectedItem[key]);
        console.log(juso);
        this.selectedItem[key] = juso && juso.roadAddr;
        this.selectedItem["productOrderAddressZipcode"] = juso && juso.zipNo;
      }
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
