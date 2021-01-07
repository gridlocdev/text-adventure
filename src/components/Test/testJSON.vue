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
        {{ storyJSON.Chapters[0].ChapterSections[3].SectionData.title }}
        {{ storyJSON.Chapters[0].ChapterSections[3].SectionData.subText }}
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
        Chapters: [
          {
            ChapterName: "Chapter 1",
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
            ChapterSections: [
              {
                SectionType: "Intro",
                SectionData: {
                  title: "Chapter 2",
                  subText: "The Unruly King",
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
                    gameOverText: "You cut his hand. GAMEOVER",
                    successText: "He hands you the sword, good job!",
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
        ],
      },
    };
  },
};
</script>
<style scoped>
</style>