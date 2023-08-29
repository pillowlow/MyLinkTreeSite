import ThreeScene from "./threejs/Home3D";
import ButtonComponent from './Components/button/button';
import HomePage from "./pages/Homepage";
import UpperContent from "./pages/UpperContent";
import LinkPage from "./pages/Linkpage";
import ProjectPage from "./pages/Projectpage";
import React, { useState, useContext, createContext } from 'react';
import { languages } from './languages/language'; 
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

  return (
    <>
      <div className="header">
        <ButtonComponent text={text.page1}  customColor="red" onClick={() => setCurrentPage('Homepage')} /> 
        <ButtonComponent text={text.page2}  customColor="yellow" onClick={() => setCurrentPage('Linkpage')}/>
        <ButtonComponent text={text.page2}  customColor="blue" onClick={() => setCurrentPage('Projectpage')}/>
        <button onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}>Toggle Language</button>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 position-relative">
            <ThreeScene className="webgl" />
            <UpperContent title={text.title} description={text.description}/>
          </div>
          <div className="col-md-5">
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
