print("Script started successfully!")
#from utils import read_video, save_video
from trackers import Tracker
import cv2
#from team_assigner import Team_assigner
#from player_ball_assignment import PlayerBallAssigner

#from camera_movement_estimator import Camera_Movement_Estimator
#from view_transformer import View_Transformer
import numpy as np
#from speed_distance_estimator import SpeedDistanceEstimator
import sys
import os
from pathlib import Path
selected_id = None

                
def pick_p(inputP, outputP):
    """
    Process a soccer video with selective tracking
    
    Args:
        video_path: path to input video
        output_path: path to save output video
    """
    print("Script started...")  # This should always print if the script runs
    sys.stdout.flush()  # Ensure immediate printing

    # Print Python version and paths for debugging
    print(f"Python executable: {sys.executable}")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Arguments received: {sys.argv}")
    sys.stdout.flush()  # Flush to ensure visibility
    
    # Initialize tracker, given yolo model path
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'models/best.pt'))
    tracker = Tracker(model_path)
    tracker.model.conf=0.1
    print('Successfully grabbed model')
    sys.stdout.flush()
    
    #open video file and get first frame
    cap = cv2.VideoCapture(inputP, cv2.CAP_FFMPEG) 
    if cap.isOpened():
        print('Video opened successfully')
        sys.stdout.flush()
    else:
        print('Failed to open video')
        sys.stdout.flush()
        return
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"Total Frames: {total_frames}, FPS: {fps}")
    sys.stdout.flush()
        
    #collect frames
    frames = []
    frame_count = 0 
    while True: 
        ret, frame = cap.read()
        if not ret:
            print(f"Stopped at frame {frame_count}/{total_frames} (ret=False)")
            break   
        
        if frame is None:
            print(f"Frame {frame_count} is None, skipping...")
            continue

        frames.append(frame)
        frame_count += 1

        # Debug every 50 frames
        if frame_count % 50 == 0:
            print(f"Processed {frame_count}/{total_frames} frames...")
        
    cap.release()
    print('finished collecting frames ')
    sys.stdout.flush()
    
    #process first frame
    first_frame = frames[0]
    if not first_frame:
        print('first frame does not exists')
        sys.stdout.flush() 
    frame_rgb=cv2.cvtColor(first_frame, cv2.COLOR_BGR2RGB)
    
    tracking_results = tracker.model.track(frame_rgb, persist=True)
    print('processed first frame for bounding boxes')
    sys.stdout.flush()
    
    #Collect information about detected objects (bounding box and ID)
    detections=[]
    
    for result in tracking_results[0].boxes:
        bbox=result.xyxy[0].cpu().numpy()
        obj_id=result.id.item()
        detections.append({'id': obj_id, 'bbox': bbox})
    
    print('appending ids to bboxes')
    sys.stdout.flush()
    for obj in detections: 
        cv2.rectangle(first_frame, 
                      (int(obj['bbox'][0]), int(obj['bbox'][1])), 
                      (int(obj['bbox'][2]), int(obj['bbox'][3])), 
                      (255, 0, 0), 2)  # Blue color for bounding box
        cv2.putText(first_frame, 
                    f"ID: {int(obj['id'])}", 
                    (int(obj['bbox'][0]), int(obj['bbox'][1] - 10)),
                    cv2.FONT_HERSHEY_SIMPLEX, 
                    0.9, (255, 0, 0), 2)   
    
    print('drawing ids')
    sys.stdout.flush()
    
    success=cv2.imwrite(outputP, first_frame)
    if not success:
        raise IOError(f"Failed to save image to: {outputP}")
    check = cv2.imread(outputP)
    if check is None:
        print("no image is saved")
        sys.stdout.flush()
    print(f"Image saved to {outputP}")
    sys.stdout.flush()
    
if __name__ == '__main__':
    inputP=sys.argv[1]
    
    outputP=sys.argv[2]
    pick_p(inputP, outputP)