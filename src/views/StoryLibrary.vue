<template>
  <v-container>
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
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">STORY</div>
                <v-list-item-title class="headline mb-1">
                  {{ story.StoryName }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  story.StoryDescription
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-avatar rounded color="primary darken-1" size="75">
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
    return {};
  },
  methods: {
    playStory(StoryID) {
      const newStory = this.$store.state.StoryJSONArray.find(
        (arrayStory) => arrayStory.StoryID === StoryID
      );
      console.log(JSON.stringify(newStory, null, 2));
      this.$store.dispatch("setCurrentStoryJSON", JSON.stringify(newStory));
      this.$router.push("chapter" + this.$store.state.CurrentChapter);
    },
  },
};
</script>

<style>
</style>