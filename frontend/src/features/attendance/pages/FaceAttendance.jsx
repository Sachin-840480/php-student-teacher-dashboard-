import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Layout from "../../../components/common/Layout";
import styles from "../styles/FaceAttendance.module.css";
import toast from "react-hot-toast";
import axios from "axios";

const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
};

export default function FaceAttendance() {

    const webcamRef = useRef(null);

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const capture = () => {
        const img = webcamRef.current.getScreenshot();
        setImage(img);
    };

    const retake = () => {
        setImage(null);
    };

    const submitAttendance = () => {

        navigator.geolocation.getCurrentPosition(async (position) => {

            try {

                setLoading(true);

                const blob = await fetch(image).then(r => r.blob());

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
                    formData
                );

                toast.success(res.data.message);

            } catch (err) {

                console.log(err);

                toast.error("Attendance Failed");

            } finally {

                setLoading(false);

            }

        });

    };

    return (

        <Layout>

            <div className={styles.container}>

                <h1>Face Attendance</h1>

                {!image ? (

                    <>
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className={styles.camera}
                        />

                        <button
                            onClick={capture}
                            className={styles.button}
                        >
                            Capture
                        </button>

                    </>

                ) : (

                    <>

                        <img
                            src={image}
                            className={styles.preview}
                        />

                        <div className={styles.buttons}>

                            <button
                                onClick={retake}
                            >
                                Retake
                            </button>

                            <button
                                onClick={submitAttendance}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>

                        </div>

                    </>

                )}

            </div>

        </Layout>

    );

}