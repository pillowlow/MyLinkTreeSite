import React from 'react';
import FlashcardContainer from '../Components/container/flashcardContainer';


const Projectpage = ({ useLanguage }) => {
  
  console.log("render linkpage");
  return (
    <FlashcardContainer currentLanguage={ useLanguage } /> // 传递当前语言作为一个 prop
  );
}

export default Projectpage;
