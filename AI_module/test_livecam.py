from ultralytics import YOLO
import cv2
from matplotlib import pyplot as plt
import numpy as np
weight_path = 'model.pt'
model = YOLO(weight_path)
threshold = 0.5
cap = cv2.VideoCapture(0)
while True:
    try:
        ret, frame = cap.read()
        bboxes = model(frame, verbose=False)[0].boxes.data.tolist()
        count = 0
        for bbox in bboxes:
            x1, y1, x2, y2, score, class_id = bbox
            if score > threshold:
                count += 1
                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (255, 0, 255), 2)
            # pos = (50, 50)
            cv2.putText(frame, f'Number of face: {count}', (20, (frame.shape[0] - 20)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 1, cv2.LINE_AA)
            cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    except ValueError:
        break

cap.release()
cv2.destroyAllWindows()