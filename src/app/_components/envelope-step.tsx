"use client";

import { useState } from "react";

interface EnvelopeStepProps {
  onEnvelopeClick: () => void;
}

export const EnvelopeStep = ({ onEnvelopeClick }: EnvelopeStepProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    setTimeout(onEnvelopeClick, 700);
  };

  return (
    <div className="envelope-container" onClick={handleClick}>
      <div className={`envelope ${isOpen ? "open" : ""}`}>
        <div className="envelope-back"></div>
        <div className="envelope-front"></div>
        <div className="envelope-flap"></div>
        <div className="envelope-seal"></div>
      </div>
    </div>
  );
};