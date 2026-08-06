import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import fileService from "../services/fileService";
import "../css/Dashboard.css";


export default function Dashboard() {


    const { user } = useAuth();


    const [files, setFiles] = useState([]);
    const [fileCount, setFileCount] = useState(0);
    const [storage, setStorage] = useState(0);



    useEffect(() => {

        loadDashboard();

    }, []);



    const loadDashboard = async () => {

        try {

            const filesResponse =
                await fileService.getAllFiles();

            setFiles(filesResponse.data);



            const countResponse =
                await fileService.getFileCount();

            setFileCount(countResponse.data);



            const storageResponse =
                await fileService.getStorage();

            setStorage(
                (storageResponse.data / (1024 * 1024))
                .toFixed(2)
            );


        }
        catch(error){

            console.log(error);

        }

    };




    const downloadFile = async(id,name)=>{

        try{

            const response =
                await fileService.downloadFile(id);


            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );


            const link =
                document.createElement("a");


            link.href=url;

            link.download=name;


            document.body.appendChild(link);

            link.click();

            link.remove();


        }
        catch(error){

            console.log(error);

        }

    };





    const deleteFile = async(id)=>{

        try{

            await fileService.deleteFile(id);

            loadDashboard();

        }
        catch(error){

            console.log(error);

        }

    };






    return (

        <div className="dashboard-page">


            <div className="dashboard-header">


                <h1>
                    Cloud Storage Dashboard
                </h1>


                <button className="upload-btn">

                    Upload File

                </button>


            </div>





            <div className="hero-card">


                <h1>
                    Welcome Back, {user?.name} 🚀
                </h1>


                <p>
                    Manage, upload and securely store your files.
                </p>


            </div>







            <div className="stats-grid">


                <div className="glass-card">

                    <h3>Total Files</h3>

                    <span>
                        {fileCount}
                    </span>

                </div>




                <div className="glass-card">

                    <h3>Storage Used</h3>

                    <span>
                        {storage} MB
                    </span>

                </div>




                <div className="glass-card">

                    <h3>Shared Files</h3>

                    <span>
                        0
                    </span>

                </div>



            </div>








            <div className="files-section">


                <h2>
                    My Files
                </h2>



                <div className="files-grid">



                {
                    files.length === 0 ?


                    (

                        <p>
                            No files uploaded yet
                        </p>

                    )


                    :


                    files.map(file=>(


                        <div
                        className="file-card"
                        key={file.id}
                        >



                            <h4>
                                {file.fileName}
                            </h4>



                            <p>
                                Size:
                                {" "}
                                {(file.fileSize/1024)
                                .toFixed(2)}
                                KB
                            </p>



                            <p>
                                {file.uploadedAt}
                            </p>





                            <div className="file-actions">


                                <button
                                onClick={()=>
                                    downloadFile(
                                        file.id,
                                        file.fileName
                                    )
                                }
                                >
                                    Download
                                </button>





                                <button
                                onClick={()=>
                                    deleteFile(file.id)
                                }
                                >
                                    Delete
                                </button>


                            </div>



                        </div>


                    ))

                }


                </div>


            </div>



        </div>

    );

}