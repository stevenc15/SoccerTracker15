# TrackMate
A machine-learning based tracking application that will highlight a specific player from video input from a real-life soccer game. It provides the user with the selection of which player they would like to track, and adds a distinguishing feature to said player to essentially highlight the player throughout the video.
## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development Process](#development-process)
- [Challenges and Learnings](#challenges-and-learnings)

## Features
- User creation and account initialization for application permissions
- Accepts videos in MP4 format, performing best with 30 second snippets for specific player tracking
- Processess input video and returns video with annotations for visual tracking
- Processed videos include red triangle indicator for the selected player 
- Videos are available for direct download
- Preview windows are provided for both input and output

## Technologies Used
- Frontend: React, React-Router-Dom, bootstrap, React-Dropzone
- Backend: Express, Node.js, jsonwebtoken (for user authentication and session management), bycrypt (for password hashing and security)
- Machine Learning: Python(YOLOV5 via Ultralytics, OpenCv, NumPy, scikit-learn, pickle, Supervision)
- Database: MySql

## Replicating the project
- git clone this repo using the repo url: git clone <repo url> (make sure you are using the public branch)
- in general project directory: directory npm install
- navigate frontend: run npm install 
- create virtual environment: navigate: backend/Routes_help, run the following:
   - python3.11 -m venv virtual_e
   - source virtual_e/bin/activate
   - pip install -r ../v_e_utils/requirements_original.txt
- start node app: navigate to frontend folder and run: npm start 
- start backend server - navigate to backend folder and run: node server.js



## Usage
- Open app on landing page, login or register
- On home page, enter input video (single video), hit 'pick player' button, input preview video is up
- Processed first frame is returned with bounding boxes and IDs for each detected player
- Choose an ID and enter the ID in 'Select target ID'
- Hit 'Start Processing Video' button and wait for tracking to be done
- Once video is processed, preview for output is produced, download options available for video
- In output preview window, observe how the player is highlighted for entirety of video
  
## Project Structure
```bash
TrackMate/
├── backend
│   ├── ML
│   ├── Routes
│   ├── Routes_help
│   ├── Schemas
│   ├── __tests__
│   ├── backend_details.env
│   ├── cloud_database
│   ├── database
│   ├── docker_details.env
│   ├── inputs
│   ├── server.js
│   └── v_e_utils
├── db_init
│   └── init.sql
├── frontend
│   ├── frontEnd.env
│   ├── inputs
│   ├── node_modules
│   ├── public
│   └── src
|       ├── App.css
│       ├── App.js
│       ├── Apptest.js
│       ├── components
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── pages
│       ├── reportWebVitals.js
│       ├── setupTests.js
|       ├── package-lock.json
|       ├── package.json
│       └── tailwind.config.js
├── .dockerignore
├── .gitattributes
├── docker-compose.yaml
├── docker.README.md
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
└── yolov8s.pt
```


## Development Process
- **Backend**: Set up backend server using express, create user and video-related endpoints, initialize database creation leveraging MySql,
  Unit tests created for each endpoint. User authentication and server session management enabled through jsonwebtokens.
- **Frontend**: Utilizing React, pages were organized and developed with components utilized in each page and created using React-Dropzone and React-Router-Dom
- **Model Integration**: Leveraged YOLOV5 to create a trained model to identify players, creating annotations that track the desired player
- **Replication**: Docker setup for replication of app

## Development Timeline

*NOTICE: This project was worked on and developed outside of a repository meaning that local system file setup was used. This was a mistake in hindsight as the developer because a git repository would have allowed for better version control and file management.

- August 21st to October 5th: Model Development. Machine-Learning based tracking model implemented and used within a virtual environment. YOLOv5 model used to get basic tracking of persons on video, with functions created to modify notations of bounding boxes, and annotate the highlighted and selected player.
- October 5th to October 7th: React app initialized, overall app design and features designed.
- October 7th to October 12th: Backend server created, user and video related endpoints created.
- October 12th to October 19th: Database configuration setup. MySQL used as database framework.
- October 19th to October 23rd: Unit tests for each endpoint created.
- October 23rd to October 25th: Local MySQL database created and used for testing purposes and to lessen cloud storage costs.
- October 25th to November 14th: Frontend service connected to backend server and API endpoints used for said connection. User management and Video processing
  functionalities implemented as to allow purposeful communication between the frontend and backend.
- November 14th to November 21st: Frontend UI designed and implemented. Testing of app functionality as 'user' done.
  
## Challenges and Lessons
- **Unit Tests**: When testing, creating a mock database would have been helpful and testing endpoint behavior more thouroughly, not only setup logic
- **Docker Setup**: Best practice to separate application components into different containers (frontend, backend, database)
- **Frontend Styling**: More packages should have been used and researched upon for a more dynamic presentation of product
- **Port Distribution**: Better understanding of port setup would have sped up whole development process
