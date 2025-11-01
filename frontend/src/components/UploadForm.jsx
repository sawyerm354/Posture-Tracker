import { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setStatus("⏳ Uploading video...");

    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    try {
      // Upload file
      const uploadRes = await axios.post("http://localhost:5000/upload", formData);
      const fileId = uploadRes.data.file_id;
      const jobId = uploadRes.data.job_id;

      setStatus("⚙ Processing... (this may take a bit)");

      // Poll for result every 3 seconds
      const checkStatus = setInterval(async () => {
        try {
          const statusRes = await axios.get(`http://localhost:5000/status/${jobId}`);
          const jobStatus = statusRes.data.status;

          if (jobStatus === "finished") {
            clearInterval(checkStatus);

            const resultRes = await axios.get(`http://localhost:5000/api/results/${fileId}`);
            setResult(resultRes.data.result);
            setVideoUrl(resultRes.data.video_url);
            setStatus("✅ Processing complete!");
          } else if (jobStatus === "failed") {
            clearInterval(checkStatus);
            setStatus("❌ Processing failed");
          } else {
            console.log("Still processing...");
          }
        } catch (err) {
          console.error("Error checking job:", err.message);
        }
      }, 3000);
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("❌ Upload failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" accept="video/mp4" required />
        <button type="submit">Upload</button>
      </form>

      <p>{status}</p>

      {result && (
        <div>
          <h3>📊 Posture Analysis Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {videoUrl && (
        <video
          controls
          width="500"
          src={videoUrl}
          style={{ borderRadius: "12px", marginTop: "20px" }}
        />
      )}
    </div>
  );
}

export default UploadForm;
