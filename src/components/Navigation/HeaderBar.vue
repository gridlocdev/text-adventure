<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.$store.state.StoryName }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <settings />
    </v-app-bar>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Menu </v-list-item-title>
          <v-list-item-subtitle> Navigation Menu </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in NavigationItems"
          :key="item.title"
          link
          @click="navigateTo(item.routerLink, item.title)"
        >
          <v-list-item-icon>
            <v-icon style="fill: green">mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-2">
          <v-list-item link @click="navigateTo('/privacypolicy')">
            <v-list-item-content>
              <v-list-item-title> Privacy Policy</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Settings from "./Settings.vue";
// This import is if I would like a link to the current story, indexed by chapternumber routerLink = 'chapter' + store.state.CurrentChapter
//import store from "../../store/index";

export default {
  components: {
    Settings,
  },
  data: () => ({
    drawer: null,
    NavigationItems: [
      { title: "Home", icon: "arm-flex", routerLink: "/" },
      {
        title: "About",
        icon: "information",
        routerLink: "/about",
      },
      {
        title: "Story Library",
        icon: "book-open-variant",
        routerLink: "/storyLibrary",
      },
      {
        title: "Story Creator",
        icon: "pencil",
        routerLink: "/storyCreator",
      },
      {
        title: "Import Story",
        icon: "plus",
        routerLink: "/importStory",
      },
    ],

    right: null,
  }),
  methods: {
    navigateTo(routerLink, title = null) {
      if (routerLink == this.$route.path) {
        this.drawer = !this.drawer;
      } else {
        this.$router.push(routerLink);
      }
      if (title != null) {
        if (title != "Home") {
          this.$store.dispatch("setStoryName", title);
        } else {
          this.$store.dispatch("setStoryName", "Text Adventure Game");
        }
      } else if (routerLink == "/privacypolicy") {
        this.$store.dispatch("setStoryName", "Privacy Policy");
      }
    },
  },
};
</script>