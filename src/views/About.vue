<template>
  <v-container
    class="animate__animated animate__fadeIn"
    style="animation-duration: 0.25s"
  >
    <v-row class="mb-5">
      <v-col align="center" justify="center">
        <h1>About</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row class="px-5 py-1 py-1">
          <v-col>
            <v-sheet class="px-8 py-6" outlined rounded elevation="5">
              <h2>About This App</h2>
              <div class="px-5">
                <ul>
                  <li class="py-1">
                    On this site, you can create, play, import, and export a playable
                    text adventure game story that you
                    can share with other people to play!
                  </li>
                  <li class="py-1">
                    Each of these stories are divided into chapters, which each
                    contain the content of your story.
                  </li>
                  <li class="py-1">
                    The story files created by this application are generated in a
                    structured .JSON (JavaScript Object Notation) file format, which
                    contains sections that are organized in a way for this
                    application's code to read it.
                  </li>
                </ul>
              </div>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row class="px-5 py-1">
          <v-col>
            <v-sheet class="px-8 py-6" outlined rounded elevation="5">
              <h2>Troubleshooting:</h2>
              <div class="px-5">
                <ul>
                  <li class="py-1">
                    My story file isn't importing!
                    <ul>
                      <li class="py-1">
                        Try comparing what the story (.JSON file) looks like to
                        another story file or running it through an online JSON
                        linter.
                      </li>
                    </ul>
                  </li>
                  <li class="py-1">
                    The site crashed or isn't loading things properly!
                    <ul>
                      <li class="py-1">
                        Try refreshing the page via F5 or by clicking your
                        browser's Refresh icon at the top of the browser window.
                      </li>
                      <li class="py-1">
                        If all else doesn't work, make sure all of your story files are saved to your computer and clear your browser's cache for this site.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row class="px-5 py-1">
          <v-col>
            <v-sheet class="px-8 py-6" outlined rounded elevation="5">
              <h2>About Me</h2>
              <div class="px-5">
                <ul>
                  <li class="py-1">
                    My name is Aaron, and I've been a professional software
                    developer since 2019.
                  </li>
                  <li class="py-1">
                    I like writing software for fun, and thought it would be a
                    great experience to take an idea like this and turn it into
                    something fun.
                  </li>
                </ul>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Component Description:
// This is the about page, where I answer some questions about things.

export default {
  name: "About",
};
</script>

<style>
</style>