import React from 'react';
import './PageContents.css';
import LinkContainer from '../Components/container/linkcontrainer';
import {linkList} from '../languages/linkdatas';

const LinkPage = () =>{
    
    return(
        < LinkContainer links={linkList}/>
    );
        
}
export default LinkPage;