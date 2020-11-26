<template>
  <span v-bind:class="SetAnimatedClasses(look)">{{ text }}</span>
</template>

<script>
export default {
  name: "CustomText",
  props: {
    text: String,
    look: String,
  },
  methods: {
    SetAnimatedClasses(look) {
      // Set the classes on object
      look = look.toLowerCase();
      var classes;

      switch (look) {
        case "happy":
          classes = "animate-happy animate__animated animate__bounce animate__infinite";
          return classes;
        default:
          console.log("FAIL");
          break;
      }
    },
  },
};
</script>

<style scoped>
.animate-happy {
    display: inline-block;
}
</style>
