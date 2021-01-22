<template>
  <v-container
    class="animate__animated animate__fadeIn"
    style="animation-duration: 0.25s"
  >
    <v-row class="mb-5">
      <v-col align="center" justify="center">
        <h1>Story Library</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="story in this.$store.state.StoryJSONArray"
        :key="story.StoryID"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="pa-5 mx-auto"
            :elevation="hover ? 10 : 2"
            :class="{ 'on-hover': hover }"
            @mouseenter="storyHover = true"
            @mouseleave="hoverMouseLeave()"
          >
            <v-btn
              tabindex="-1"
              z-index="1000"
              :top="true"
              :right="true"
              :absolute="true"
              class="ml-auto"
              icon
              depressed
              @click="removingStory = true"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-list-item three-line style="pointer-events: none">
              <v-list-item-content>
                <div class="overline mb-4">STORY</div>
                <v-list-item-title class="headline mb-1">
                  {{ story.StoryName }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  story.StoryDescription
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-avatar rounded color="ml-5 mt-7 primary darken-2" size="75">
                <v-icon color="white" x-large>
                  mdi-{{ story.StoryIcon }}
                </v-icon>
              </v-avatar>
            </v-list-item>
            <h1></h1>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-row>
                <!-- <v-col align="center" justify="center">
                <v-btn color="primary--text"> Edit Story </v-btn>
              </v-col> -->
                <v-col align="center" justify="center">
                  <v-btn
                    x-large
                    color="primary"
                    @click="playStory(story.StoryID)"
                    class="animate__animated animate__pulse animate__infinite"
                  >
                    Play
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-fade-transition>
              <v-overlay
                v-if="hover == true && removingStory == true"
                absolute
                color="error"
              >
                <v-btn
                  v-if="!removeStoryFinalConfirmation"
                  @click="removeStoryFinalConfirmation = true"
                  :ripple="false"
                  fab
                  large
                >
                  <v-icon> mdi-delete-forever</v-icon>
                </v-btn>
                <v-btn
                  class="animate__animated animate__fadeInDown"
                  style="animation-duration: 0.5s !important"
                  v-if="removeStoryFinalConfirmation"
                  @click="removeStory(story.StoryID)"
                  large
                >
                  Are you sure?
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-divider class="my-10"></v-divider>
    <v-row class="my-5">
      <v-col align="center" justify="center">
        <v-btn @click="$router.push('importStory')" x-large elevation="5">
          Import Story
        </v-btn>
      </v-col>

      <v-col align="center" justify="center">
        <v-btn @click="$router.push('storyCreator')" x-large elevation="5">
          Create New
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "StoryLibrary",
  data() {
    return {
      removingStory: false,
      removeStoryFinalConfirmation: false,
      storyHover: false,
    };
  },
  methods: {
    hoverMouseLeave() {
      if (this.removeStoryFinalConfirmation == true) {
        // Wait for transition fadeout to end
        setTimeout(() => {
          this.removeStoryFinalConfirmation = false;
        }, 10);
      }
      this.removingStory = false;
      this.storyHover = false;
    },
    removeStory(StoryID) {
      // This function takes an item out of the user's story library.

      // Set a variable to store the value of the existing StoryJSON array.
      var currentStoryJSONArray = this.$store.state.StoryJSONArray;
      // Find the index of the item in that array to use in array.splice
      const selectedStory = currentStoryJSONArray.find(
        (arrayStory) => arrayStory.StoryID === StoryID
      );
      const index = currentStoryJSONArray.indexOf(selectedStory);

      // Use splice to remove it
      currentStoryJSONArray.splice(index, 1);
      const newArray = currentStoryJSONArray

      // Push the results to the state store
      this.$store.dispatch("setStoryJSONArray", newArray);

      // Reset the state of the delete hover button so users don't accidentally delete an additional story
      this.removingStory = false;
      this.storyHover = false;
    },
    playStory(StoryID) {
      const selectedStory = this.$store.state.StoryJSONArray.find(
        (arrayStory) => arrayStory.StoryID === StoryID
      );
      this.$store.dispatch("setCurrentStoryJSON", JSON.stringify(selectedStory));
      this.$router.push("chapter" + this.$store.state.CurrentChapter);
    },
  },
};
</script>

<style>
</style>