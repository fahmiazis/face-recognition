import React, { Component, createRef } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
const REACT_APP_PHOTO_URL = process.env

class FaceRecognition extends Component {
  constructor(props) {
    super(props);
    this.videoRef = createRef();
    this.state = {
      modelsLoaded: false,
      labeledFaceDescriptors: null,
      recognizedName: 'No face detected', // State untuk menyimpan nama yang terdeteksi
      blinkDetected: false, // State untuk menyimpan status kedipan
      numEyeRight: 0,
      numEyeLeft: 0
    };
  }

  async componentDidMount() {
    const MODEL_URL = `${process.env.PUBLIC_URL}/models`;

    // Load models for face detection and recognition
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)

    // Load known faces
    const labeledFaceDescriptors = await this.loadLabeledImages();
    this.setState({ labeledFaceDescriptors, modelsLoaded: true }, this.startVideo);
  }

  loadLabeledImages = async () => {
    const data = new URLSearchParams(window.location.search)
    const photo = data.get("photo") === undefined || data.get("photo") === null ? 'ayas' : data.get("photo") 
    const labels = [`${photo}`]
    console.log(labels[0])
    // const labels = ['andij', 'fahmi', 'ziea', 'amak', 'ayas', 'faiz', 'duta']
    return Promise.all(
      labels.map(async (label) => {
        // const imgUrl = `${process.env.PUBLIC_URL}/known_faces/${label}.jpg`;
        const imgUrl = `http://localhost:1000/storage/uploads/murid/${label}`;
        const response = await axios.get(imgUrl, {
          responseType: 'blob', // Ambil gambar dalam bentuk binary data (Blob)
        });
    
        // Buat URL gambar dari Blob
        const imageURL = URL.createObjectURL(response.data);
  
        const img = await faceapi.fetchImage(imageURL);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        return new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]);
      })
    );
  };

  startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        this.videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Error accessing webcam:", err));
  };

  handleVideoPlay = () => {
    const { labeledFaceDescriptors } = this.state;
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    // Start detection once the video is playing
    const intervalId = setInterval(async () => {
      if (this.videoRef.current && this.state.modelsLoaded) {
        const detections = await faceapi.detectAllFaces(
          this.videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptors();

        if (detections.length > 0) {
          const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);
          this.setState({ recognizedName: bestMatch.toString() }); // Update recognized name
          
          // Get landmarks to detect blink
          const landmarks = detections[0].landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();
          
          const leftEAR = this.getEyeAspectRatio(leftEye);
          const rightEAR = this.getEyeAspectRatio(rightEye);

          console.log(leftEAR)
          console.log(rightEAR)

          // Threshold untuk mendeteksi kedipan
          const blinkThreshold = 0.28;
          const blinkDetected = leftEAR <= blinkThreshold || rightEAR <= blinkThreshold;
          
          this.setState({ blinkDetected });
        } else {
          this.setState({ recognizedName: 'No face detected', blinkDetected: false });
        }
      }
    }, 1000);

    // Clear the interval when the component unmounts
    this.videoRef.current.onpause = () => clearInterval(intervalId);
  };

  // Fungsi untuk menghitung Eye Aspect Ratio (EAR)
  getEyeAspectRatio(eye) {
    const dist = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

    const A = dist(eye[1], eye[5]);
    const B = dist(eye[2], eye[4]);
    const C = dist(eye[0], eye[3]);

    return (A + B) / (2.0 * C);
  }

  render() {
    const data = new URLSearchParams(window.location.search)
    console.log(data)
    const name = data.get("name")
    const nisn = data.get("nisn") 
    return (
      <div>
        <h2>Face Recognition {name === undefined ? '' : name}</h2>
        <p>{this.state.recognizedName}</p> {/* Tampilkan nama yang terdeteksi */}
        <p>{this.state.blinkDetected ? 'Blink detected!' : 'No blink'}</p> {/* Tampilkan status kedipan */}
        {!this.state.modelsLoaded ? (
          <p>Loading models, please wait...</p>
        ) : (
          <video
            ref={this.videoRef}
            autoPlay
            onPlay={this.handleVideoPlay}
            style={{ width: '100%', height: '600px' }}
          />
        )}
      </div>
    );
  }
}

export default FaceRecognition;