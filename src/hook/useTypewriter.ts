import { useEffect, useState } from "react";

export // Custom hooks
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    let i = 0;

    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(typing);
  }, [text, speed]);

  return { displayText, isComplete };
};
