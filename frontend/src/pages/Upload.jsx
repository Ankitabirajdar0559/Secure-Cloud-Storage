import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaFileAlt } from "react-icons/fa";
import fileService from "../services/fileService";
import "../css/Upload.css";

export default function Upload() {

    const inputRef = useRef();

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const handleSelect = (e) => {

        if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }

    };

    const upload = async () => {

        if (!selectedFile) {

            setMessage("Please select a file.");

            return;
        }

        const formData = new FormData();

        formData.append("file", selectedFile);

        try {

            setUploading(true);

            setMessage("");

            // Fake progress for UI
            let value = 0;

            const timer = setInterval(() => {

                value += 10;

                if (value >= 90) {
                    clearInterval(timer);
                }

                setProgress(value);

            }, 150);

            await fileService.uploadFile(formData);

            clearInterval(timer);

            setProgress(100);

            setMessage("✅ File uploaded successfully!");

            setSelectedFile(null);

            inputRef.current.value = "";

        } catch (err) {

            console.error(err);

            setMessage("❌ Upload failed.");

        } finally {

            setUploading(false);

        }

    };

    return (

        <div className="upload-page">

            <div className="upload-card">

                <FaCloudUploadAlt className="upload-icon" />

                <h2>Upload Your Files</h2>

                <p>Drag & Drop support can be added later. Start by selecting a file.</p>

                <input
                    ref={inputRef}
                    type="file"
                    onChange={handleSelect}
                />

                {selectedFile && (

                    <div className="preview">

                        <FaFileAlt />

                        <div>

                            <strong>{selectedFile.name}</strong>

                            <p>

                                {(selectedFile.size / 1024).toFixed(2)} KB

                            </p>

                        </div>

                    </div>

                )}

                {uploading && (

                    <div className="progress-container">

                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        />

                    </div>

                )}

                <button
                    className="upload-btn"
                    onClick={upload}
                    disabled={uploading}
                >

                    {uploading ? "Uploading..." : "Upload"}

                </button>

                {message &&

                    <div className="upload-message">

                        {message}

                    </div>

                }

            </div>

        </div>

    );

}