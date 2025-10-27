"use client";

import { useCallback, useEffect, useState } from "react";
import { EnvelopeStep } from "./_components/envelope-step";
import { FinalCardStep } from "./_components/final-card-step";
import "./birthday-vanilla.css";
import "./globals.css";

// Types
type Step = 1 | 2;

// Main component
export default function BirthdayCard() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [musicPlayed, setMusicPlayed] = useState(false);

  const handleEnvelopeClick = useCallback(() => {
    setCurrentStep(2);
  }, []);

  const handlePlayMusic = async () => {
    if (musicPlayed) return;

    try {
      const audio = document.getElementById("birthday-music") as HTMLAudioElement;
      if (audio) {
        audio.volume = 0.5;
        await audio.play();
        setMusicPlayed(true);

        const playButton = document.getElementById("play-button");
        if (playButton) {
          playButton.style.display = "none";
        }
      }
    } catch (error) {
      console.log("Lỗi khi phát nhạc:", error);
      // Hiển thị nút play cho người dùng click
      const playButton = document.getElementById("play-button");
      if (playButton) {
        playButton.style.display = "block";
      }
    }
  };

  // Global music trigger effect
  useEffect(() => {
    // Trigger events để phát nhạc khi người dùng tương tác
    const triggerEvents = ["click", "touchstart", "keydown", "mousemove", "mouseenter"];

    const handleUserInteraction = () => {
      handlePlayMusic();
    };

    // Thêm event listeners cho toàn bộ document
    triggerEvents.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Cleanup function
    return () => {
      triggerEvents.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [musicPlayed]);

  // Cleanup balloons on unmount
  useEffect(() => {
    return () => {
      const balloons = document.querySelectorAll(".balloon");
      balloons.forEach((balloon) => balloon.remove());
    };
  }, []);

  return (
    <div className="birthday-container">
      {/* Audio element */}
      <audio id="birthday-music" loop preload="auto" style={{ display: "none" }}>
        <source src="/hbd.mp3" type="audio/mpeg" />
        Trình duyệt của bạn không hỗ trợ audio.
      </audio>

      {/* Nút play backup (ẩn mặc định) */}
      <button
        id="play-button"
        onClick={handlePlayMusic}
        style={{
          display: "none",
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "#ff69b4",
          color: "white",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          fontSize: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        🎵 Phát nhạc
      </button>

      <div className={`step ${currentStep === 1 ? "active" : ""}`}>
        <EnvelopeStep onEnvelopeClick={handleEnvelopeClick} />
      </div>

      {currentStep === 2 && (
        <div className={`step ${currentStep === 2 ? "active" : ""}`}>
          <FinalCardStep onMusicTrigger={handlePlayMusic} />
        </div>
      )}
    </div>
  );
}
