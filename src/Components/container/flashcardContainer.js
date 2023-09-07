import React, { useState, useEffect } from 'react';
import { flashcards } from '../../languages/cardsdatas'; // 导入你的数据
import Flashcard from '../flashcard/flashcard';

const FlashcardContainer = ({ currentLanguage }) => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFlashcard((prevIndex) => (prevIndex + 1) % flashcards.length);
    }, 5000); // 更改 Flashcard 每 3000 毫秒（3 秒）

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Flashcard 
         image={flashcards[currentFlashcard].image}
         title={flashcards[currentFlashcard].title[currentLanguage]}
         description={flashcards[currentFlashcard].description[currentLanguage]}
         link={flashcards[currentFlashcard].link}

       />
    </div>
  );
};

export default FlashcardContainer;
