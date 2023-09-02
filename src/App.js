import ThreeScene from "./threejs/Home3D";
import ButtonComponent from './Components/button/button';
import HomePage from "./pages/Homepage";
import UpperContent from "./pages/UpperContent";
import LinkPage from "./pages/Linkpage";
import ProjectPage from "./pages/Projectpage";
import React, { useState, useContext, createContext,useEffect } from 'react';
import { languages } from './languages/language';
import { SetColor } from './threejs/Home3D';
import 'bootstrap/dist/css/bootstrap.min.css';
import './threejs/canvasStyling.css';
import './App.css'

const LanguageContext = createContext();

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const MainContent = () => {
  const { language, setLanguage } = useLanguage();
  const text = languages[language];
  const [currentPage, setCurrentPage] = React.useState('Homepage');
  
  

  //console.log(this.SetColor);
  return (
    <>
      <div className="header">
      <ButtonComponent text={text.page1}  currentPage={currentPage} customColor="red" onClick={() => {setCurrentPage('Homepage'); }} />
      <ButtonComponent text={text.page2}  currentPage={currentPage} customColor="yellow" onClick={() => {setCurrentPage('Linkpage'); }} />
      <ButtonComponent text={text.page2}  currentPage={currentPage} customColor="blue" onClick={() => {setCurrentPage('Projectpage'); }} />
        <button onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}>EN/中文</button>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 position-relative">
          <ThreeScene setCurrentPage={setCurrentPage} currentPage={currentPage} className="webgl" />
            <UpperContent title={text.title} description={text.description}/>
          </div>
          <div className="col-md-6">
            <div className="page-container">
              {currentPage === 'Homepage' && (
                <HomePage title={text.title} description={text.description} imageUrl="./photos/mypfp.jpg" />
              )};
              {currentPage === 'Linkpage' && (
                <div><LinkPage/></div>
                
              )}
               {currentPage === 'Projectpage' && (
                <div><ProjectPage/></div>
              )}
              
            </div>
          </div>
        </div>
      </div>
      
      
    </>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};



export default App;
