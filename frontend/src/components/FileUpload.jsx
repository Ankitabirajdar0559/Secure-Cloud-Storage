import { useState } from "react";
import fileService from "../services/fileService";
import "../css/FileUpload.css";

const FileUpload = () => {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {

        if (!file) {
            setMessage("Please select a file");
            return;
        }

        try {
            await fileService.uploadFile(file);
            setMessage("File uploaded successfully ☁️");
            setFile(null);

        } catch (error) {
            setMessage("Upload failed");
            console.log(error);
        }
    };


    return (
        <div className="upload-card">

            <div className="upload-icon">
                ☁
            </div>

            <h2>Upload Your Files</h2>

            <p>
                Store your files securely in cloud storage
            </p>


            <div className="upload-box">

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />


                <button onClick={handleUpload}>
                    Upload File
                </button>

            </div>


            {
                message &&
                <div className="upload-message">
                    {message}
                </div>
            }

        </div>
    );
};


export default FileUpload;