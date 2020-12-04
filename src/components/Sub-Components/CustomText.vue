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
      // Set the animation styling classes on object
      // Accepted "look" Values: Scared, Emphasis, Happy, Tired

      // <CustomText look="scared" text="I'm scared..." /> <br />

      look = look.toLowerCase();
      var classes;

      switch (look) {
        case "scared":
          classes =
            "animate-scared animate__animated animate__infinite animate__headShake";
          return classes;
        case "emphasis":
          classes =
            "animate-emphasis animate__animated animate__infinite animate__pulse";
          return classes;
        case "happy":
          classes =
            "animate-happy animate__animated animate__infinite animate__bounce";
          return classes;
        case "tired":
          classes =
            "animate-tired animate__animated animate__infinite animate__shakeY";
          return classes;
        default:
          console.log("ERROR: Text Animation was unable to be applied.");
          break;
      }
    },
  },
};

// scared, emphasis, happy, tired
</script>

<style scoped>
.animate__animated {
  --animate-duration: 1s;
  display: inline-block;
}

.animate-scared {
  font-weight: italic;
}
.animate-emphasis {
  font-weight: bold;
}
.animate-happy {
  font-weight: bold;
}
.animate-tired {
  font-weight: italic;
  --animate-duration: 12s;
}
</style>
