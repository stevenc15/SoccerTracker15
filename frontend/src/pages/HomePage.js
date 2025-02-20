//HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import './stylings/HomePage.css';
import Process_saveVideo from '../components/process_saveVideo';

import Logout from '../components/logout';
//import {Box, Button, Typography} from '@mui/material';
import {useApp} from '../components/appContext';
import {getCookie} from '../components/cookieUtils';
import {useNavigate} from 'react-router-dom';
const apiUrl = 'https://soccertracker15-production.up.railway.app';

const HomePage = () => {
    const [videoURL, setVideoURL] = useState(''); 
    const [outputVideo, setOutputVideo] = useState(null); 
    const navigate = useNavigate(); 
    const isDisabled = process.env.REACT_APP_USE_CLOUD==='true';
//grab user ID
const {setUserId} = useApp();
const storeUserId = getCookie('userId');
const storedToken = getCookie('token');
useEffect( ()=> {
  if (storeUserId){
      setUserId(storeUserId)
    }
  }, [setUserId, storeUserId]
);

//DEFINE USESTATES
const [inputVideo, setInputVideo] = useState(null);  
const [isProcessing, setIsProcessing] = useState(false); 
const [videoName, setVideoName] = useState('');
const [popupVisible, setPopupVisible] = useState(false);
const [message, setMessage] = useState('');
const [progress, setProgress] = useState(0);

    useEffect(()=>{
      const tokenExists = document.cookie.split('; ').some((cookie)=>cookie.startsWith('token='));
      if (!tokenExists){

        alert('must log in again');
        navigate('/login');
      }
    }, [navigate]);

    const handleDownload = () =>{
      const link = document.createElement('a');
      link.href=outputVideo;
      link.download='processed_video.mp4';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    };

  //function to call save video input
  const callSaveVideo = async () => {
        
    //get input
    const obj = {userId:storeUserId,
                filepath:outputVideo, //test si necesita el output video o necesita el data.videoUrl
                video_name:videoName};
    const js = JSON.stringify(obj);

    //send to endpoint aka backend
    try{
    const response = await fetch(`${apiUrl}/video/save_video`, {
        method: 'POST',
        body:js,
        headers:{
            'authorization': `Bearer ${storedToken}`,
            'Content-Type':'application/json'
            
        }
    });

    //check response
    if (response.status===200){
      setMessage('successfully saved');
    }else if(response.status===400){
      setMessage('video already saved or name already used');
    }else{
      setMessage('unknown error');
    }
    }catch(error){
        console.error('Error:', error);
    }
  };
    //MAKE PAGE
    return ( 
      <div className="min-h-screen bg-black text-white px-4 py-8">
    {/* Alert Message for Cloud Status 
    <div className={`
      text-center py-2 
      ${!isDisabled ? 'bg-red-600' : 'bg-green-600'}
    `}>
      {!isDisabled ? "ALERT: Cloud Storage is not active" : "ALERT: Cloud Storage is active"}
    </div>
      */}
    {/* Header Section */}
    <div className='flex justify-between items-center mb-8'>
      {/*<h1 className='text-4xl font-bold'>TrackMate</h1>*/}
      <Logout />
    </div> 

      {/*
      <div className="mb-8 text-center">
        <Link to='/video'>
          <button disabled={!isDisabled} className={`
            px-6 py-3 rounded-lg 
            ${isDisabled 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
            transition-colors
          `}>Cloud-Saved Videos</button>
        </Link>
      </div>

      */}

    <main className="max-w-4xl mx-auto">   
      {/* Video Upload Section */}
      <h2 className='text-2xl font-semibold text-center mb-6'>Upload Video Below</h2>

      <Process_saveVideo 
        setVideoURL={setVideoURL} 
        setOutputVideo={setOutputVideo}
        outputVideo={outputVideo}
        videoURL={videoURL}
      />

      {/* Processed Video Section */}
      {outputVideo && ( 
        <div className="space-y-6"> 
          <h3 className="text-xl font-medium text-center">Processed Video</h3>
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"> 
            <video className="w-full h-full object-contain" controls> 
              <source src={outputVideo} type="video/mp4" /> 
              Your browser does not support the video tag. 
            </video>
          </div>

          <div className="flex justify-center space-x-4">
            <button onClick={handleDownload} className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
              Download Processed Video
            </button>
            {/*
            <button onClick={()=>setPopupVisible(true)} className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
              Save Processed Video
            </button>*/}
          </div>

          {popupVisible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
              <div className="bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-8 relative">
              <button 
                  onClick={() => {setPopupVisible(false); setMessage('')}}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  Close
                </button>

                <h3 className="text-2xl font-bold text-white mb-6 text-center">Enter Video Name</h3>
                <input 
                  type='text'
                  value={videoName}
                  onChange={(e)=>setVideoName(e.target.value)}
                  placeholder='Video Name'
                  className="w-full p-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white outline-none mb-4"
                />
              <div className="flex space-x-4">
            <button onClick={callSaveVideo} className="w-full py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors">Save</button>
            
            <button onClick={()=>{setPopupVisible(false); setMessage('')}} className="w-full py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">Cancel</button>
            </div>
            {message && <p className='message'>{message}</p>}
          </div>
          </div>
        )}
       </div>
        
      )}
      
    </main> 
  </div>
    );

  }

  export default HomePage; 