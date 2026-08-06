import API from "./api";


// Get logged user's files
const getAllFiles = () => {

    return API.get("/files");

};



// Upload file
const uploadFile = (formData) => {

    return API.post(
        "/files/upload",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );

};



// Delete file
const deleteFile = (id)=>{

    return API.delete(`/files/${id}`);

};



// Download file
const downloadFile = (id)=>{

    return API.get(
        `/files/download/${id}`,
        {
            responseType:"blob"
        }
    );

};



// File count
const getFileCount = ()=>{

    return API.get("/files/count");

};



// Storage
const getStorage = ()=>{

    return API.get("/files/storage");

};



export default {

    getAllFiles,
    uploadFile,
    deleteFile,
    downloadFile,
    getFileCount,
    getStorage

};