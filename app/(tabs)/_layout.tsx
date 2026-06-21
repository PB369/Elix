import ElixTabBar from "@/src/components/TabBar";
import { QuizQuestionsService } from "@/src/services/quiz/quiz.service";
import { StudyContentService } from "@/src/services/studyContent/studyContent.service";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {

  return (
    <Tabs
      tabBar={(props) => <ElixTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="quiz/index"
        options={{
          href: null, // esconde da tab bar
        }}
      />
    </Tabs>
  );
}