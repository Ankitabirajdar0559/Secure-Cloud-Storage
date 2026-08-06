import { useState } from "react";
import api from "../services/api";

function UploadBox({ refresh }) {

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const uploadFile = async () => {

        if (!file) {

            alert("Please select a file.");

            return;

        }

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append("file", file);

            await api.post(
                "/api/files/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("File uploaded successfully.");

            setFile(null);

            if (refresh) {

                refresh();

            }

        } catch (error) {

            console.log(error);

            alert("Upload failed.");

        } finally {

            setUploading(false);

        }

    };

    return (

        <div
            style={{
                background: "#1e293b",
                padding: "25px",
                borderRadius: "15px",
                marginBottom: "30px"
            }}
        >

            <h2>
                📤 Upload File
            </h2>

            <p
                style={{
                    color: "#94a3b8"
                }}
            >
                Select any document, image or PDF.
            </p>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                    marginTop: "15px",
                    marginBottom: "20px"
                }}
            />

            <br />

            {

                file && (

                    <p>

                        Selected:
                        <b> {file.name}</b>

                    </p>

                )

            }

            <button

                onClick={uploadFile}

                disabled={uploading}

                style={{

                    background: uploading ? "#64748b" : "#2563eb",

                    color: "white",

                    border: "none",

                    padding: "12px 25px",

                    borderRadius: "8px",

                    cursor: "pointer",

                    fontSize: "15px"

                }}

            >

                {

                    uploading

                    ? "Uploading..."

                    : "Upload"

                }

            </button>

        </div>

    );

}

export default UploadBox;