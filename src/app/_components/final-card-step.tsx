"use client";

import { useBalloons } from "@/hook/useBalloons";
import { useTypewriter } from "@/hook/useTypewriter";
import { useEffect } from "react";
import { Cake } from "./cake";

interface FinalCardStepProps {
  onMusicTrigger: () => void;
}

export const FinalCardStep = ({ onMusicTrigger }: FinalCardStepProps) => {
  const { displayText, isComplete } = useTypewriter("Happy Birthday Đậu!");
  const { createBalloons } = useBalloons();

  useEffect(() => {
    createBalloons(10); // Giảm số lượng bóng bay để gọn gàng hơn

    // Thử phát nhạc ngay lập tức khi component mount
    setTimeout(onMusicTrigger, 500);
  }, [createBalloons, onMusicTrigger]);

  return (
    <div className="final-card-container">
      <h1 className="greeting">
        {displayText}
        {!isComplete && <span className="typewriter-cursor"></span>}
      </h1>
      <Cake />
    </div>
  );
};
