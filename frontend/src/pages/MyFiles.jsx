import { useEffect, useState } from "react";
import {
  FaDownload,
  FaTrash,
  FaSearch,
  FaFileAlt,
} from "react-icons/fa";

import fileService from "../services/fileService";
import "../css/MyFiles.css";

export default function MyFiles() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    const result = files.filter((file) =>
      file.fileName.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredFiles(result);
  }, [search, files]);

  const loadFiles = async () => {
    try {
      const res = await fileService.getAllFiles();

      setFiles(res.data);
      setFilteredFiles(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (id) => {
    if (!window.confirm("Delete this file?")) return;

    try {
      await fileService.deleteFile(id);

      loadFiles();
    } catch (err) {
      console.log(err);
    }
  };

  const downloadFile = async (id, fileName) => {
    try {
      const res = await fileService.downloadFile(id);

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="files-page">

      <div className="page-header">

        <h1>📁 My Files</h1>

        <div className="search-box">

          <FaSearch />

          <input
            placeholder="Search files..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

      </div>

      {loading ? (

        <h2>Loading...</h2>

      ) : (

        <div className="file-grid">

          {filteredFiles.length===0 &&

            <h3>No Files Found</h3>

          }

          {filteredFiles.map((file)=>(

            <div
              className="file-card"
              key={file.id}
            >

              <FaFileAlt className="file-icon"/>

              <h3>{file.fileName}</h3>

              <p>

                {(file.fileSize/1024).toFixed(2)}

                KB

              </p>

              <div className="actions">

                <button
                  onClick={()=>
                    downloadFile(file.id,file.fileName)
                  }
                >

                  <FaDownload/>

                </button>

                <button
                  className="delete"
                  onClick={()=>
                    deleteFile(file.id)
                  }
                >

                  <FaTrash/>

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}