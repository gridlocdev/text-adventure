<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Text Adventure Game</v-toolbar-title>
      <v-spacer></v-spacer>

      <Settings />
    </v-app-bar>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Menu </v-list-item-title>
          <v-list-item-subtitle> Chapter Select </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in NavigationItems"
          :key="item.title"
          link
          @click="navigateTo(item.routerLink)"
        >
          <v-list-item-icon>
            <v-icon style="fill: green">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Settings from "./Settings.vue";

export default {
  components: {
    Settings,
  },
  data: () => ({
    drawer: null,
    NavigationItems: [
      { title: "Home", icon: "mdi-arm-flex", routerLink: "./" },
      { title: "Ending", icon: "mdi-lock", routerLink: "./ending" },
      { title: "TypewriterTest", icon: "mdi-lock", routerLink: "./typewriter" },
      { title: "ChoicePageTest", icon: "mdi-lock", routerLink: "./choice" },
      { title: "Intro", icon: "mdi-lock", routerLink: "./intro" },
      { title: "Game Over", icon: "mdi-lock", routerLink: "./gameover" },
      { title: "Chapter 1", icon: "mdi-lock", routerLink: "./chapter1" },
    ],

    right: null,
  }),
  methods: {
    navigateTo(routerLink) {
      if (routerLink == "." + this.$route.path) {
        this.drawer = !this.drawer;
      } else {
        this.$router.push(routerLink);
      }
    },
  },
};
</script>