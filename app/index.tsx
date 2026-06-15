import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [isFirstAccess, setIsFirstAccess] = useState(true);

  if (isFirstAccess) {
    return <Redirect href="/welcome" />;
  }

  return <Redirect href="/home" />;
}