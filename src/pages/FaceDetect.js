import React, { Component, createRef } from 'react';
import * as faceapi from 'face-api.js';

class FaceRecognition extends Component {
  constructor(props) {
    super(props);
    this.videoRef = createRef();
    this.state = {
      modelsLoaded: false,
      labeledFaceDescriptors: null,
      recognizedName: 'No face detected', // State untuk menyimpan nama yang terdeteksi
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
    const labels = ['andij', 'fahmi', 'ziea', 'amak', 'ayas', 'faiz', 'duta']; // Nama label atau nama karyawan
    return Promise.all(
      labels.map(async (label) => {
        const imgUrl = `${process.env.PUBLIC_URL}/known_faces/${label}.jpg`;
        const img = await faceapi.fetchImage(imgUrl);
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
    setInterval(async () => {
      if (this.videoRef.current) {
        const detections = await faceapi.detectAllFaces(
          this.videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptors();

        if (detections.length > 0) {
          const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);
          this.setState({ recognizedName: bestMatch.toString() }); // Update recognized name
        } else {
          this.setState({ recognizedName: 'No face detected' });
        }
      }
    }, 1000);
  };

  render() {
    return (
      <div>
        <h2>Face Recognition</h2>
        <h4 className='mt-3'>Terdeteksi sebagai: {this.state.recognizedName}</h4> {/* Tampilkan nama yang terdeteksi */}
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