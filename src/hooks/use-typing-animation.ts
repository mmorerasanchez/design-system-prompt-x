import { useState, useEffect, useRef } from "react";

const DEFAULT_TEXT = "Generate an onboarding assistant that guides new users through setup…";

export function useTypingAnimation(text: string = DEFAULT_TEXT) {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);
  const directionRef = useRef<"typing" | "deleting" | "paused">("typing");

  useEffect(() => {
    const interval = setInterval(() => {
      if (directionRef.current === "typing") {
        indexRef.current += 1;
        setDisplayText(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          directionRef.current = "paused";
          setTimeout(() => { directionRef.current = "deleting"; }, 2000);
        }
      } else if (directionRef.current === "deleting") {
        indexRef.current -= 1;
        setDisplayText(text.slice(0, indexRef.current));
        if (indexRef.current <= 0) {
          directionRef.current = "paused";
          setTimeout(() => { directionRef.current = "typing"; }, 800);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return displayText;
}
