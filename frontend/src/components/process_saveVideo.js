import React, {useState, useEffect} from 'react';
import Upload from './Upload';
import {useApp} from './appContext';
import {getCookie} from './cookieUtils';
import {CircularProgress} from '@mui/material';
//import './stylings/process_saveVideo.css';
const apiUrl = 'https://soccertracker15-production.up.railway.app';

const Process_saveVideo = ({setVideoURL, videoURL, setOutputVideo, outputVideo}) =>{
  
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
  const [playerPicked, setPlayerPicked] = useState(false);  
  const [isProcessing, setIsProcessing] = useState(false); 
  const [isProcessingFirstFrame, setIsProcessingFirstFrame] = useState(false); 
  const [videoName, setVideoName] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [firstFrame, setFirstFrame] = useState(null);
  const [targetID, setTargetID] = useState('');
  const [submittedID, setSubmittedID] = useState('');


  //FUNCTION TO HANDLE DROPPING/UPLOADING FILE
  const handleDrop = (acceptedFiles) => { 
    setInputVideo(acceptedFiles[0]); 
    setVideoURL(URL.createObjectURL(acceptedFiles[0])); 
  }; 

  //FUNCTION TO PROCESS VIDEO
  const handleProcessVideo = async () => { 
    console.log('inputVideo:',inputVideo);
    setIsProcessing(true); //FLAG

   
    //PREPARE DATA
    const formData = new FormData(); 
    formData.append('video', inputVideo);
    formData.append('targetID', submittedID);
    //NOTIFY PROCESSING
    console.log("Processing started for:", inputVideo.name);

    const storedToken = getCookie('token');
    //CALL ENDPOINT
    const response = await fetch(`video/process_video`, { 
      method: 'POST', 
      body: formData, 
      headers: {
        'Authorization': `Bearer ${storedToken}`
      }
    });

    setIsProcessing(false);//FLAG 

    //CHECK FOR ERROR/PASS
    if (response.ok) { 
      //const outputVideoURL = `http://localhost:5001/Routes/outputs/${filename}.mp4`//URL.createObjectURL(await response.blob()); 
      const data = await response.json();
      console.log('Processed video URL:',data.videoUrl);
      setOutputVideo(`${apiUrl}/${data.videoUrl}`);
      console.log('Output video set to:', `${apiUrl}/${data.videoUrl}`);
    } else {
      setIsProcessing(false); 
      console.error('Error processing video'); 
    }
  };



  //FUNCTION TO PROCESS first frame
  const handleFirstFrame = async () => { 
    console.log('inputVideo:',inputVideo);
    setIsProcessingFirstFrame(true); //FLAG
   
    //PREPARE DATA
    const formData = new FormData(); 
    formData.append('video', inputVideo);

    //NOTIFY PROCESSING
    //console.log("Processing started for:", inputVideo.name);

    const storedToken = getCookie('token');
    //CALL ENDPOINT
    const response = await fetch(`video/gen_first_frame`, { 
      method: 'POST', 
      body: formData, 
      headers: {
        'Authorization': `Bearer ${storedToken}`
      }
    });
    console.log('Response Status:', response.status);

    setIsProcessingFirstFrame(false); 

    //CHECK FOR ERROR/PASS
    if (response.ok) { 
      //const outputVideoURL = `${apiUrl}/Routes/outputs/${filename}.mp4`//URL.createObjectURL(await response.blob()); 
      const data = await response.json();
      console.log('Processed first frame URL:',data.frameUrl);
      setFirstFrame(`${apiUrl}/${data.frameUrl}`);

      console.log('Output video set to:', `${apiUrl}/${data.frameUrl}`);
    } else {
      //setIsProcessing(false); 
      const errorData = await response.text();
      console.error('Error processing first frame', errorData); 
    }
  };


  //function to send completion email
  const callCompletion = async () => {
        
    //get input
    const obj = {userId:storeUserId
                };
    const js = JSON.stringify(obj);

    //send to endpoint aka backend
    try{
    const response = await fetch(`video/send_completion`, {
        method: 'POST',
        body:js,
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${storedToken}`
        }
    });

    //check response
    if (response.status===200){
      setMessage('successfully notified');
    }else{
      setMessage('unknown error');
    }
    }catch(error){
        console.error('Error:', error);
    }
  };

 // Handle form submission for ID
 const handleSubmit = (e) => {
  e.preventDefault();
  console.log(`User selected target ID: ${targetID}`);
  // You can use the ID and coordinates here, e.g., send to backend
  //alert(`Target ID: ${targetID}`);
  setSubmittedID(targetID)
  setPlayerPicked(true);
};
  useEffect(()=>{
    if (outputVideo){
      callCompletion();
    }
  }, [outputVideo]);
  
  // Log the updated state inside useEffect
  useEffect(() => {
  if (firstFrame) {
      console.log('Updated first frame:', firstFrame);
  }
}, [firstFrame]); 
  return(

    <div className="max-w-4xl mx-auto">
        <Upload onDrop={handleDrop} className="mb-6"/>
        {inputVideo && (
          <p className='text-center mb-4 text-gray-700'>
          Uploaded file: {inputVideo.name} <br />
          <span className='text-sm text-gray-500'>(Once video is processed, it can be found at the bottom of the page)</span>
          </p>
        )}
        {/* Video Preview Section */}
       {inputVideo && ( 
        <div className="mb-8"> 
          <h3 className='text-xl font-medium mb-4 text-center'>Input Video</h3>
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"> 
          <video className="w-full h-full object-contain" controls> 
            <source src={videoURL} type="video/mp4" /> 
            Your browser does not support the video tag. 
          </video>
          </div>
        </div>
      )}

        {/* button to generate first processed frame*/}
        <div className="text-center mb-6">
 <button 
   onClick={handleFirstFrame} 
   disabled={!inputVideo || isProcessing || isProcessingFirstFrame || firstFrame} 
   className={`
     px-12 py-6 text-xl font-medium rounded-lg mb-4
     shadow-lg hover:shadow-xl
     transform hover:scale-105
     ${inputVideo && !isProcessing && !playerPicked && !isProcessingFirstFrame && !firstFrame
       ? 'bg-gray-800 text-white hover:bg-gray-700' 
       : 'bg-white text-gray-500 cursor-not-allowed'}
     transition-all duration-200 ease-in-out
   `}
 >
   Pick Player 
 </button>
</div>

{isProcessingFirstFrame && (
          <div className='text-center'>
          <p className='text-gray-700 mb-4'>Creating IDs for each player </p> 
          <div className='flex justify-center'>
          <CircularProgress/>
          </div>
          </div>

        )}
      
      <div>
        {firstFrame && (
          <div className="w-full rounded-2xl overflow-hidden mb-8">
          <img
            src={firstFrame}
            alt="Processed Frame"
            className='w-full h-full object-contain'
          />
      </div>
        )}
      </div> 
      
      {firstFrame && (
 <div className="max-w-4xl mx-auto mt-8">
   <div className="grid grid-cols-1 gap-6">
     
     
     <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl">
       <div className="space-y-4">
         <h3 className="text-2xl font-bold text-white text-center mb-4">
           Enter Target Player ID
         </h3>
         
         <input
           type="text"
           value={targetID}
           onChange={(e) => setTargetID(e.target.value)}
           placeholder="Player ID"
           className="w-full p-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white outline-none"
         />
         
         <button 
           type="submit" 
           className="w-full py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
         >
           Track Player
         </button>
       </div>
       
       {submittedID && (
         <p className="text-center text-gray-400 mt-4">
           Selected Player ID: {submittedID}
         </p>
       )}
     </form>
   </div>
 </div>
)}

      {playerPicked && (
        <div className="text-center mb-6">
        <button 
            onClick={handleProcessVideo} 
            disabled={isProcessing || !playerPicked} 
            className={`
              px-12 py-6 text-xl font-medium rounded-lg mt-5
              ${inputVideo && !isProcessing 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-gray-500 cursor-not-allowed'}
                transition-colors
              `}
      >
        Start Processing Video
      </button>
        </div>
        )}


        {isProcessing && (
          <div className='text-center'>
          <p className='text-gray-700 mb-4'>Processing your video, please wait</p> 
          <div className='flex justify-center'>
          <CircularProgress/>
          </div>
          </div>

        )}

    </div>
    
  );

};
export default Process_saveVideo;