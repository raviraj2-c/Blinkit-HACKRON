import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Camera, AlertTriangle } from 'lucide-react';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [isSadExpression, setIsSadExpression] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
        
        // Load models sequentially to better handle errors
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        
        setIsModelLoading(false);
        startVideo();
      } catch (error) {
        console.error('Error loading models:', error);
        setLoadingError('Failed to load AI models. Please refresh the page to try again.');
        setIsModelLoading(false);
      }
    };

    loadModels();

    // Cleanup function to stop video stream
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ 
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      }
    })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
        setLoadingError('Failed to access camera. Please ensure camera permissions are granted.');
      });
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    const interval = setInterval(async () => {
      if (canvasRef.current && videoRef.current) {
        canvasRef.current.innerHTML = '';
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
          .withFaceLandmarks()
          .withFaceExpressions();

        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        // Check for sad expression
        if (resizedDetections.length > 0) {
          const expressions = resizedDetections[0].expressions;
          setIsSadExpression(expressions.sad > 0.5);
        } else {
          setIsSadExpression(false);
        }

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw video frame
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        // Draw detection canvas on top
        ctx.drawImage(canvasRef.current, 0, 0);
        
        // Create download link
        const link = document.createElement('a');
        link.download = `face-detection-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Face Recognition App</h1>
          {isModelLoading && (
            <div className="text-xl text-blue-400">Loading AI models...</div>
          )}
          {loadingError && (
            <div className="text-xl text-red-400 mt-4">{loadingError}</div>
          )}
        </div>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onPlay={handleVideoPlay}
            className="w-full rounded-lg shadow-xl"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            {isSadExpression && (
              <a
                href="https://nimble-mooncake-b392c4.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-colors flex items-center gap-2"
              >
                <AlertTriangle size={24} />
                <span className="mr-2">Alert: Sad Expression Detected</span>
              </a>
            )}
            {isVideoPlaying && !loadingError && (
              <button
                onClick={captureImage}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors"
              >
                <Camera size={24} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          {!loadingError ? (
            <>
              <p>Face detection will start automatically when the camera is ready.</p>
              <p>Click the camera button to capture the current frame with detections.</p>
              {isSadExpression && (
                <p className="text-red-400 mt-2">⚠️ Sad expression detected! Click the alert button to view details.</p>
              )}
            </>
          ) : (
            <p>Please refresh the page to try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;