import "./StorageCard.css";


const StorageCard = ({files = []}) => {


    const totalStorage = 100 * 1024 * 1024 * 1024; //100GB


    const usedStorage = files.reduce(
        (total,file)=> total + file.fileSize,
        0
    );


    const usedGB = (
        usedStorage /
        (1024*1024*1024)
    ).toFixed(2);


    const percentage = Math.min(
        (usedStorage / totalStorage) * 100,
        100
    );



    return (

        <div className="storage-grid">


            <div className="storage-card">


                <div className="storage-icon">
                    📁
                </div>


                <h3>
                    Cloud Storage
                </h3>


                <h2>
                    {usedGB} GB
                </h2>


                <div className="progress-bar">

                    <span
                    style={{
                        width:`${percentage}%`
                    }}
                    ></span>

                </div>


                <div className="storage-info">

                    <span>
                        Used
                    </span>

                    <span>
                        100 GB
                    </span>

                </div>


            </div>



            <div className="storage-card">


                <div className="storage-icon">
                    📄
                </div>


                <h3>
                    Documents
                </h3>


                <h2>
                    {
                    files.filter(
                    file=>file.fileType==="pdf"
                    ).length
                    }

                    {" "}Files
                </h2>


                <p>
                    PDF files
                </p>


            </div>



            <div className="storage-card">


                <div className="storage-icon">
                    🖼️
                </div>


                <h3>
                    Images
                </h3>


                <h2>
                    {
                    files.filter(
                    file=>
                    file.fileType?.includes("image")
                    ).length
                    }

                    {" "}Files
                </h2>


                <p>
                    Photos
                </p>


            </div>


        </div>

    );
};


export default StorageCard;