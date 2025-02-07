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

def draw_triangle(frame, bbox, color):
        y=int(bbox[1])
        x,_ = get_center_of_bbox(bbox)
        
        triangle_points= np.array([
            [x,y],
            [x-10, y-20],
            [x+10, y-20]
        ])
        
        cv2.drawContours(frame, [triangle_points], 0, color, cv2.FILLED)
        cv2.drawContours(frame, [triangle_points], 0, (0,0,0), 2)
        
        return frame
    
def get_center_of_bbox(bbox):
    x1, y1, x2, y2 = bbox
    return int((x1+x2)/2), int((y1+y2)/2)

                
def process_video(inputP, outputP, target_id):
    """
    Process a soccer video with selective tracking
    
    Args:
        video_path: path to input video
        output_path: path to save output video
    """
    print(f"Arguments received: {sys.argv}")
    sys.stdout.flush()  # Flush to ensure visibility
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
    
    #select_bbox(x, y, detections)
    #cv2.setMouseCallback("First Frame - Select Object", click_and_select, detections)
    selected_id=target_id
    print(f"selected id: {selected_id}")
    sys.stdout.flush()  # Flush to ensure visibility
    if selected_id is not None: 
        width=frames[0].shape[1]
        height=frames[0].shape[0]
        cap=cv2.VideoCapture(inputP)
        out=cv2.VideoWriter(outputP, cv2.VideoWriter_fourcc(*'mp4v'), 24, (width, height))
        
        while True: 
            ret, frame = cap.read()
            if not ret:
                break
            
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) 
            tracking_results = tracker.model.track(frame_rgb, persist=True)
            
            for result in tracking_results[0].boxes:
                
                obj_id=result.id.item()
                print(f"object id: {obj_id} (type: {type(obj_id)})")
                sys.stdout.flush()  # Flush to ensure visibility
                print(f"selected id: {selected_id} (type: {type(selected_id)})")
                sys.stdout.flush()  # Flush to ensure visibility
                if int(obj_id)==int(float(selected_id)):
                    print(f"MATCH")
                    
                    bbox= result.xyxy[0].cpu().numpy()
                    frame=draw_triangle(frame, bbox, (0, 0, 255))
                    """
                    cv2.rectangle(frame, 
                                  (int(bbox[0]), int(bbox[1])), 
                                  (int(bbox[2]), int(bbox[3])), 
                                  (0, 255, 0), 2)  # Green color for selected object
                    cv2.putText(frame, f"ID: {obj_id}", 
                                (int(bbox[0]), int(bbox[1] - 10)),
                                cv2.FONT_HERSHEY_SIMPLEX, 
                                0.9, (0, 255, 0), 2)
                    """
            out.write(frame)
            
        
        cap.release()
        out.release()
    
    else:
        print("no id selected, video not processed")
        
if __name__ == '__main__':
    inputP=sys.argv[1]
    
    outputP=sys.argv[2]
    
    target_id=sys.argv[3]

    process_video(inputP, outputP, target_id)