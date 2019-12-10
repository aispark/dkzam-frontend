<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <template v-for="step in steps">
        <v-stepper-step
          :key="`${step.position}-step`"
          :complete="e1 > step.position"
          :step="step.position"
          editable
        >{{ step.title }}</v-stepper-step>

        <v-divider v-if="step.position !== steps.length" :key="step.position"></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        v-for="step in steps"
        :key="`${step.position}-content`"
        :step="step.position"
      >
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="nextStep(step.position)">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "invoice",
  data() {
    return {
      e1: 1,
      steps: [
        {
          position: 1,
          title: "롯데택배 송장 가져오기"
        },
        { position: 2, title: "스마트스토어 송장 등록" }
      ]
    };
  },

  watch: {
    steps(val) {
      console.log(val);
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },

  methods: {
    nextStep(n) {
      if (n === this.steps.length) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    }
  }
};
</script>
<style>
@media only screen and (max-width: 959px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: block !important;
    margin-left: 8px;
  }
}
</style>
