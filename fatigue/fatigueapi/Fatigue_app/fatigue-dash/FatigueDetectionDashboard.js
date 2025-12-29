import React, { useState, useEffect } from 'react';
import { Camera, StopCircle, Play, AlertTriangle, CheckCircle } from 'lucide-react';

const FatigueDetectionDashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [isFatigued, setIsFatigued] = useState(true); // Toggle for demo purposes

  // Mock Data mimicking your screenshot
  const stats = {
    ear: isFatigued ? 0.076 : 0.298,
    mar: isFatigued ? 0.416 : 0.090,
    eyeFatigue: isFatigued ? 100 : 0,
    yawnFatigue: isFatigued ? 100 : 0,
    eyeTimer: isFatigued ? "15.8s" : "0.0s",
    yawnTimer: isFatigued ? "5.4s" : "0.0s"
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* --- Sidebar Navigation --- */}
      <nav className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-8 text-gray-800">Navigation</h2>
        <div className="space-y-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Go to</p>
          <div className="flex items-start gap-3 cursor-pointer group">
            <div className="mt-1 w-3 h-3 rounded-full border-2 border-red-500 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
              Real-time Webcam Detection (Continuous)
            </span>
          </div>
          <div className="flex items-start gap-3 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
            <div className="mt-1 w-3 h-3 rounded-full border-2 border-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              Driver Drowsy Alert Mechanism
            </span>
          </div>
        </div>
      </nav>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Control Buttons */}
        <div className="flex justify-between mb-6 max-w-4xl mx-auto">
          <button 
            onClick={() => setIsActive(true)}
            className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 text-sm"
          >
            <Play size={14} /> Start Webcam
          </button>
          <button 
            onClick={() => setIsActive(false)}
            className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 text-sm"
          >
            <StopCircle size={14} /> Stop Webcam
          </button>
        </div>

        {/* Video Monitor Container */}
        <div className="relative max-w-4xl mx-auto aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-2xl border-4 border-white">
          
          {/* Simulated Webcam Feed (Replace with <video> or <canvas>) */}
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            {!isActive ? (
              <div className="text-gray-400 flex flex-col items-center">
                <Camera size={48} className="mb-2" />
                <p>Webcam is Off</p>
              </div>
            ) : (
              <div className="w-full h-full bg-slate-600 animate-pulse flex items-center justify-center">
                {/* Real webcam stream would go here */}
                <p className="text-white opacity-50 font-mono text-xs">WEB_STREAM_ACTIVE</p>
              </div>
            )}
          </div>

          {/* --- Detection Overlays --- */}
          {isActive && (
            <div className="absolute inset-0 p-6 font-mono pointer-events-none">
              {/* Alert Header */}
              {isFatigued && (
                <div className="absolute top-0 left-0 right-0 bg-red-600/70 text-white text-center py-4 text-3xl font-black italic tracking-tighter">
                  ???? FATIGUE ALERT ????
                </div>
              )}

              {/* Stats Overlay */}
              <div className="mt-16 space-y-1 text-2xl font-bold uppercase drop-shadow-md">
                <p className="text-white">STATUS EYEBLINK: <span className={isFatigued ? 'text-red-500' : 'text-green-400'}>{isFatigued ? 'CLOSED' : 'OPEN'}</span></p>
                <p className="text-white">EAR: {stats.ear.toFixed(3)}</p>
                <p className="text-white">MAR: {stats.mar.toFixed(3)} (YAWN)</p>
                
                <div className={isFatigued ? 'text-red-500' : 'text-green-400'}>
                  <p>Fatigue (Eye): {stats.eyeFatigue}%</p>
                  <p>Fatigue (Yawn): {stats.yawnFatigue}%</p>
                </div>

                <div className="text-white mt-4">
                  <p>Eye closed timer: {stats.eyeTimer}</p>
                  <p>Yawn timer: {stats.yawnTimer}</p>
                </div>

                {/* Footer Alert */}
                <div className={`mt-12 text-3xl font-black leading-tight ${isFatigued ? 'text-red-600' : 'text-green-500'}`}>
                  {isFatigued ? (
                    <>
                      <p>???? FATIGUE DETECTED ??? TAKE A BREAK!</p>
                      <p>??? YAWN ALERT ??? TAKE A BREAK!</p>
                    </>
                  ) : (
                    <>
                      <p>STATUS: NORMAL (ATTENTIVE)</p>
                      <p>NO YAWN</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Toggle Switch for Demo (Dev Only) */}
        <div className="mt-8 text-center">
           <button 
            onClick={() => setIsFatigued(!isFatigued)}
            className="text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-500 hover:bg-gray-300"
           >
             Toggle Demo State: {isFatigued ? "Fatigued" : "Normal"}
           </button>
        </div>
      </main>
    </div>
  );
};

export default FatigueDetectionDashboard;