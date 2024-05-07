import torch
from ultralytics import YOLO
import cv2

from matplotlib import pyplot as plt
import numpy as np
weight_path = 'last.pt'
def CountFace(img, threshold=0.5):
    model = YOLO(weight_path)
    img = cv2.imread(img)
    predict = model(img)
    bboxes = predict[0].Boxes.data.tolist()
    count = 0
    for bbox in bboxes:
        _, _, _, _, score, class_id = bbox
        if score > threshold:
            count += 1
    return count
print(CountFace(cv2.imread('face-1/train/labels/image_1704690587647_png.rf.7fcaa6d038164bd93b7e278a3c5b06f2.txt')))

