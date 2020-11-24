<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Text Adventure Game</v-toolbar-title>
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
        <v-list-item v-for="item in items" :key="item.title" link>
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
// ICONS from: https://materialdesignicons.com/
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-arm-flex" },
      { title: "Chapter 1", icon: "mdi-lock" },
      { title: "Chapter 2", icon: "mdi-lock" },
      { title: "Chapter 3", icon: "mdi-lock" },
    ],
    right: null,
  }),
};
</script>