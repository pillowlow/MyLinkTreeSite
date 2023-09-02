import React, { useState, useEffect } from 'react';
import { flashcards } from '../../languages/cardsdatas'; // 导入你的数据
import Flashcard from '../flashcard/flashcard';

const FlashcardContainer = () => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFlashcard((prevIndex) => (prevIndex + 1) % flashcards.length);
    }, 3000); // 更改 Flashcard 每 3000 毫秒（3 秒）

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Flashcard {...flashcards[currentFlashcard]} />
    </div>
  );
};

export default FlashcardContainer;
