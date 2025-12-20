// src/components/RepCounter.tsx
/*
import React, { useRef, useEffect, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as posenet from "@tensorflow-models/posenet";

type Pose = posenet.Pose;

const RepCounter: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<posenet.PoseNet | null>(null);
  const [reps, setReps] = useState(0);
  const [phase, setPhase] = useState<"up" | "down" | "none">("none");
  const [feedback, setFeedback] = useState<string>("Stand in frame to begin.");
  const [running, setRunning] = useState(false);

  // Load model once
  useEffect(() => {
    const loadModel = async () => {
      const net = await posenet.load({
        architecture: "MobileNetV1",
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75,
      });
      setModel(net);
    };
    loadModel();
  }, []);

  // Start webcam
  const startCamera = async () => {
    if (!videoRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
      audio: false,
    });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
    setRunning(true);
  };

  // Main loop
  useEffect(() => {
    let animationId: number;

    const run = async () => {
      if (!model || !videoRef.current || !canvasRef.current || !running) {
        animationId = requestAnimationFrame(run);
        return;
      }

      const video = videoRef.current;
      const pose: Pose = await model.estimateSinglePose(video, {
        flipHorizontal: false,
      });

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

      drawSkeleton(ctx, pose);
      handleSquatLogic(pose);
      animationId = requestAnimationFrame(run);
    };

    const handleSquatLogic = (pose: Pose) => {
      const leftHip = getKeypoint(pose, "leftHip");
      const leftKnee = getKeypoint(pose, "leftKnee");
      const leftAnkle = getKeypoint(pose, "leftAnkle");

      if (!leftHip || !leftKnee || !leftAnkle) {
        setFeedback("Move fully into frame.");
        return;
      }

      // Calculate knee angle
      const angle = angleBetween(leftHip, leftKnee, leftAnkle); // hip-knee-ankle
      // Simple thresholds – tune experimentally
      const bottomThresh = 70; // deep squat
      const topThresh = 160;   // standing

      if (angle < bottomThresh && (phase === "up" || phase === "none")) {
        setPhase("down");
        setFeedback("Good depth, now drive up.");
      } else if (angle > topThresh && phase === "down") {
        setPhase("up");
        setReps(prev => prev + 1);
        setFeedback("Rep completed! Control the next one.");
        // Here you could emit an event to your backend:
        // sendRepEvent({ userId, exercise: "squat", timestamp: Date.now(), angle });
      } else {
        // Basic real-time posture hint
        if (angle > topThresh) {
          setFeedback("Go deeper for a proper squat.");
        } else {
          setFeedback("Hold strong posture.");
        }
      }
    };

    run();
    return () => cancelAnimationFrame(animationId);
  }, [model, running]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold text-white">AI Squat Rep Counter</h2>
      <div className="relative border border-slate-700 rounded-lg overflow-hidden">
        <video ref={videoRef} className="hidden" />
        <canvas ref={canvasRef} className="w-[640px] h-[480px]" />
        <div className="absolute top-2 left-2 bg-black/60 text-white px-3 py-1 rounded-lg">
          Reps: {reps}
        </div>
      </div>
      <p className="text-slate-200 text-sm">{feedback}</p>
      <button
        onClick={startCamera}
        className="px-4 py-2 rounded-md bg-emerald-500 text-white font-medium hover:bg-emerald-600"
      >
        Start Workout
      </button>
    </div>
  );
};

// ---- helpers ----
type KP = posenet.Keypoint;

function getKeypoint(pose: Pose, name: string): KP["position"] | null {
  const kp = pose.keypoints.find(k => k.part === name && k.score > 0.6);
  return kp ? kp.position : null;
}

function angleBetween(a: KP["position"], b: KP["position"], c: KP["position"]): number {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const magAB = Math.hypot(ab.x, ab.y);
  const magCB = Math.hypot(cb.x, cb.y);
  const cosine = dot / (magAB * magCB);
  return (Math.acos(Math.min(Math.max(cosine, -1), 1)) * 180) / Math.PI;
}

function drawSkeleton(ctx: CanvasRenderingContext2D, pose: Pose) {
  pose.keypoints.forEach(kp => {
    if (kp.score > 0.6) {
      ctx.fillStyle = "lime";
      ctx.beginPath();
      ctx.arc(kp.position.x, kp.position.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  });
}
export default RepCounter;
*/

import React, { useRef, useEffect, useState } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";

const RepCounter = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [reps, setReps] = useState(0);
  const [phase, setPhase] = useState("up"); 
  const [feedback, setFeedback] = useState("Position your camera...");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (!canvasRef.current || !videoRef.current) return;
      
      const ctx = canvasRef.current.getContext("2d");
      const { width, height } = canvasRef.current;
      
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(results.image, 0, 0, width, height);

      if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;
        const hip = landmarks[23]; // Left Hip
        const knee = landmarks[25]; // Left Knee

        // Calculate how "squatted" you are (0 to 1 scale)
        // Standing: vertical diff is large (~0.3)
        // Sitting: vertical diff is small (~0.05)
        const diff = knee.y - hip.y;
        
        // DRAW LANDMARKS
        ctx.fillStyle = "#10b981";
        [hip, knee].forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x * width, pt.y * height, 10, 0, 2 * Math.PI);
          ctx.fill();
        });

        // SQUAT LOGIC
        // Lower threshold (Sitting position)
        if (diff < 0.10 && phase === "up") {
          setPhase("down");
          setFeedback("DOWN - Now Stand Up!");
        } 
        // Upper threshold (Back to standing)
        else if (diff > 0.22 && phase === "down") {
          setPhase("up");
          setReps((prev) => prev + 1);
          setFeedback("GOOD REP!");
        }
      }
      ctx.restore();
    });

    const camera = new cam.Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start();

    return () => {
      camera.stop();
      pose.close();
    };
  }, [isActive, phase]);

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
        <button 
          onClick={() => setIsActive(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-full text-2xl font-bold transition-all shadow-xl"
        >
          Enter Workout Mode
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Full Screen Camera Container */}
      <div className="relative w-full h-full max-w-5xl max-h-[80vh] border-4 border-slate-800 rounded-3xl overflow-hidden">
        <video ref={videoRef} className="hidden" playsInline />
        <canvas ref={canvasRef} className="w-full h-full object-cover" width="1280" height="720" />
        
        {/* Heads Up Display (HUD) */}
        <div className="absolute top-8 left-8 flex flex-col gap-2">
           <div className="bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl">
             <p className="text-sm font-bold uppercase opacity-80">Reps</p>
             <p className="text-6xl font-black">{reps}</p>
           </div>
           <div className={`px-4 py-2 rounded-lg text-white font-bold text-center ${phase === 'down' ? 'bg-orange-500' : 'bg-blue-500'}`}>
             {phase === 'down' ? 'LOW' : 'HIGH'}
           </div>
        </div>

        <div className="absolute bottom-8 w-full flex justify-center">
          <div className="bg-black/60 backdrop-blur-md px-10 py-4 rounded-full border border-white/20">
            <p className="text-white text-xl font-medium tracking-wide">{feedback}</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsActive(false)}
        className="mt-6 text-slate-400 hover:text-white underline underline-offset-4"
      >
        Exit Workout
      </button>
    </div>
  );
};

export default RepCounter;