// AppContext.js
import React, {createContext, useContext, useState} from 'react';

//App context
const AppContext = createContext();

//wrapper object
export const AppProvider = ({children})=>{

  //specify usestates to be shared accross pages/components
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [menuOpen, setMenuOpen] = useState(false);

  //set the usestates to be available when components is within wrapper
  return (
    <AppContext.Provider value={{
      userId, setUserId,
      currentPage, setCurrentPage,
      menuOpen, setMenuOpen
      }}>
      {children}
    </AppContext.Provider>
  );
};


export const useApp = () => { //this is what gets imported by whatever components 
// or pages want to use these usestates, gives them access
  return useContext(AppContext);
};
