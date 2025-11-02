// import React, { useState } from "react";
// import ConfusionMatrixCard from "../components/ConfusionMatrixCard";
// import api from "../api";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   CartesianGrid,
// } from "recharts";

// const accuracyData = [
//   { time: "9AM", acc: 0.84 },
//   { time: "10AM", acc: 0.86 },
//   { time: "11AM", acc: 0.87 },
//   { time: "12PM", acc: 0.89 },
//   { time: "1PM", acc: 0.91 },
//   { time: "2PM", acc: 0.89 },
// ];

// const detectionData = [
//   { name: "Worker", count: 120 },
//   { name: "Hard Hat", count: 98 },
//   { name: "Safety Vest", count: 83 },
//   { name: "No Helmet", count: 17 },
// ];

// const Dashboard = () => {
//   const [video, setVideo] = useState(null);
//   const [videoURL, setVideoURL] = useState("");

//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith("video/")) {
//       setVideo(file);
//       setVideoURL(URL.createObjectURL(file));
//     } else {
//       alert("Please upload a valid video file.");
//     }
//   };

//   return (
//     <section className="min-h-screen w-full text-white bg-[radial-gradient(at_center_bottom,_#4b2e02,_#290A51)] px-8 py-10">
//       <div className="max-w-6xl mx-auto space-y-10">
//         {/* KPI Row */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
//             <h2 className="text-4xl font-bold text-orange-400">89%</h2>
//             <p className="text-sm text-gray-300 mt-1">Detection Accuracy</p>
//           </div>
//           <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
//             <h2 className="text-4xl font-bold text-pink-400">254</h2>
//             <p className="text-sm text-gray-300 mt-1">Total Detections</p>
//           </div>
//           <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
//             <h2 className="text-4xl font-bold text-cyan-400">12</h2>
//             <p className="text-sm text-gray-300 mt-1">Safety Alerts</p>
//           </div>
//           <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
//             <h2 className="text-4xl font-bold text-green-400">93%</h2>
//             <p className="text-sm text-gray-300 mt-1">Avg Confidence</p>
//           </div>
//         </div>

//         {/* 🎥 Video Upload Section (connected to FastAPI) */}
//         <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
//           <h3 className="text-lg font-semibold mb-4">Upload Site Video</h3>

//           <label
//             htmlFor="video-upload"
//             className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400/40 rounded-lg cursor-pointer hover:border-orange-400 transition"
//           >
//             {video ? (
//               <p className="text-sm text-gray-200">
//                 {video.name} <span className="text-orange-400">(Selected)</span>
//               </p>
//             ) : (
//               <>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-10 h-10 mb-2 text-gray-300"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16V4m0 0l3 3m-3-3l-3 3M17 8v12m0 0l-3-3m3 3l3-3"
//                   />
//                 </svg>
//                 <p className="text-sm text-gray-300">
//                   Click or drag a video here to upload
//                 </p>
//               </>
//             )}
//           </label>

//           <input
//             id="video-upload"
//             type="file"
//             accept="video/*"
//             onChange={handleVideoUpload}
//             className="hidden"
//           />

//           {/* Upload button */}
//           {video && (
//             <button
//               onClick={async () => {
//                 const formData = new FormData();
//                 formData.append("file", video);

//                 try {
//                   const res = await api.post("/raw-videos", formData, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                   });

//                   alert("✅ " + res.data.message);
//                   setVideoURL(res.data.file_url);
//                 } catch (err) {
//                   console.error(err);
//                   alert("❌ " + (err.response?.data?.detail || "Upload failed"));
//                 }
//               }}
//               className="mt-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold"
//             >
//               Upload to Cloud
//             </button>
//           )}

//           {/* Video Preview */}
//           {videoURL && (
//             <div className="mt-5 rounded-lg overflow-hidden border border-white/10">
//               <video src={videoURL} controls className="w-full rounded-lg" />
//               <p className="mt-2 text-sm text-green-400">
//                 Uploaded to Cloud:{" "}
//                 <a
//                   href={videoURL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="underline text-blue-300"
//                 >
//                   {videoURL}
//                 </a>
//               </p>
//             </div>
//           )}
//         </div>


//         {/* Charts Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Accuracy Trend Chart */}
//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <h3 className="text-lg font-semibold mb-3">
//               Accuracy Trend (Today)
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={accuracyData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="rgba(255,255,255,0.1)"
//                 />
//                 <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
//                 <YAxis
//                   domain={[0.8, 1]}
//                   tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
//                   stroke="rgba(255,255,255,0.6)"
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f1f1f",
//                     borderRadius: "8px",
//                     border: "none",
//                   }}
//                   labelStyle={{ color: "#fff" }}
//                   formatter={(v) => `${(v * 100).toFixed(1)}%`}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="acc"
//                   stroke="#f97316"
//                   strokeWidth={2.5}
//                   dot={{ r: 4, fill: "#fff" }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Detection Category Chart */}
//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <h3 className="text-lg font-semibold mb-3">
//               Detections by Category
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={detectionData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="rgba(255,255,255,0.1)"
//                 />
//                 <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
//                 <YAxis stroke="rgba(255,255,255,0.6)" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f1f1f",
//                     border: "none",
//                   }}
//                   labelStyle={{ color: "#fff" }}
//                 />
//                 <Bar dataKey="count" fill="url(#barGradient)" radius={6} />
//                 <defs>
//                   <linearGradient id="barGradient" x1="0" x2="1">
//                     <stop offset="0%" stopColor="#f97316" />
//                     <stop offset="100%" stopColor="#ec4899" />
//                   </linearGradient>
//                 </defs>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* ConfusionMatrixCard Section */}
//         <div className="mt-10">
//           <ConfusionMatrixCard />
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//           <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
//           <ul className="space-y-3 text-sm text-gray-300">
//             <li className="flex justify-between">
//               <span>Detected “Worker” without hard hat</span>
//               <span className="text-orange-400">2 mins ago</span>
//             </li>
//             <li className="flex justify-between">
//               <span>Model retrained with new dataset</span>
//               <span className="text-pink-400">1 hr ago</span>
//             </li>
//             <li className="flex justify-between">
//               <span>Confidence threshold increased to 0.75</span>
//               <span className="text-cyan-400">3 hrs ago</span>
//             </li>
//             <li className="flex justify-between">
//               <span>New detection session started</span>
//               <span className="text-green-400">5 hrs ago</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import ConfusionMatrixCard from "../components/ConfusionMatrixCard";
import api from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  Video,
  Clock,
  Shield,
  TrendingUp,
  RefreshCw,
  Upload,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";

// ✅ Backend analytics endpoint
const API_ENDPOINT = "http://127.0.'https://09vprol3o9.execute-api.ap-south-1.amazonaws.com/prod/outliers';.1:8000/analytics";

const Dashboard = () => {
  const navigate = useNavigate();
  const [outlierEvents, setOutlierEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [stats, setStats] = useState({
      totalEvents: 0,
      todayEvents: 0,
      totalViolations: 0,
      complianceRate: 0
    });

  const handleLogout = () => {
    // remove token and any stored user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // optional: if you stored other state in localStorage, remove them here

    // redirect to login/auth page
    navigate("/auth"); // or "/login" depending on your routes
  };

  const fetchOutlierEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINT}?limit=50`);
      const data = await response.json();

      if (data.success) {
        setOutlierEvents(data.events || []);

        // Calculate stats
        const today = new Date().setHours(0, 0, 0, 0) / 1000;
        const todayEvents = data.events.filter(e => e.timestamp >= today);
        const totalViolations = data.events.reduce((sum, e) => sum + e.outlierCount, 0);
        const totalDetections = data.events.reduce((sum, e) => sum + e.totalDetections, 0);
        const compliance = totalDetections > 0
          ? ((totalDetections - totalViolations) / totalDetections * 100)
          : 100;

        setStats({
          totalEvents: data.events.length,
          todayEvents: todayEvents.length,
          totalViolations: totalViolations,
          complianceRate: compliance.toFixed(1)
        });
      }
    } catch (error) {
      console.error('Error fetching outlier events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutlierEvents();
    // Refresh every 30 seconds
    const interval = setInterval(fetchOutlierEvents, 30000);
    return () => clearInterval(interval);
  }, []);



  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const getViolationColor = (className) => {
    const colors = {
      'no_helmet': 'bg-red-500',
      'no_suit': 'bg-orange-500',
      'tampering': 'bg-red-600',
      'intrusion': 'bg-purple-500',
      'unauthorized_access': 'bg-pink-500'
    };
    return colors[className.toLowerCase()] || 'bg-gray-500';
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
      setVideoURL(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid video file.");
    }
  };

  // 🔁 Fetch analytics data (runs every 10 sec)
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_ENDPOINT);
        setAnalytics(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 10000); // auto-refresh every 10 sec
    return () => clearInterval(interval);
  }, []);

  // fallback dummy chart data if backend is not connected
  const accuracyData = analytics?.accuracy_trend || [
    { time: "9AM", acc: 0.84 },
    { time: "10AM", acc: 0.86 },
    { time: "11AM", acc: 0.87 },
    { time: "12PM", acc: 0.89 },
    { time: "1PM", acc: 0.91 },
    { time: "2PM", acc: 0.89 },
  ];

  const detectionData = analytics?.detections_by_category || [
    { name: "Worker", count: 120 },
    { name: "Hard Hat", count: 98 },
    { name: "Safety Vest", count: 83 },
    { name: "No Helmet", count: 17 },
  ];

  return (
    <section className="min-h-screen w-full text-white bg-[radial-gradient(at_center_bottom,_#4b2e02,_#290A51)] px-8 py-10">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="SafeSite AI" className="w-8 h-8" />
          <h3 className="font-semibold text-lg text-white">SafeSite AI Dashboard</h3>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white font-semibold shadow-[0_0_25px_rgba(255,122,0,0.4)] hover:shadow-[0_0_40px_rgba(255,122,0,0.6)] hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>
      </nav>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-500/30">
            <Shield className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">SafeSite AI Dashboard</h1>
            <p className="text-gray-400 text-sm">Real-time Construction Safety Monitoring</p>
          </div>
        </div>
        <button
          onClick={fetchOutlierEvents}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      <div className="max-w-6xl mx-auto space-y-10">
        {/* KPI Row (Dynamic) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl p-5 border border-red-500/30 backdrop-blur">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <TrendingUp className="w-4 h-4 text-red-300" />
            </div>
            <h2 className="text-4xl font-bold text-red-300">{stats.totalViolations}</h2>
            <p className="text-sm text-red-200 mt-1">Total Violations</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-5 border border-orange-500/30 backdrop-blur">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-6 h-6 text-orange-400" />
              <Video className="w-4 h-4 text-orange-300" />
            </div>
            <h2 className="text-4xl font-bold text-orange-300">{stats.todayEvents}</h2>
            <p className="text-sm text-orange-200 mt-1">Alerts Today</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-5 border border-green-500/30 backdrop-blur">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <Shield className="w-4 h-4 text-green-300" />
            </div>
            <h2 className="text-4xl font-bold text-green-300">{stats.complianceRate}%</h2>
            <p className="text-sm text-green-200 mt-1">Compliance Rate</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-5 border border-blue-500/30 backdrop-blur">
            <div className="flex items-center justify-between mb-2">
              <Video className="w-6 h-6 text-blue-400" />
              <Eye className="w-4 h-4 text-blue-300" />
            </div>
            <h2 className="text-4xl font-bold text-blue-300">{stats.totalEvents}</h2>
            <p className="text-sm text-blue-200 mt-1">Total Events</p>
          </div>
        </div>

        {/* 🎥 Video Upload Section (connected to FastAPI) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Upload Site Video</h3>

          <label
            htmlFor="video-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400/40 rounded-lg cursor-pointer hover:border-orange-400 transition"
          >
            {video ? (
              <p className="text-sm text-gray-200">
                {video.name} <span className="text-orange-400">(Selected)</span>
              </p>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 mb-2 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0l3 3m-3-3l-3 3M17 8v12m0 0l-3-3m3 3l3-3"
                  />
                </svg>
                <p className="text-sm text-gray-300">
                  Click or drag a video here to upload
                </p>
              </>
            )}
          </label>

          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />

          {/* Upload button */}
          {video && (
            <button
              onClick={async () => {
                const formData = new FormData();
                formData.append("file", video);

                try {
                  const res = await api.post("/raw-videos", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });

                  alert("✅ " + res.data.message);
                  setVideoURL(res.data.file_url);
                } catch (err) {
                  console.error(err);
                  alert("❌ " + (err.response?.data?.detail || "Upload failed"));
                }
              }}
              className="mt-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold"
            >
              Upload to Cloud
            </button>
          )}

          {/* Video Preview */}
          {videoURL && (
            <div className="mt-5 rounded-lg overflow-hidden border border-white/10">
              <video src={videoURL} controls className="w-full rounded-lg" />
              <p className="mt-2 text-sm text-green-400">
                Uploaded to Cloud:{" "}
                <a
                  href={videoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-300"
                >
                  {videoURL}
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Recent Outlier Events */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Recent Safety Violations
            </h3>
            <span className="text-sm text-gray-400">
              {outlierEvents.length} events
            </span>
          </div>

          {loading && outlierEvents.length === 0 ? (
            <div className="text-center py-12">
              <RefreshCw className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-spin" />
              <p className="text-gray-400">Loading events...</p>
            </div>
          ) : outlierEvents.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <p className="text-gray-400">No violations detected</p>
              <p className="text-sm text-gray-500 mt-1">All sites are compliant!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {outlierEvents.slice(0, 9).map((event, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg overflow-hidden border border-white/10 hover:border-orange-400/50 cursor-pointer transition group"
                >
                  {/* Image with annotated bounding boxes */}
                  <div className="relative h-48 bg-gray-900">
                    {event.presignedAnnotatedImageUrl || event.presignedImageUrl ? (
                      <img
                        src={event.presignedAnnotatedImageUrl || event.presignedImageUrl}
                        alt={`Frame ${event.frameNumber}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                          e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-800 text-gray-500">Image unavailable</div>';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <Video className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      {event.outlierCount} Alert{event.outlierCount > 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                      <Video className="w-4 h-4" />
                      <span className="truncate">{event.videoName}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Frame {event.frameNumber}</span>
                      <span>•</span>
                      <span>{formatTimestamp(event.timestamp)}</span>
                    </div>

                    {/* Violation Tags */}
                    <div className="flex flex-wrap gap-2">
                      {event.outliers?.slice(0, 2).map((outlier, i) => (
                        <span
                          key={i}
                          className={`${getViolationColor(outlier.class)} text-white px-2 py-1 rounded text-xs font-medium`}
                        >
                          {outlier.class.replace('_', ' ')}
                        </span>
                      ))}
                      {event.outliers?.length > 2 && (
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          +{event.outliers.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


 {/* Recent Activity Log */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-sm">
            {outlierEvents.slice(0, 5).map((event, idx) => (
              <li key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getViolationColor(event.outliers?.[0]?.class || 'default')}`}></div>
                  <span className="text-gray-300">
                    {event.outlierCount} violation{event.outlierCount > 1 ? 's' : ''} detected in {event.videoName}
                  </span>
                </div>
                <span className="text-gray-500 text-xs">
                  {formatTimestamp(event.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
         {/* Modal for Event Details */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Event Details</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-white text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Annotated Image */}
              <div className="mb-6 rounded-lg overflow-hidden border border-white/10">
                {selectedEvent.presignedAnnotatedImageUrl || selectedEvent.presignedImageUrl ? (
                  <img
                    src={selectedEvent.presignedAnnotatedImageUrl || selectedEvent.presignedImageUrl}
                    alt="Detection with bounding boxes"
                    className="w-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-800 text-gray-500">
                    Image unavailable
                  </div>
                )}
              </div>

              {/* Event Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Video Name</p>
                  <p className="font-semibold">{selectedEvent.videoName}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Frame Number</p>
                  <p className="font-semibold">{selectedEvent.frameNumber}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Timestamp</p>
                  <p className="font-semibold">{new Date(selectedEvent.timestamp * 1000).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Total Detections</p>
                  <p className="font-semibold">{selectedEvent.totalDetections}</p>
                </div>
              </div>

              {/* Violations List */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Detected Violations</h3>
                <div className="space-y-3">
                  {selectedEvent.outliers?.map((outlier, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`${getViolationColor(outlier.class)} text-white px-3 py-1 rounded text-sm font-medium`}>
                          {outlier.class.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-sm font-semibold text-yellow-400">
                          {(outlier.confidence * 100).toFixed(1)}% confidence
                        </span>
                      </div>
                      {outlier.box && (
                        <div className="text-xs text-gray-500 mt-2">
                          Location: {typeof outlier.box === 'object' && 'x1' in outlier.box 
                            ? `(${outlier.box.x1}, ${outlier.box.y1}) - (${outlier.box.x2}, ${outlier.box.y2})`
                            : Array.isArray(outlier.box) ? outlier.box.join(', ') : 'N/A'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;




