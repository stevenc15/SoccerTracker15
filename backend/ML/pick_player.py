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
    
    print(outputP)
    sys.stdout.flush()
    # Initialize tracker, given yolo model path
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'models/best.pt'))
    tracker = Tracker(model_path)
    tracker.model.conf=0.1

    #open video file and get first frame
    cap = cv2.VideoCapture(inputP) 
    
    frames = [] 
    
    while True: 
        ret, frame = cap.read()
        if not ret: 
            break
        frames.append(frame)    
    cap.release()
    
    #process first frame
    first_frame = frames[0]
    frame_rgb=cv2.cvtColor(first_frame, cv2.COLOR_BGR2RGB)
    
    tracking_results = tracker.model.track(frame_rgb, persist=True)

    #Collect information about detected objects (bounding box and ID)
    detections=[]
    
    for result in tracking_results[0].boxes:
        bbox=result.xyxy[0].cpu().numpy()
        obj_id=result.id.item()
        detections.append({'id': obj_id, 'bbox': bbox})
        
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