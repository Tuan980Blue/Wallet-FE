import { useRef, useEffect, useState } from 'react';
import { FaCameraRetro } from "react-icons/fa";
import * as faceapi from 'face-api.js';

const CameraModal = ({ isOpen, onClose, onCapture, userID }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isChecking, setIsChecking] = useState(false);
  const [faceCheckInterval, setFaceCheckInterval] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        console.log('Models loaded');
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };
    loadModels();

    return () => {
      if (faceCheckInterval) {
        clearInterval(faceCheckInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      startVideo();
    } else {
      stopVideo();
    }
  }, [isOpen]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      const interval = setInterval(checkFace, 1000);
      setFaceCheckInterval(interval);
    } catch (err) {
      console.error("Cannot open camera:", err);
    }
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (faceCheckInterval) {
      clearInterval(faceCheckInterval);
    }
    setError(""); 
  };

  const checkFace = async () => {
    if (!videoRef.current) return;

    try {
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections.length !== 1) {
        setError("Làm ơn hãy để khuôn mặt bạn vào khung hình");
      } else {
        setError(""); 
      }
    } catch (error) {
      console.error('Error checking face:', error);
    }
  };

  const handleCapture = async () => {
    setIsChecking(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const detections = await faceapi.detectAllFaces(
      canvas,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (detections.length !== 1) {
      setIsChecking(false);
      setError("Làm ơn hãy để khuôn mặt bạn vào khung hình");
      return;
    }

    context.font = '20px Arial';
    context.fillStyle = 'white';
    context.fillText(userID, 10, canvas.height - 10);

    const dataUrl = canvas.toDataURL('image/png');
    onCapture(dataUrl);
    onClose();
    stopVideo();
    setIsChecking(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="bg-white rounded-lg p-4 relative">
        <video ref={videoRef} style={{ width: '100%', height: '100%' }} autoPlay muted></video>
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
          onClick={onClose}
        >
          &#x2715;
        </button>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="absolute bottom-11 mb-1 left-0 right-0 flex justify-center"
        onClick={handleCapture}
        disabled={isChecking || error}>
          <div className="relative">
            <div className="absolute -top-1 -left-1 w-14 h-14 rounded-full border-2 border-gray-300"></div>
            <button
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-500"
            >
              {isChecking ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700" />
              ) : (
                <FaCameraRetro className="text-gray-700 text-xl" />
              )}
            </button>
          </div>
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
};

export default CameraModal;
