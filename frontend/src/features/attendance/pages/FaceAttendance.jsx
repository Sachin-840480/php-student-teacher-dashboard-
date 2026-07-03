import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Layout from "../../../components/common/Layout";
import styles from "../styles/FaceAttendance.module.css";
import toast from "react-hot-toast";
import axios from "axios";

// const videoConstraints = {
//     width: 720,
//     height: 720,
//     facingMode: "user"
// };

const videoConstraints = {
  facingMode: "environment",
};

export default function FaceAttendance() {
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
  };

  const webcamRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // const capture = () => {
  //     const img = webcamRef.current.getScreenshot();
  //     setImage(img);
  // };

  const capture = () => {
    addLog("Capture clicked");

    if (!webcamRef.current) {
      addLog("No webcam ref");
      return;
    }

    const img = webcamRef.current.getScreenshot();

    addLog("Image captured");

    setImage(img);
  };

  const retake = () => {
    setImage(null);
  };

  // useEffect(() => {
  //   addLog("Component mounted");
  // }, []);
  useEffect(() => {
  addLog("Secure Context: " + window.isSecureContext);
  addLog("Protocol: " + window.location.protocol);
  addLog("MediaDevices: " + !!navigator.mediaDevices);
  addLog("getUserMedia: " + !!navigator.mediaDevices?.getUserMedia);
}, []);

  const submitAttendance = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        setLoading(true);

        const blob = await fetch(image).then((r) => r.blob());

        const formData = new FormData();

        formData.append("image", blob, "attendance.jpg");

        // temporary values
        formData.append("employee_code", "EMP001");
        formData.append("company_key", "YOUR_COMPANY_KEY");
        formData.append("type", "IN");

        formData.append("latitude", position.coords.latitude);
        formData.append("longitude", position.coords.longitude);

        const res = await axios.post(
          "http://localhost/backend/api/faceAttendance.php",
          formData,
        );

        toast.success(res.data.message);
      } catch (err) {
        addLog("Error submitting attendance");
        toast.error("Attendance Failed");
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Face Attendance </h1> {/*check*/}
        {!image ? (
          <>
            {/* <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className={styles.camera}
                        /> */}

            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={() => {
                addLog("Camera started");
              }}
              onUserMediaError={(err) => {
                addLog(`Error: ${err.name}`);
                addLog(`Message: ${err.message}`);
                addLog(JSON.stringify(err));
                console.error(err);
              }}
            />
            <button onClick={capture} className={styles.button}>
              Capture
            </button>
          </>
        ) : (
          <>
            <img src={image} className={styles.preview} />

            <div className={styles.buttons}>
              <button onClick={retake}>Retake</button>

              <button onClick={submitAttendance} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
      <div
        style={{
          marginTop: 20,
          padding: 10,
          background: "#111",
          color: "#0f0",
          fontSize: 12,
          maxHeight: 250,
          overflow: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </Layout>
  );
}
