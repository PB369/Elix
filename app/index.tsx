import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [isFirstAccess, setIsFirstAccess] = useState(true);

  return (
    <Redirect
      href={isFirstAccess ? "/welcome" : "/home"}
    />
  );
}