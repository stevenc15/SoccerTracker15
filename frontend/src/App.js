//App.js
import React from 'react';
import './App.css';
import { AppProvider } from './components/appContext.js';
import Layout from './pages/Layout.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return(
    <div>
      <BrowserRouter>
        <AppProvider>
          <Layout />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


//<UserProvider>
        //<BrowserRouter>
          //<Routes>
            //<Route path="/" element={<LandingPage />} />{/* -> login =>solo para el user aterrizar*/}
            //<Route path="/login" element={<LoginPage/>} />{/* -> register || home =>login a la cuenta o ir a register, reset password*/}
            //<Route path="/register" element={<RegisterPage/>} /> {/* Register page -> login || home => register a una cuenta nueva (email verification) o ve al login*/}
            //<Route path="/home" element={<HomePage/>} /> {/* -> about || video || account => process y save video*/}
            //<Route path="/about" element={<AboutPage />} /> {/* -> home => learn about tracker */}
            //<Route path="/Video" element={<VideoPage/>} /> {/* -> home => search, delete and download video*/}
            {/*<Route path="/account" element={<AccountPage />} />*/} {/* ->landingPage =>para logout o delete account*/}
          //</Routes>
        //</BrowserRouter>
      //</UserProvider>
