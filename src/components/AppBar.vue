<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">{{$store.state.appBarTitle}}</v-toolbar-title>

    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "appBar"
};
</script>