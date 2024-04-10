from flask import Flask, render_template, Response
from dotenv import load_dotenv
import os
import cv2

load_dotenv()

app = Flask(__name__,static_folder='../static',template_folder='../templates')

def generate_frames(): 
    stream = cv2.VideoCapture('http://192.168.1.9:8080/video')
    while True:
        success, frame = stream.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/video")
def video():
    return render_template('video.html')
if __name__ == '__main__':
    app.run(debug=True,port=os.getenv('FLASK_PORT'))
