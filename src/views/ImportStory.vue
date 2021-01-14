<template>
  <v-container>
        <v-row class="ma-5">
          <v-col align="center" justify="center">
            <v-row class="pb-5">
              <v-col align="center" justify="center">
                <h1>Import a Story</h1>
              </v-col>
            </v-row>
            <import-file></import-file>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import ImportFile from '../components/StoryCreator/ImportFile.vue'
export default {
  components: { ImportFile },

}
</script>

<style>

</style>