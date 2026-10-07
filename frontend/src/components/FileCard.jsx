import api from "../services/api";

function FileCard({ file, onDelete }) {

    const downloadFile = () => {

        window.open(
           `/api/files/download/${file.fileName}`,
            "_blank"
        );

    };

    const shareFile = async () => {

        try {

            const response = await api.get(
                `/api/files/share/${file.id}`
            );

            navigator.clipboard.writeText(response.data);

            alert("Share link copied!");

        } catch (error) {

            console.log(error);

            alert("Unable to generate share link.");

        }

    };

    return (

        <div
            style={{
                background: "#1e293b",
                borderRadius: "12px",
                padding: "20px",
                color: "white",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
            }}
        >

            <div
                style={{
                    fontSize: "50px",
                    textAlign: "center"
                }}
            >
                📄
            </div>

            <h3>{file.fileName}</h3>

            <p>
                <b>Type:</b> {file.fileType}
            </p>

            <p>
                <b>Size:</b> {(file.fileSize / 1024).toFixed(2)} KB
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                    flexWrap: "wrap"
                }}
            >

                <button
                    onClick={downloadFile}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    ⬇ Download
                </button>

                <button
                    onClick={shareFile}
                    style={{
                        background: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    🔗 Share
                </button>

                <button
                    onClick={() => onDelete(file.id)}
                    style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    🗑 Delete
                </button>

            </div>

        </div>

    );

}

export default FileCard;