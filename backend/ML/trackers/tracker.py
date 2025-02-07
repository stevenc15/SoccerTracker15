from ultralytics import YOLO
import supervision as sv
import pickle
import os
import numpy as np
import sys
import pandas as pd
sys.path.append('../')
#from utils import get_center_of_bbox, get_bbox_width, get_foot_position
import cv2
import time
import json
#from deep_sort_realtime.deepsort_tracker import DeepSort

class Tracker ():
    def __init__(self, model_path):
        self.model=YOLO(model_path)
        self.selected_id=None
