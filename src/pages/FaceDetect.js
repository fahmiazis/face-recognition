import React, { Component, createRef } from 'react';
import * as faceapi from 'face-api.js';
import { Modal, ModalBody, Button } from 'reactstrap'
import axios from 'axios';
const REACT_APP_PHOTO_URL = process.env
const url_ngrok = 'https://8c6a-182-3-105-104.ngrok-free.app'
const url_absen = 'http://localhost:8000'

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
      numEyeLeft: 0,
      openAbsen: false,
      gpsLatitude: null,
      gpsLongitude: null,
      ipLatitude: null,
      ipLongitude: null,
      fakeDetected: false,
    };
  }

  async componentDidMount() {
    const MODEL_URL = `${process.env.PUBLIC_URL}/models`;

    // Load models for face detection and recognition
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)

    this.getIPLocation();
    this.getGPSLocation();

    // Load known faces
    const labeledFaceDescriptors = await this.loadLabeledImages();
    this.setState({ labeledFaceDescriptors, modelsLoaded: true }, this.startVideo);
  }

  componentDidUpdate() {
    const data = new URLSearchParams(window.location.search)
    const photo = data.get("photo") === undefined || data.get("photo") === null ? 'ayas' : data.get("photo") 
    const labels = [`${photo}`]
    if (this.state.openAbsen !== true) {
      if (this.state.recognizedName.split(' ')[0] === labels[0] && this.state.blinkDetected) {
        this.setState({openAbsen: !this.state.openAbsen})
      }
    }
  }

  loadLabeledImages = async () => {
    const data = new URLSearchParams(window.location.search)
    const photo = data.get("photo") === undefined || data.get("photo") === null ? 'ayas' : data.get("photo") 
    const labels = [`${photo}`]
    console.log(labels[0])
    // const labels = ['andij', 'fahmi', 'ziea', 'amak', 'ayas', 'faiz', 'duta']
    return Promise.all(
      labels.map(async (labels) => {
        //const imgUrl = `${process.env.PUBLIC_URL}/known_faces/duta.jpg`; //coba coba
        //const imgUrl = `${process.env.PUBLIC_URL}/known_faces/${labels}.jpg`;
        // const imgUrl = `http://localhost:8000/storage/uploads/murid/${labels}`
        const imgUrl = `${url_ngrok}/get-image/${labels}`
        const response = await axios.get(imgUrl, {
          responseType: 'blob',
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
    
        // Buat URL gambar dari Blob
        const imageURL = URL.createObjectURL(response.data);

        console.log("Status:", response.status);
        console.log(response);
  
        const img = await faceapi.fetchImage(imageURL);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        return new faceapi.LabeledFaceDescriptors(labels, [detections.descriptor]);
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

  goAbsen = () => {
    const data = new URLSearchParams(window.location.search);
    const nisn = data.get("nisn");
    const lokasi = data.get("lokasi");
    const absenMasuk = data.get("absen_masuk") === "true";
    const absenPulang = data.get("absen_pulang") === "true";

    // Jika sudah absen masuk dan pulang, langsung redirect ke dashboard Laravel
    if (absenMasuk && absenPulang) {
      window.location.href = `${url_absen}/dashboard`;
      return;
    }
    
    let absenType = "";
    if (!absenMasuk && !absenPulang) {
        absenType = "masuk";
    } else if (absenMasuk && !absenPulang) {
        absenType = "pulang";
    }
    
    window.location.href = `${url_absen}/presensi/create?nisn=${nisn}&absen=${absenType}&lokasi=${lokasi}`;
  }

  getGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setState({ gpsLatitude: latitude, gpsLongitude: longitude }, () => {
            this.checkFakeGPS();
          });
        },
        (error) => console.error("Gagal mengambil lokasi GPS:", error),
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation tidak didukung di browser ini.");
    }
  };

  getIPLocation = () => {
    axios
      .get("https://ip-api.com/json/")
      .then((response) => {
        const { lat, lon } = response.data;
        this.setState({
          ipLatitude: lat,
          ipLongitude: lon,
        });
      })
      .catch((error) => console.error("Gagal mengambil lokasi IP:", error));
  };

  checkFakeGPS = () => {
    const { gpsLatitude, gpsLongitude, ipLatitude, ipLongitude } = this.state;

    if (gpsLatitude && gpsLongitude && ipLatitude && ipLongitude) {
      const distance = this.calculateDistance(gpsLatitude, gpsLongitude, ipLatitude, ipLongitude);
      console.log(`Perbedaan lokasi: ${distance.toFixed(2)} km`);

      if (distance > 50) {
        this.setState({ fakeDetected: true });
      }
    }
  };

  calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius Bumi dalam km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Hasil dalam km
  };


  render() {
    const data = new URLSearchParams(window.location.search)
    console.log(data)
    const name = data.get("name")
    const photo = data.get("photo") === undefined || data.get("photo") === null ? 'ayas' : data.get("photo") 
    const absenMasuk = data.get("absen_masuk") === "true";
    const absenPulang = data.get("absen_pulang") === "true";
    const labels = [`${photo}`]

    const { gpsLatitude, gpsLongitude, ipLatitude, ipLongitude, fakeDetected } = this.state;

    if (fakeDetected) {
      return <h1>🚨 Fake GPS Terdeteksi! Akses Diblokir.</h1>;
    } else {
      return (
        <>
          {/* Header seperti gambar pertama */}
          <nav
            style={{
              backgroundColor: '#1976d2',
              color: '#fff',
              padding: '12px 20px',
              fontWeight: 'bold',
              fontSize: '14px',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {/* Tombol kembali */}
            <a
              href={`${url_absen}/presensi/create`}
              style={{
                color: '#fff',
                textDecoration: 'none',
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
              }}
            >
              &lt;
            </a>
            
            {/* Judul */}
            Halaman Face Recognition
          </nav>
        
          <div style={{
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f4f6f8',
            minHeight: '100vh'
          }}>
            <h4 style={{ color: '#333' }}>Verifikasi Wajah</h4>
            <h5 style={{ color: '#555' }}>{name === undefined ? '' : name}</h5>
        
            <p style={{ fontSize: '12px', marginBottom: '5px' }}>
              {this.state.recognizedName.split(' ')[0] === labels[0]
                ? `Terdeteksi Wajah ${name}`
                : 'Wajah Tidak Terdeteksi'}
            </p>
              
            <p style={{ fontSize: '14px', color: '#555' }}>
              {this.state.blinkDetected ? 'Kedipan Mata Terdeteksi!' : 'Tidak ada kedipan mata'}
            </p>
              
            {!this.state.modelsLoaded ? (
              <p style={{ fontSize: '20px', color: '#888' }}>Mohon perlihatkan wajah dan kedipkan mata anda di depan kamera</p>
            ) : (
              <video
                ref={this.videoRef}
                autoPlay
                onPlay={this.handleVideoPlay}
                style={{
                  width: '80%',
                  maxWidth: '720px',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 0 12px rgba(0,0,0,0.2)',
                  marginTop: '20px'
                }}
              />
            )}
          </div>
          
          <Modal isOpen={this.state.openAbsen}>
            <ModalBody style={{ textAlign: 'center' }}>
              {(!absenMasuk && !absenPulang) || (absenMasuk && !absenPulang) ? (
                <Button color='success' onClick={this.goAbsen}>Absen</Button>
              ) : (
                <>
                  <p>Anda sudah melakukan absen hari ini.</p>
                  <Button color='primary' onClick={this.goAbsen}>Kembali</Button>
                </>
              )}
            </ModalBody>
          </Modal>
        </>
      );
    }
  }
}

export default FaceRecognition;