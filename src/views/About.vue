<template>
  <v-container
    class="animate__animated animate__fadeIn"
    style="animation-duration: 0.25s"
  >
    <v-row class="mb-5">
      <v-col align="center" justify="center">
        <h1>About Page</h1>
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
                    On this site, you can create, play, and export a playable text adventure game
                    story and export it as a file that you can share with other
                    people to play!
                  </li>
                  <li class="py-1">
                    Each of these stories are divided into chapters, which each
                    contain the content of your story.
                  </li>
                  <li class="py-1">
                    Story files created by this application are generated as a
                    structured .JSON (JavaScript Object Notation)
                    file, which contains sections that are organized in a way
                    for this application's code to read it.
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
                        another story file or running it through an online
                        JSON linter.
                      </li>
                    </ul>
                  </li>
                  <li class="py-1">
                    The site crashed or isn't loading things properly!
                    <ul>
                      <li class="py-1">
                        I've tested things to the best of my ability, but if
                        there are any remaining bugs that I haven't squashed, try
                        refreshing the page via F5 or by clicking your browser's
                        Refresh icon at the top of the browser window.
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
                    great experience to take an idea like this and turn it into something
                    usable and valuable to other people.
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
export default {
  name: "About",
};
</script>

<style>
</style>