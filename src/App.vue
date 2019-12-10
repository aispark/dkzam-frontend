<!-- <router-link :to="{ name: 'login', params: { userId: 123 } }"
      >Log in</router-link
    > -->
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import DefaultLayout from "@/layout/DefaultLayout";
import NoFrameLayout from "@/layout/NoFrameLayout";
import BottomLayout from "@/layout/BottomLayout";
export default {
  name: "app",
  components: { DefaultLayout, NoFrameLayout, BottomLayout },
  computed: {
    layout() {
      let layout = this.$route.meta.layout;
      if (!layout) layout = "DefaultLayout";
      return layout;
    }
  },
  created() {},
  methods: {
    isLogin() {
      return this.$route.name !== "login";
    }
  }
};
</script>
