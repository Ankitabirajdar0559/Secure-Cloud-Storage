import { useEffect, useState } from "react";
import fileService from "../services/fileService";
import "../css/FileList.css";


const FileList = () => {

    const [files, setFiles] = useState([]);


    const fetchFiles = async () => {

        try {

            const response = await fileService.getFiles();

            setFiles(response.data);

        } catch(error){

            console.log("Unable to fetch files", error);

        }

    };


    useEffect(() => {

        fetchFiles();

    }, []);



    const deleteFile = async (id) => {

        try {

            await fileService.deleteFile(id);

            fetchFiles();

        } catch(error){

            console.log(error);

        }

    };



    return (

        <>


        {
            files.length === 0 ?

            (

                <div className="empty-files">

                    No files uploaded yet ☁️

                </div>

            )

            :

            files.map((file)=>(


                <div 
                    className="storage-card"
                    key={file.id}
                >


                    <div className="file-top">


                        <div className="file-image">

                            📄

                        </div>


                        <button
                            onClick={() => deleteFile(file.id)}
                            className="delete-icon"
                        >
                            ×
                        </button>


                    </div>



                    <h3>
                        {file.fileName}
                    </h3>



                    <p>
                        {file.fileType}
                    </p>



                    <div className="file-footer">

                        <span>
                            Cloud Storage
                        </span>

                    </div>


                </div>


            ))

        }


        </>

    );

};


export default FileList;