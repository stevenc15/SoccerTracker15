//token verification es un PROBLEMA
//all endpoints checked for, no major adjustments needed, but still could adjust
const express = require('express');
const router = express.Router()
const multer = require('multer'); // Import Multer, a middleware for handling multipart/form-data (used for file uploads)
const path = require('path'); // Import the path module to handle file paths across different OS platforms
const { processVideo } = require('../Routes_help/videoProcessor'); // Import the custom video processing function
const {pick_p} = require('../Routes_help/pickPlayer');
const {send_completion_email} = require('../Routes_help/v_email'); //send verification email
const {convertToH264} = require("../Routes_help/convert_video"); //convert video to valid format for website display
const Video = require('../Schemas/VideoSchema'); //video model
const User = require('../Schemas/UserSchema'); //user model
// Configure multer to store uploaded files in the 'inputs' folder temporarily
const input = multer({ dest: './inputs' }); // Multer stores uploaded files in the '/inputs' directory

const verifyToken = require ('../Routes_help/jwt'); //create helper function `for jwts
const {Op} = require('sequelize'); //operator from sequelize module
const dotenv = require('dotenv');
dotenv.config({path: '../backend_details.env'});

const {setVideoFrames, getVideoFrames} = require('../Routes_help/video_utils')
const ffmpeg = require('fluent-ffmpeg');
const useCloud = process.env.USE_CLOUD===true;
//CHECKED for 200, 500

router.post('/process_video', verifyToken, input.single('video'), async(req, res) => { //fix verify token
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    try{
        //add user id as parameter
        //define paths for input and output
        const inputPath = req.file.path; //file path for input from input.single to req
        const outputPath = path.join(__dirname, 'outputs', req.file.filename + '.mp4'); // Set the output path for the processed video file in the 'outputs' folder
        const converted_outputPath = path.join(__dirname, 'outputs', req.file.filename + 'CONV.mp4'); // Set the output path for the converted video file in the 'outputs' folder
        const targetID = req.body.targetID;
        console.log("id to be tracked by model: ", targetID);
        ffmpeg(inputPath)
            .ffprobe(0, (err, metadata)=>{

                if (err){
                    console.error("Error extracting metadata:", err);
                    return res.status(500).send("Error processing video");
                }
                const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
            if (videoStream) {
                const totalFrames = Math.floor(videoStream.duration * videoStream.r_frame_rate.split('/')[0]);
                setVideoFrames(totalFrames); // Set the global frame count
                console.log(`Video has ${totalFrames} frames`);
            } else {
                console.log("No video stream found");
            }
            });
        console.log(inputPath);
        console.log(outputPath);

        // Process the video using the custom 'processVideo' function
        await processVideo(inputPath, outputPath, targetID); 
        
        //convert video to playable format for output preview
        await convertToH264(outputPath, converted_outputPath);
        
        //path to be returned
        const videoUrl = `/outputs/${req.file.filename}CONV.mp4`;

        
        res.status(200).json({ videoUrl});
    }catch(error){
        console.error(error); // Log any errors to the console
        res.status(500).send('Error processing video'); // Send an error response with HTTP status code 500 if something goes wrong
    }
});

router.post('/gen_first_frame', input.single('video'), async(req, res) => { //fix verify token
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    try{
        //add user id as parameter
        //define paths for input and output
        const inputPath = req.file.path; //file path for input from input.single to req
        const outputPath = path.join(__dirname, 'first_frame', req.file.filename + '.png'); // Set the output path for the processed video file in the 'outputs' folder
        //const converted_outputPath = path.join(__dirname, 'first_frame', req.file.filename + 'CONV.mp4'); // Set the output path for the converted video file in the 'outputs' folder

        ffmpeg(inputPath)
            .ffprobe(0, (err, metadata)=>{

                if (err){
                    console.error("Error extracting metadata:", err);
                    return res.status(500).send("Error processing video");
                }
                const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
            if (videoStream) {
                const totalFrames = Math.floor(videoStream.duration * videoStream.r_frame_rate.split('/')[0]);
                setVideoFrames(totalFrames); // Set the global frame count
                console.log(`Video has ${totalFrames} frames`);
            } else {
                console.log("No video stream found");
            }
            });

        console.log('Input Path:', inputPath);
        console.log('Output Path:', outputPath);

        await pick_p(inputPath, outputPath);
        console.log('script ran successfully');
        //path to be returned
        const frameUrl = `/first_frame/${req.file.filename}.png`;
        console.log('frame url: ', frameUrl);
        
        res.status(200).json({ frameUrl});
    }catch(error){
        console.error(error); // Log any errors to the console
        res.status(500).send('Error processing first frame'); // Send an error response with HTTP status code 500 if something goes wrong
    }
});

router.post('/send_completion', async(req, res)=> {
    try{
        const {userId} = req.body;
        const user = await User.findOne({where:{userId:userId}});

        const email = user.email;

        send_completion_email(email);
        res.status(200).json({message: 'success'})
    }catch(error){

        res.status(500).json({error: 'email notification not sent'});
    
    }

    
});

router.get('/download_video', verifyToken, async(req, res)=>{
    try{

        const {userId, video_name} = req.body;
        const video = await Video.findOne({where: {userId:userId,
                                                video_name:video_name
        }});

        res.status(200).send(video.Url);
    }catch(error){
        res.status(500).send(error);
    }
});
module.exports=router;