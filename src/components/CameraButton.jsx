import React, { useRef } from "react";

const TakePhoto = () => {
  const canvasRef = useRef(null);

  const takePhoto = async () => {
    try {
      // Access the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      // Create a canvas to capture the photo
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Capture the photo
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Stop the camera stream
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());

      alert("Photo captured!");
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please grant permission.");
    }
  };

  return (
    <div>
      <h2>Take a Photo</h2>
      <button onClick={takePhoto}>Open Camera & Take Photo</button>
      <canvas ref={canvasRef} style={{ display: "block", marginTop: "20px", border: "1px solid black" }} />
    </div>
  );
};

export default TakePhoto;
