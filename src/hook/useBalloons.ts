import { useCallback } from 'react';

export const useBalloons = () => {
  const createBalloons = useCallback((count: number) => {
    // Clean up existing balloons
    const existingBalloons = document.querySelectorAll(".balloon");
    existingBalloons.forEach((balloon) => balloon.remove());

    for (let i = 0; i < count; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = `${Math.random() * 95}vw`; // Giảm xuống 95% để tránh bóng bay bị cắt
      balloon.style.animationDuration = `${Math.random() * 8 + 10}s`; // Tăng thời gian để chuyển động mượt hơn
      balloon.style.animationDelay = `${Math.random() * 8}s`; // Tăng delay để bóng bay xuất hiện đều hơn
      // Loại bỏ backgroundColor vì CSS đã xử lý màu sắc thông qua nth-child
      document.body.appendChild(balloon);
    }
  }, []);

  return { createBalloons };
};