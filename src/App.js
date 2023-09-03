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
import './App.css';
import './text.css';





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
  
  
  useEffect(() => {
    // 设置网页标题
    document.title = "PillowWebsite";
    
    // 设置网页图标
    /*
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '路径/to/你的图标.ico';
    document.getElementsByTagName('head')[0].appendChild(link);*/
  }, []);

  //console.log(this.SetColor);
  return (
    <>
      <div className="header">
      <ButtonComponent text={text.homePage}  currentPage={currentPage} customColor="red" onClick={() => {setCurrentPage('Homepage'); }} />
      <ButtonComponent text={text.linkPage}  currentPage={currentPage} customColor="blue" onClick={() => {setCurrentPage('Linkpage'); }} />
      <ButtonComponent text={text.ProjectPage}  currentPage={currentPage} customColor="yellow" onClick={() => {setCurrentPage('Projectpage'); }} />
      <button className="lan-button" onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}>EN/中文</button>
      </div>
      

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 ">
          <ThreeScene setCurrentPage={setCurrentPage} currentPage={currentPage} className="webgl" />
          {currentPage === 'Homepage' && (
                <UpperContent title={text.UpperHomeTitle} description={text.UpperHomeDescription1} description2={text.UpperHomeDescription2} marquee={text.marquee} vertMarquee={text.vertMarquee}/>
          )}
          {currentPage === 'Linkpage' && (
                <UpperContent title={text.UpperLinkTitle} description={text.UpperLinkDescription1} description2={text.UpperLinkDescription2} marquee={text.marquee} vertMarquee={text.vertMarquee}/>
          )}
          {currentPage === 'Projectpage' && (
                <UpperContent title={text.UpperHomeTitle} description={text.UpperHomeDescription1} description2={text.UpperHomeDescription2} marquee={text.marquee} vertMarquee={text.vertMarquee}/>
          )}

          
          </div>
          <div className="col-md-6">
              <div className="pageContainerDown">
                {currentPage === 'Homepage' && (
                  <HomePage title={text.DownHomeTittle} description={text.DownHomeDescription1} description2={text.DownHomeDescription2} imageUrl={`${process.env.PUBLIC_URL}/photos/mypfp.jpg`} />
                )}
                {currentPage === 'Linkpage' && (
                  <LinkPage/>
                  
                )}
                {currentPage === 'Projectpage' && (
                  <div><ProjectPage useLanguage ={language }/></div>
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
/*<a href={"https://www.google.com"} target="_blank" rel="noopener noreferrer">
{"Go to Google" }
</a>*/