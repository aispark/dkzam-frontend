<template>
  <v-card :loading="loading">
    <v-card-title class="subheading font-weight-bold">진행상황</v-card-title>
    <v-card-text v-show="isShow">
      <template v-for="(message, index) in items">
        <p :key="`${index}-progressMessage`">{{ message }}</p>
      </template>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "progressMessage",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isShow: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>
