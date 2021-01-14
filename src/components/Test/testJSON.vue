<template>
  <v-container>
    <div>
      <h1>Intro data:</h1>
      <v-spacer></v-spacer>
      <span>
        {{ storyJSON.Chapters[0].ChapterSections[0].SectionData.title }}
        {{ storyJSON.Chapters[0].ChapterSections[0].SectionData.subText }}
      </span>
    </div>

    <div>
      <h1>Text Section data:</h1>
      <v-spacer></v-spacer>
      <span
        style="display: block"
        v-for="item in storyJSON.Chapters[0].ChapterSections[1].SectionData"
        :key="item.text"
      >
        {{ item.text }}
      </span>
    </div>

    <div>
      <h1>Choice Section data:</h1>
      <v-spacer></v-spacer>
      <span style="display: block">
        {{ storyJSON.Chapters[0].ChapterSections[2].SectionData.text }}
        {{
          storyJSON.Chapters[0].ChapterSections[2].SectionData.choices.choice1
        }}
        {{
          storyJSON.Chapters[0].ChapterSections[2].SectionData.choices.choice2
        }}

        {{
          storyJSON.Chapters[0].ChapterSections[2].SectionData.choicesMetadata
            .correctChoice
        }}
        {{
          storyJSON.Chapters[0].ChapterSections[2].SectionData.choicesMetadata
            .gameOverText
        }}
        {{
          storyJSON.Chapters[0].ChapterSections[2].SectionData.choicesMetadata
            .successText
        }}
      </span>
    </div>
    <div>
      <h1>Ending data:</h1>
      <v-spacer></v-spacer>
      <span>
        {{ storyJSON.Chapters[0].ChapterSections[5].SectionData.title }}
        {{ storyJSON.Chapters[0].ChapterSections[5].SectionData.subText }}
      </span>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "testJSON",
  data: function () {
    return {
      storyJSON: {
        StoryName: "The Hero's Journey",
        StoryIcon: "mdi-crown-outline",
        Chapters: [
          {
            ChapterName: "Chapter 1",
            ChapterIcon: "mdi-delta",
            ChapterSections: [
              {
                SectionType: "Intro",
                SectionData: {
                  title: "Chapter 1",
                  subText: "The Unruly King",
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
                  {
                    text: "You wake up.",
                  },
                  {
                    text: "The servant takes you to the castle.",
                  },
                  {
                    text: "King says hi, but you need sword.",
                  },
                ],
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "What should you do?",
                  choices: {
                    choice1: "Option 1",
                    choice2: "Option 2",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "You cut his hand. GAMEOVER",
                    successText: "He hands you the sword, good job!",
                  },
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
                  {
                    text: "EEEEEEEEEEEEEEI am text one.",
                  },
                  {
                    text: "I am text two.",
                  },
                  {
                    text: "Huzzah!",
                  },
                ],
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "What should you do?",
                  choices: {
                    choice1: "Option 1",
                    choice2: "Option 2",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "GAMEOVER: 2",
                    successText: "SUCCESS: 2",
                  },
                },
              },
              {
                SectionType: "Ending",
                SectionData: {
                  title: "Chapter 1 Complete!",
                  subText: "You've successfully started your journey!",
                },
              },
            ],
          },
          {
            ChapterName: "Chapter 2",
            ChapterIcon: "mdi-delta",
            ChapterSections: [
              {
                SectionType: "Intro",
                SectionData: {
                  title: "Chapter 2",
                  subText: "The Other Guy",
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
                  {
                    text: "A guy's there.",
                  },
                  {
                    text: "This other guy is pretty cool.",
                  },
                  {
                    text: "What's his name again? Who knows.",
                  },
                ],
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "Should you ask his name?",
                  choices: {
                    choice1: "Heck yeah",
                    choice2: "Nah, im good",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "He roundhouse kicks u into the atmosphere.",
                    successText:
                      "My name is... Chuck norris. Here's 10 million dollars.",
                  },
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
                  {
                    text:
                      "Now equipped with 10 million dollars, you set your sights on the moon.",
                  },
                  {
                    text:
                      "You call NASA, but they aren't too interested in your offer.",
                  },
                  {
                    text:
                      "10 million is a lot, but you might not be able to go to the moon with that.",
                  },
                ],
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "You need more money, what should you do?",
                  choices: {
                    choice1: "Become a hotdog stand guy",
                    choice2: "Go begging in old school runescape",
                  },
                  choicesMetadata: {
                    correctChoice: "2",
                    gameOverText:
                      "You end up liking hot dogs so much that u explode",
                    successText:
                      "You find a runescape player that's sick nasty and gives you 400 billion GP",
                  },
                },
              },
              {
                SectionType: "Ending",
                SectionData: {
                  title: "Chapter 2 Complete!",
                  subText: "You're rich! Muahahahahaaaaa",
                },
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
<style scoped>
</style>